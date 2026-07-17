# beers-enriched.json

Enriched, structured data for the pub's cellar list (source: `~/Downloads/BEER LIST.xls`).

This is a full rebuild: **450 distinct beers**, deduplicated from the raw inventory sheet
(~625 raw rows once boilerplate/non-beer lines are stripped — the same beer recurs across
packaging sizes: bottle, can, keg).

The file is **generated** — do not hand-edit `beers-enriched.json`. Edit `BEERS_RAW` in
[`scripts/build-beers-enriched.mjs`](./build-beers-enriched.mjs) and run
`npm run generate:beers` (alias for `node scripts/build-beers-enriched.mjs`).

After regenerating, re-run `node scripts/migrate-beers-to-firestore.mjs` to push the updated records
into the `beers` Firestore collection (doc ID = beer `id`) — that collection, not this file, is what
the running app reads. `/admin/beers` is a read-only audit view of that collection, showing exactly
how every field below was populated.

## App integration

The app reads from **Firestore**, not this file directly. `src/lib/data/beers.ts`'s `loadBeers()`
fetches the `beers` collection and maps each record into the app's `Beer` shape — unwrapping each
field's `.value` (see Schema below), slugging `country`/`city` onto the app's narrower enums, and
deriving the questionnaire `types` from the beer's BA style-guideline key plus the gluten flag.

## Schema — every field is individually sourced

Unlike a flat record with one confidence/source pair, every non-trivial field is stored as
`{ value, source, confidence }` — this is what powers the "Sources" column on `/admin/beers`:

| Field | Type | `source` can be |
|---|---|---|
| `id` / `name` | string | — (not sourced individually) |
| `brewery` | `Sourced<string \| null>` | a URL, `'knowledge'`, or `null` |
| `style` | `Sourced<string>` | `'beer-list.xls'` (self-declared on the sheet) or `'knowledge'` |
| `abv` | `Sourced<number \| null>` | `'beer-list.xls'` when explicit, else `'style_guideline'` (BA range midpoint) |
| `ibu` | `Sourced<number \| null>` | almost always `'style_guideline'` — the sheet never states IBU |
| `country` / `city` | `Sourced<string \| null>` | same source as `brewery` (brewery-level facts) |
| `color` | `Sourced<ColorId \| null>` | always `'style_guideline'` when a BA style key matched, else `null` |
| `flavor` | `Sourced<string[]>` | always `'style_guideline'` when a BA style key matched, else `[]` |
| `gluten_free` / `vegan` | `Sourced<boolean \| null>` | `'beer-list.xls'` when explicitly marked, else `null` (unknown, not "no") |
| `packaging` | `Sourced<string[]>` | `'beer-list.xls'` |
| `image` / `image_source` | string \| null | plain values — carried over from the previous hand-sourced image pass, matched by normalized product name (~58/450 beers have one) |
| `notes` | string | plain freeform text |
| `style_guideline` | object \| `null` | see below — not itself "sourced" per-field, it's the BA reference entry the beer's `style` resolved to |

**Important:** `colorFor()`/`flavorFor()` — the old independent regex heuristics on the beer's own
name — have been deleted entirely. `color` and `flavor` are now *always* derived from the Brewers
Association style guideline the beer's `style` maps to (`STYLE_KEY_COLOR` / `STYLE_KEY_FLAVOR` in
`build-beers-enriched.mjs`), never guessed from keywords in the beer's own name. A beer with no BA
style match gets `color: null`, `flavor: []` — there's no keyword-regex safety net anymore.

### `style_guideline`

Each beer's `style` string is mapped (see `STYLE_TO_BA` in
[`scripts/ba-style-guidelines.mjs`](./ba-style-guidelines.mjs)) onto the closest
matching style family from the [Brewers Association Beer Style
Guidelines](https://www.brewersassociation.org/edu/brewers-association-beer-style-guidelines/).
439/450 beers have a match (the rest are largely ciders/unclear one-offs). Shape:

```ts
{
  key: string;          // slug, e.g. "american-ipa"
  name: string;         // BA style name, e.g. "American-Style India Pale Ale"
  category: string;     // e.g. "Ale - North American"
  srm: string; og: string; ibu: string; abv: string; // reference ranges
  description: string;  // short paraphrased character summary
  // ...plus hopAroma/maltAroma/bitterness/body/fermentation etc.
}
```

## How the data was produced

- Raw names extracted from the `.xls` via `strings`, cleaned (numbering/packaging/noise stripped),
  and deduplicated across packaging variants.
- Style/ABV/packaging are read directly off the sheet where self-declared in the product name
  (`source: 'beer-list.xls'`, high confidence). Brewery identity, country, and city come from either
  real web research (a URL) or established brewery knowledge (`source: 'knowledge'`) — see the
  `BREWERY_INFO`-equivalent per-entry `brewerySource` in `BEERS_RAW`.
- When neither the sheet nor research supplied ABV/IBU/color/flavor, those fields fall back to the
  BA style guideline (averaging the range for ABV/IBU; a curated style-key lookup for color/flavor).
- A handful of beers/breweries (obscure one-off collab cans, ambiguous supplier groupings) couldn't
  be confidently identified — they carry `confidence: 'low'` and, for brewery/country/city, a `null`
  source rather than a guessed citation.

## Known caveats

- Confidence spread is intentionally uneven: well-known international breweries (BrewDog, the
  Belgian Trappists, German breweries, etc.) are `'knowledge'`-sourced at high confidence; small
  Greek/Polish/Czech/Bulgarian/Romanian craft breweries are mostly real-URL-sourced at medium
  confidence; a small residual (~10-15 entries) is genuinely unverified and marked `low`.
- A few brands are collaborations sharing one brewery record (e.g. Tsaperdona = Thessbeera × Sknipa).
- Country/city for a brewery apply to every beer from that brewery — these aren't independently
  re-verified beer-by-beer.

## Verification

```bash
node -e "const b=require('./scripts/beers-enriched.json'); console.log('count', b.length); const ids=new Set(); b.forEach(x=>{ if(!x.id||!x.name) throw new Error('missing keys: '+x.name); if(ids.has(x.id)) throw new Error('dup id: '+x.id); ids.add(x.id); }); console.log('all valid, unique ids');"
```
