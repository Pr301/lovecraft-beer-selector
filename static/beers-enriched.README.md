# beers-enriched.json

Enriched, structured data for the pub's cellar list (source: `~/Downloads/BEER LIST.xls`).

This is the **full pass: 377 distinct beers** across ~65 breweries and 18 countries, deduplicated
from ~447 source rows (the same beer recurs across packaging sizes and on the numbered tap board).

The file is **generated** — do not hand-edit `beers-enriched.json`. Edit the source data in
[`scripts/build-beers-enriched.mjs`](../scripts/build-beers-enriched.mjs) and run
`npm run generate:beers` (alias for `node scripts/build-beers-enriched.mjs`). The generator holds
compact, brewery-grouped source data, derives `color`/`flavor` defaults from the style, computes id
slugs, and self-validates on every run. It writes **two** identical copies: this standalone research
file, and `src/lib/data/beers-catalog.json`.

## App integration

The app **consumes this data**. `src/lib/data/beers.ts` imports `beers-catalog.json` and maps each
record into the app's `Beer` shape: it slugs `country` (e.g. `Scotland (UK)` → `uk`, unidentified →
`other`) onto the expanded `CountryId` union + `countryMeta`, slugs `city` onto the 13 Greek cities
the map now offers (athens, thessaloniki, heraklion, serres, evia, corfu, chios, attica,
folegandros, patras, rethymno, samothraki, chalkidiki), falls back `color: null` → `blonde-ale`, and
derives the questionnaire `type` (`aromatic`/`bitter`/`fruity`/`gluten-free`/`crispy`/`wheat`) from
style + flavour + gluten flag. `BeerCard` shows the `flavor` tags (there are no bilingual
descriptions), and the country/city maps (`scripts/generate-maps.mjs`) were regenerated with the
European countries and Greek cities the list actually covers.

## How the data was produced

- The raw beer names were extracted from the `.xls` with `strings "BEER LIST.xls"` (pandas/xlrd/xlsx
  libraries aren't installed locally, and `strings` cleanly yields every row), then deduplicated by
  beer (packaging variants merged).
- Origin is resolved at the **brewery** level and inherited by its beers. ~20 breweries had their
  country/city (and some ABVs) **web-verified** — see `source` URLs. The rest are derived from the
  name + general knowledge. Every record carries a `confidence` of `high` / `medium` / `low`.
- Current spread: **126 high / 88 medium / 163 low**. Low-confidence rows are mostly obscure
  one-off/collab craft cans where ABV is estimated and/or origin is unverified (`country: null` for
  ~10 truly unidentifiable ones).
- **Images are intentionally omitted** this pass (`"image": null`) — sourcing reliable image URLs at
  scale is a separate task.

## Known caveats

- **Czech "°Balling" vs ABV:** Primátor names like "Double Dark 24%", "Imperial 21%", "Lezak 11%"
  put the malt extract degree (°Balling/Plato) in the name, **not** ABV. Those `abv` values are
  best-effort true-alcohol estimates; `notes` flags each one.
- **Estimated ABVs** are flagged in `notes` and reflected in `confidence`.
- A few brands share a `brewery` where they're collaborations (e.g. Tsaperdona = Thessbeera × Sknipa).

## Schema

Each array element:

| Field         | Type                    | Notes |
|---------------|-------------------------|-------|
| `id`          | string                  | kebab-case slug, unique across the file |
| `name`        | string                  | cleaned display name (packaging/size stripped) |
| `brewery`     | string                  | |
| `style`       | string                  | human-readable style (e.g. `IPA - New England / Hazy`) |
| `abv`         | number \| null          | alcohol by volume % |
| `ibu`         | number \| null          | bitterness; usually null unless well-documented |
| `country`     | string                  | free-text (not the app's narrow enum) |
| `city`        | string \| null          | brewery city/region |
| `color`       | string \| null          | one of the app's `ColorId` values (see below) or null |
| `flavor`      | string[]                | 3–6 tasting descriptors |
| `gluten_free` | boolean \| null         | |
| `vegan`       | boolean \| null         | |
| `packaging`   | string[]                | sizes/formats seen on the list |
| `image`       | null                    | deferred this pass |
| `notes`       | string                  | provenance / caveats |
| `confidence`  | `high` \| `medium` \| `low` | how sure the derived data is |
| `source`      | string                  | a URL when web-verified, else `name+list` / `name+knowledge` |
| `style_guideline` | object \| `null`    | reference stats from the Brewers Association Beer Style Guidelines (see below) |

### `style_guideline`

Each beer's `style` string is mapped (see `STYLE_TO_BA` in
[`scripts/ba-style-guidelines.mjs`](../scripts/ba-style-guidelines.mjs)) onto the closest
matching style family from the [Brewers Association Beer Style
Guidelines](https://www.brewersassociation.org/edu/brewers-association-beer-style-guidelines/).
`null` for the ~7 entries the BA guidelines don't cover (ciders, radlers). Shape:

```ts
{
  key: string;          // slug, e.g. "american-ipa"
  name: string;         // BA style name, e.g. "American-Style India Pale Ale"
  category: string;     // e.g. "Ale - North American"
  srm: string;          // color range
  og: string;           // original gravity range
  ibu: string;          // bitterness range
  abv: string;          // alcohol by volume range
  description: string;  // short paraphrased character summary
}
```

370/377 beers have a match. The mapping is a best-effort approximation — many craft
one-offs don't map onto a single official BA style — so treat it as a reference range,
not a certified spec.

### `color` vocabulary

`color` reuses the eight `ColorId` strings from `src/lib/data/beers.ts` so a later mapping into the
app is trivial: `pale-lager`, `blonde-ale`, `pale-ale-ipa`, `amber-ale`, `red-ale`, `brown-ale`,
`porter`, `stout`. Use `null` if none fit.

## Extending to the full list

1. Re-run `strings "BEER LIST.xls"` and dedupe: the same beer recurs across packagings
   (e.g. `Zichovec Hotline 250ml` vs `Zichovec Hotline 30L`) — collapse these into one record and
   merge the sizes into `packaging`.
2. Group by brewery — origin/city is a brewery property, so once resolved it applies to all that
   brewery's beers. Useful groupings already researched or easily derived:
   - **Greece:** Flaros & Voreia/Siris → Serres; Septem → Orologio, Evia; Sknipa/Salonikia →
     Thessaloniki; Corfu Beer → Arillas, Corfu; KVLT & 33 Brewing → Athens; Dark Crops, Thria,
     Clepsydra, Noble Men, Retimi, Katsika, Ammousa, Methia, Chios, Septum, Paragon, Odyssey, Lola.
   - **Belgium:** Duvel Moortgat, La Chouffe, Westmalle, Orval, La Trappe (NL), Bosteels/Karmeliet,
     Lindemans, Gouden Carolus, St. Bernardus, Kasteel, La Corne, Liefmans.
   - **Czech:** Pilsner Urquell, Bernard, Primator, Zichovec, Clepsydra(?).
   - **Poland:** PINTA, Funky Fluid, Alchemik, Moon Lark, Stu Mostow, NEPO, Lubrow.
   - **Bulgaria:** Sofia Electric Brewing, Glarus/Elysia(?).
   - **Hungary:** Mad Scientist.
   - **Germany/Austria:** Weihenstephan, Ayinger, Maisel's, Schneider, Samichlaus (AT).
   - **UK/Ireland:** BrewDog, O'Hara's/Carlow, Innis & Gunn, Northern Monk, Blue Monkey, Sudden Death.
   - **USA:** Sierra Nevada.
3. Parse embedded signals from each name: ABV numbers (`5.7%`, `9% alc`, `12%`), `GF`/`Gluten Free`,
   `Vegan`, `NEIPA`/`WCIPA`/`DIPA`/`TIPA`, `Sour`/`Gose`, `Stout`/`Porter`/`Weiss`, `Cider`.
   Note the list includes **ciders** (Blakstoc) and **non-alcoholic** entries (Budweiser Free 0%,
   Koppaberg 0%, NEPO hop water) — handle `abv: 0` and consider an `is_cider` / category flag.
4. Web-verify anything below `high` confidence and record the URL in `source`.

## Verification

```bash
node -e "const b=require('./static/beers-enriched.json'); console.log('count', b.length); const ids=new Set(); b.forEach(x=>{ if(!x.id||!x.name||x.abv===undefined) throw new Error('missing keys: '+x.name); if(ids.has(x.id)) throw new Error('dup id: '+x.id); ids.add(x.id); if(!Array.isArray(x.flavor)||x.flavor.length<3) throw new Error('flavor<3: '+x.name); }); console.log('all valid, unique ids');"
```
