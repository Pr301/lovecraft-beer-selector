import { collection, getDocs } from 'firebase/firestore';
import { db } from '$lib/firebase';

export type TypeId = 'aromatic' | 'bitter' | 'fruity' | 'gluten-free' | 'crispy' | 'wheat';
export type ColorId =
	| 'pale-lager'
	| 'blonde-ale'
	| 'pale-ale-ipa'
	| 'amber-ale'
	| 'red-ale'
	| 'brown-ale'
	| 'porter'
	| 'stout';
export type CountryId =
	| 'greece'
	| 'germany'
	| 'belgium'
	| 'netherlands'
	| 'czech'
	| 'poland'
	| 'bulgaria'
	| 'hungary'
	| 'latvia'
	| 'sweden'
	| 'austria'
	| 'italy'
	| 'uk'
	| 'ireland'
	| 'usa'
	| 'mexico'
	| 'cyprus'
	| 'other';
export type CityId =
	| 'athens'
	| 'thessaloniki'
	| 'heraklion'
	| 'serres'
	| 'evia'
	| 'corfu'
	| 'chios'
	| 'attica'
	| 'folegandros'
	| 'patras'
	| 'rethymno'
	| 'samothraki'
	| 'chalkidiki';
export type AbvId = '0' | '4' | '5' | '6-8' | '9-10' | '11+';

export interface StyleGuideline {
	key: string;
	name: string;
	category: string;
	srm: string;
	og: string;
	ibu: string;
	abv: string;
	description: string;
	color?: string;
	clarity?: string;
	maltAroma?: string;
	hopAroma?: string;
	bitterness?: string;
	fermentation?: string;
	body?: string;
	additionalNotes?: string;
	originalGravity?: string;
	finalGravity?: string;
	abw?: string;
	ebc?: string;
}

export interface Beer {
	id: string;
	name: string;
	brewery: string;
	style: string;
	abv: number;
	ibu: number | null;
	color: ColorId;
	country: CountryId;
	city?: string;
	types: TypeId[];
	flavor: string[];
	notes?: string;
	styleGuideline?: StyleGuideline;
	image: string | null;
}

export interface Answers {
	type: TypeId | '';
	color: ColorId | '';
	abv: AbvId | '';
	country: CountryId | '';
	city: CityId | '';
}

export const colorMeta: Record<ColorId, { label: string; hex: string; textColor: string }> = {
	'pale-lager': { label: 'PALE LAGER', hex: '#F5C842', textColor: '#000' },
	'blonde-ale': { label: 'BLONDE ALE', hex: '#EDE26A', textColor: '#000' },
	'pale-ale-ipa': { label: 'PALE ALE/IPA', hex: '#E8A830', textColor: '#000' },
	'amber-ale': { label: 'AMBER ALE', hex: '#C85A1A', textColor: '#fff' },
	'red-ale': { label: 'RED ALE', hex: '#A01010', textColor: '#fff' },
	'brown-ale': { label: 'BROWN ALE', hex: '#6B2A0A', textColor: '#fff' },
	porter: { label: 'PORTER', hex: '#3A1A08', textColor: '#fff' },
	stout: { label: 'STOUT', hex: '#1A0A04', textColor: '#fff' }
};

export const countryMeta: Record<CountryId, { name: string; flag: string }> = {
	greece: { name: 'Greece', flag: '🇬🇷' },
	germany: { name: 'Germany', flag: '🇩🇪' },
	belgium: { name: 'Belgium', flag: '🇧🇪' },
	netherlands: { name: 'Netherlands', flag: '🇳🇱' },
	czech: { name: 'Czech Republic', flag: '🇨🇿' },
	poland: { name: 'Poland', flag: '🇵🇱' },
	bulgaria: { name: 'Bulgaria', flag: '🇧🇬' },
	hungary: { name: 'Hungary', flag: '🇭🇺' },
	latvia: { name: 'Latvia', flag: '🇱🇻' },
	sweden: { name: 'Sweden', flag: '🇸🇪' },
	austria: { name: 'Austria', flag: '🇦🇹' },
	italy: { name: 'Italy', flag: '🇮🇹' },
	uk: { name: 'UK', flag: '🇬🇧' },
	ireland: { name: 'Ireland', flag: '🇮🇪' },
	usa: { name: 'USA', flag: '🇺🇸' },
	mexico: { name: 'Mexico', flag: '🇲🇽' },
	cyprus: { name: 'Cyprus', flag: '🇨🇾' },
	other: { name: 'Other', flag: '🍺' }
};

// ---------------------------------------------------------------------------
// Catalog: docs in the Firestore `beers` collection (the single source of
// truth; populated by scripts/migrate-beers-to-firestore.mjs) mapped into the
// app's Beer shape. The source data uses free-text country/city and has no
// `type`, so we slug the origin and derive the questionnaire `types` here.
// ---------------------------------------------------------------------------
interface RawBeer {
	id: string;
	name: string;
	brewery: string | null;
	style: string;
	abv: number | null;
	ibu: number | null;
	country: string | null;
	city: string | null;
	color: ColorId | null;
	flavor: string[];
	gluten_free: boolean | null;
	notes: string;
	style_guideline: StyleGuideline | null;
	image: string | null;
}

const COUNTRY_SLUG: Record<string, CountryId> = {
	Greece: 'greece',
	Germany: 'germany',
	Belgium: 'belgium',
	Netherlands: 'netherlands',
	'Czech Republic': 'czech',
	Poland: 'poland',
	Bulgaria: 'bulgaria',
	Hungary: 'hungary',
	Latvia: 'latvia',
	Sweden: 'sweden',
	Austria: 'austria',
	Italy: 'italy',
	'Scotland (UK)': 'uk',
	'England (UK)': 'uk',
	Ireland: 'ireland',
	USA: 'usa',
	Mexico: 'mexico',
	Cyprus: 'cyprus'
};

function countrySlug(country: string | null): CountryId {
	if (!country) return 'other';
	return COUNTRY_SLUG[country] ?? 'other';
}

// Map free-text city onto the cities the questionnaire's Greece map offers (CityId);
// anything else keeps a generic slug (still filterable by country, just not by city).
const CITY_MATCHERS: [needle: string, id: CityId][] = [
	['athens', 'athens'],
	['thessaloniki', 'thessaloniki'],
	['heraklion', 'heraklion'],
	['serres', 'serres'],
	['evia', 'evia'],
	['corfu', 'corfu'],
	['chios', 'chios'],
	['attica', 'attica'],
	['folegandros', 'folegandros'],
	['patras', 'patras'],
	['rethymno', 'rethymno'],
	['samothraki', 'samothraki'],
	['chalkidiki', 'chalkidiki']
];

function citySlug(city: string | null): string | undefined {
	if (!city) return undefined;
	const s = city.toLowerCase();
	for (const [needle, id] of CITY_MATCHERS) {
		if (s.includes(needle)) return id;
	}
	return s.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Curated map from BA style-guideline key -> questionnaire types. Beers can carry
// several tags (a hazy IPA is aromatic AND fruity), so a beer surfaces for whichever
// entry point the user picks. Covers every style key present in the catalog; the few
// keyless beers (ciders/radlers) fall back to fallbackTypes(). `gluten-free` is applied
// separately from the dietary flag, not from this table.
const STYLE_KEY_TYPES: Record<string, TypeId[]> = {
	// crispy — clean, light lager finish
	'contemporary-american-lager': ['crispy'],
	'international-pilsener': ['crispy'],
	'german-pilsener': ['crispy'],
	'munich-helles': ['crispy'],
	'czech-pale-lager': ['crispy'],
	'czech-dark-lager': ['crispy'],
	'european-dark-lager': ['crispy'],
	'india-pale-lager': ['crispy'],
	'west-coast-pilsener': ['crispy'],
	'german-marzen': ['crispy', 'aromatic'],
	'non-alcohol-malt-beverage': ['crispy'],
	// bitter — assertive hop or roast bitterness
	'west-coast-ipa': ['bitter'],
	'american-ipa': ['bitter'],
	'imperial-double-ipa': ['bitter'],
	'session-ipa': ['bitter'],
	'american-barleywine': ['bitter'],
	'american-strong-pale-ale': ['bitter'],
	'imperial-red-ale': ['bitter'],
	'american-belgo-ale': ['bitter'],
	'british-ipa': ['bitter'],
	'classic-english-pale-ale': ['bitter'],
	'special-bitter-best-bitter': ['bitter'],
	'american-imperial-stout': ['bitter'],
	'american-stout': ['bitter'],
	'export-stout': ['bitter'],
	'classic-irish-dry-stout': ['bitter'],
	'oatmeal-stout': ['bitter'],
	'baltic-porter': ['bitter'],
	'brown-porter': ['bitter'],
	'american-imperial-porter': ['bitter'],
	// aromatic — aroma-forward hops, Belgian esters, malt aroma
	'juicy-hazy-ipa': ['aromatic', 'fruity'],
	'juicy-hazy-pale-ale': ['aromatic', 'fruity'],
	'hazy-imperial-double-ipa': ['bitter', 'aromatic', 'fruity'],
	'american-pale-ale': ['aromatic', 'bitter'],
	'amber-red-ale': ['aromatic'],
	'irish-red-ale': ['aromatic'],
	'english-brown-ale': ['aromatic'],
	'belgian-tripel': ['aromatic', 'fruity'],
	'belgian-dubbel': ['aromatic', 'fruity'],
	'belgian-quadrupel': ['aromatic', 'fruity'],
	'belgian-strong-dark-ale': ['aromatic', 'fruity'],
	'belgian-strong-blonde': ['aromatic'],
	'belgian-blonde': ['aromatic'],
	'golden-blonde-ale': ['aromatic'],
	'belgian-speciale-belge': ['aromatic'],
	'specialty-saison': ['aromatic'],
	'herb-spice-beer': ['aromatic'],
	'specialty-honey-beer': ['aromatic'],
	'smoke-beer': ['aromatic'],
	'bamberg-bock-rauchbier': ['aromatic'],
	'german-doppelbock': ['aromatic'],
	'british-strong-ale': ['aromatic'],
	'other-strong-ale-or-lager': ['aromatic'],
	'aged-beer': ['aromatic'],
	'sweet-cream-stout': ['aromatic'],
	// fruity — sour / fruited / lambic / pastry / wild
	'american-fruited-sour-ale': ['fruity'],
	'belgian-fruit-lambic': ['fruity'],
	'belgian-fruit-beer': ['fruity'],
	'american-fruit-beer': ['fruity'],
	'dessert-pastry-beer': ['fruity'],
	'mixed-culture-brett-beer': ['fruity'],
	'wild-beer': ['fruity'],
	'contemporary-gose': ['fruity', 'wheat'],
	'berliner-weisse': ['fruity', 'wheat'],
	// wheat — wheat grain
	'south-german-hefeweizen': ['wheat'],
	'south-german-weizenbock': ['wheat'],
	'south-german-dunkel-weizen': ['wheat'],
	'belgian-witbier': ['wheat'],
	// gluten-free
	'gluten-free-beer': ['gluten-free']
};

// Curated map from BA style-guideline key -> the questionnaire color (the swatch the
// user taps on the BeerGlass). Single-valued (a beer has one color), keyed on the same
// style keys as STYLE_KEY_TYPES so color is derived from the BA taxonomy at load time
// rather than trusting the ad-hoc seed value. Assignments follow each style's SRM/appearance.
const STYLE_KEY_COLOR: Record<string, ColorId> = {
	// pale-lager — clean light lagers
	'contemporary-american-lager': 'pale-lager',
	'international-pilsener': 'pale-lager',
	'german-pilsener': 'pale-lager',
	'munich-helles': 'pale-lager',
	'czech-pale-lager': 'pale-lager',
	'india-pale-lager': 'pale-lager',
	'west-coast-pilsener': 'pale-lager',
	'non-alcohol-malt-beverage': 'pale-lager',
	// pale-ale-ipa — pale/hazy hop-forward ales
	'west-coast-ipa': 'pale-ale-ipa',
	'american-ipa': 'pale-ale-ipa',
	'imperial-double-ipa': 'pale-ale-ipa',
	'session-ipa': 'pale-ale-ipa',
	'american-strong-pale-ale': 'pale-ale-ipa',
	'american-belgo-ale': 'pale-ale-ipa',
	'british-ipa': 'pale-ale-ipa',
	'juicy-hazy-ipa': 'pale-ale-ipa',
	'juicy-hazy-pale-ale': 'pale-ale-ipa',
	'hazy-imperial-double-ipa': 'pale-ale-ipa',
	'american-pale-ale': 'pale-ale-ipa',
	// blonde-ale — golden/pale ales, wheats, pale sours
	'belgian-tripel': 'blonde-ale',
	'belgian-strong-blonde': 'blonde-ale',
	'belgian-blonde': 'blonde-ale',
	'golden-blonde-ale': 'blonde-ale',
	'specialty-saison': 'blonde-ale',
	'herb-spice-beer': 'blonde-ale',
	'specialty-honey-beer': 'blonde-ale',
	'other-strong-ale-or-lager': 'blonde-ale',
	'gluten-free-beer': 'blonde-ale',
	'mixed-culture-brett-beer': 'blonde-ale',
	'wild-beer': 'blonde-ale',
	'contemporary-gose': 'blonde-ale',
	'berliner-weisse': 'blonde-ale',
	'south-german-hefeweizen': 'blonde-ale',
	'belgian-witbier': 'blonde-ale',
	'american-fruit-beer': 'blonde-ale',
	'american-fruited-sour-ale': 'blonde-ale',
	// amber-ale — amber/copper
	'german-marzen': 'amber-ale',
	'classic-english-pale-ale': 'amber-ale',
	'special-bitter-best-bitter': 'amber-ale',
	'amber-red-ale': 'amber-ale',
	'belgian-speciale-belge': 'amber-ale',
	'smoke-beer': 'amber-ale',
	// red-ale
	'imperial-red-ale': 'red-ale',
	'irish-red-ale': 'red-ale',
	'belgian-fruit-lambic': 'red-ale',
	'belgian-fruit-beer': 'red-ale',
	// brown-ale — dark lagers, dubbels, bocks, dark strong ales
	'czech-dark-lager': 'brown-ale',
	'european-dark-lager': 'brown-ale',
	'american-barleywine': 'brown-ale',
	'english-brown-ale': 'brown-ale',
	'belgian-dubbel': 'brown-ale',
	'belgian-quadrupel': 'brown-ale',
	'belgian-strong-dark-ale': 'brown-ale',
	'bamberg-bock-rauchbier': 'brown-ale',
	'german-doppelbock': 'brown-ale',
	'british-strong-ale': 'brown-ale',
	'aged-beer': 'brown-ale',
	'south-german-weizenbock': 'brown-ale',
	'south-german-dunkel-weizen': 'brown-ale',
	'dessert-pastry-beer': 'brown-ale',
	// porter
	'baltic-porter': 'porter',
	'brown-porter': 'porter',
	'american-imperial-porter': 'porter',
	// stout
	'american-imperial-stout': 'stout',
	'american-stout': 'stout',
	'export-stout': 'stout',
	'classic-irish-dry-stout': 'stout',
	'oatmeal-stout': 'stout',
	'sweet-cream-stout': 'stout'
};

// Fallback for the handful of beers with no BA style key (ciders/radlers): a trimmed
// version of the old style+flavour regex, returning a single best-guess type.
function fallbackTypes(raw: RawBeer): TypeId[] {
	const s = (raw.style + ' ' + raw.flavor.join(' ')).toLowerCase();
	if (/weiss|weizen|hefe|\bwit\b|witte|wheat|weiz/.test(s)) return ['wheat'];
	if (
		/sour|gose|lambic|kriek|framboise|cassis|cider|radler|fruit|cherry|berry|mango|peach|passion|raspberry|strawberry|apple|blueberry/.test(
			s
		)
	)
		return ['fruity'];
	if (
		/stout|porter|imperial|barley\s?wine|barleywine|west coast|wcipa|\bdipa\b|\btipa\b|double ipa|triple ipa|quadruple|bitter|resinous/.test(
			s
		)
	)
		return ['bitter'];
	if (/pilsner|pilsener|\bpils\b|lager|helles|\bcrisp\b|clean/.test(s)) return ['crispy'];
	return ['aromatic'];
}

// Fallback color for beers with no BA style key (ciders/radlers/hop-waters): a trimmed
// port of colorFor() from scripts/build-beers-enriched.mjs. Always returns a ColorId
// (never null) so Beer.color stays non-null; the truly colorless ones land on blonde-ale.
function fallbackColor(raw: RawBeer): ColorId {
	const s = raw.style.toLowerCase();
	if (
		/kriek|cherry|framboise|raspberry|cassis|strawberry|fruit lambic|rouge|red ale|red ipa|red beer|ruby/.test(
			s
		)
	)
		return 'red-ale';
	if (
		/imperial stout|oatmeal stout|tropical stout|cream stout|nitro stout|espresso stout|\bstout\b/.test(
			s
		)
	)
		return 'stout';
	if (/baltic porter/.test(s)) return 'brown-ale';
	if (/porter/.test(s)) return 'porter';
	if (
		/quad|doppelbock|rauchbock|dark lager|dunkel|dark ale|bruin|eisbock|barley\s?wine|barleywine|imperial(?!\s*red)/.test(
			s
		)
	)
		return 'brown-ale';
	if (/amber|marzen|märzen|vienna|dubbel|rauch|chestnut|honey ale/.test(s)) return 'amber-ale';
	if (/imperial red|red ipa/.test(s)) return 'red-ale';
	if (
		/neipa|hazy|new england|ipa|pale ale|\bapa\b|xpa|dipa|tipa|india pale|smash|cold ipa|hipa/.test(
			s
		)
	)
		return 'pale-ale-ipa';
	if (/pilsner|pilsener|\bpils\b|helles|radler|pale lager|hoppy lager|\blager\b/.test(s))
		return 'pale-lager';
	return 'blonde-ale';
}

// Derive the questionnaire color from the BA style key, falling back to the style regex.
function deriveColor(raw: RawBeer): ColorId {
	const key = raw.style_guideline?.key;
	return (key && STYLE_KEY_COLOR[key]) || fallbackColor(raw);
}

// Derive the questionnaire types from the BA style key + dietary flag (multi-tag).
function deriveTypes(raw: RawBeer): TypeId[] {
	const tags = new Set<TypeId>();
	if (raw.gluten_free) tags.add('gluten-free'); // dietary flag is authoritative
	const key = raw.style_guideline?.key;
	if (key && STYLE_KEY_TYPES[key]) {
		for (const t of STYLE_KEY_TYPES[key]) tags.add(t);
	} else {
		for (const t of fallbackTypes(raw)) tags.add(t);
	}
	return tags.size ? [...tags] : ['aromatic'];
}

function mapRawBeer(raw: RawBeer): Beer {
	return {
		id: raw.id,
		name: raw.name,
		brewery: raw.brewery ?? 'Unknown',
		style: raw.style,
		abv: raw.abv ?? 0,
		ibu: raw.ibu,
		color: deriveColor(raw),
		country: countrySlug(raw.country),
		city: citySlug(raw.city),
		types: deriveTypes(raw),
		flavor: raw.flavor,
		notes: raw.notes || undefined,
		styleGuideline: raw.style_guideline ?? undefined,
		image: raw.image ?? null
	};
}

// Populated at runtime by loadBeers() from the `beers` Firestore collection
// (seeded by scripts/migrate-beers-to-firestore.mjs). Empty until then.
export let beers: Beer[] = [];

export async function loadBeers(): Promise<Beer[]> {
	const snapshot = await getDocs(collection(db, 'beers'));
	beers = snapshot.docs.map((doc) => mapRawBeer(doc.data() as RawBeer));
	return beers;
}

// How many loaded beers carry each questionnaire type (multi-tag, so the totals
// overlap and sum to more than beers.length). Used to badge the q1 options.
export function countByType(): Record<TypeId, number> {
	const counts: Record<TypeId, number> = {
		aromatic: 0,
		bitter: 0,
		fruity: 0,
		'gluten-free': 0,
		crispy: 0,
		wheat: 0
	};
	for (const b of beers) {
		for (const t of b.types) counts[t]++;
	}
	return counts;
}

// How many loaded beers carry each color, optionally pre-filtered to a questionnaire
// type (the q1 answer) so q2 only offers colors that exist for that type. With no type
// the totals sum to beers.length. Used to badge the q2 color bands and disable (X out)
// colors with no matching beers.
export function countByColor(type: TypeId | '' = ''): Record<ColorId, number> {
	const counts: Record<ColorId, number> = {
		'pale-lager': 0,
		'blonde-ale': 0,
		'pale-ale-ipa': 0,
		'amber-ale': 0,
		'red-ale': 0,
		'brown-ale': 0,
		porter: 0,
		stout: 0
	};
	for (const b of beers) {
		if (type && !b.types.includes(type)) continue;
		counts[b.color]++;
	}
	return counts;
}

// Buckets on the rounded whole-percent value so every real (decimal) abv falls into
// exactly one range - the raw comparisons used to leave gaps (e.g. 4.5, 5.5, 8.5, 10.5
// matched nothing), which is why q3's badge totals came up short of q2's.
function abvInRange(abv: number, range: AbvId): boolean {
	const rounded = Math.round(abv);
	switch (range) {
		case '0':
			return rounded === 0;
		case '4':
			return rounded >= 1 && rounded <= 4;
		case '5':
			return rounded === 5;
		case '6-8':
			return rounded >= 6 && rounded <= 8;
		case '9-10':
			return rounded >= 9 && rounded <= 10;
		case '11+':
			return rounded >= 11;
	}
}

// How many loaded beers fall in each ABV bucket, optionally pre-filtered by the q1
// type and q2 color answers so q3 only offers ABV ranges that exist for that
// type+color combo. Used to badge the q3 circles and hatch out (X) empty ones.
export function countByAbv(
	type: TypeId | '' = '',
	color: ColorId | '' = ''
): Record<AbvId, number> {
	const counts: Record<AbvId, number> = { '0': 0, '4': 0, '5': 0, '6-8': 0, '9-10': 0, '11+': 0 };
	for (const b of beers) {
		if (type && !b.types.includes(type)) continue;
		if (color && b.color !== color) continue;
		for (const range of Object.keys(counts) as AbvId[]) {
			if (abvInRange(b.abv, range)) counts[range]++;
		}
	}
	return counts;
}

// How many loaded beers land in each country, pre-filtered by the q1/q2/q3 answers so
// q4's map only shows locations that still have a matching beer. Used to hide markers
// and the worldwide/greece shortcut buttons for locations with nothing left.
export function countByCountry(
	type: TypeId | '' = '',
	color: ColorId | '' = '',
	abv: AbvId | '' = ''
): Record<CountryId, number> {
	const counts: Record<CountryId, number> = {
		greece: 0,
		germany: 0,
		belgium: 0,
		netherlands: 0,
		czech: 0,
		poland: 0,
		bulgaria: 0,
		hungary: 0,
		latvia: 0,
		sweden: 0,
		austria: 0,
		italy: 0,
		uk: 0,
		ireland: 0,
		usa: 0,
		mexico: 0,
		cyprus: 0,
		other: 0
	};
	for (const b of beers) {
		if (type && !b.types.includes(type)) continue;
		if (color && b.color !== color) continue;
		if (abv && !abvInRange(b.abv, abv)) continue;
		counts[b.country]++;
	}
	return counts;
}

const CITY_IDS: CityId[] = [
	'athens',
	'thessaloniki',
	'heraklion',
	'serres',
	'evia',
	'corfu',
	'chios',
	'attica',
	'folegandros',
	'patras',
	'rethymno',
	'samothraki',
	'chalkidiki'
];

// How many loaded Greek beers land in each of the map's known cities, pre-filtered by
// the q1/q2/q3 answers. Only Greece has city-level markers, so beers from other
// countries (and Greek beers with an unrecognized city slug) never contribute here.
export function countByCity(
	type: TypeId | '' = '',
	color: ColorId | '' = '',
	abv: AbvId | '' = ''
): Record<CityId, number> {
	const counts = Object.fromEntries(CITY_IDS.map((id) => [id, 0])) as Record<CityId, number>;
	for (const b of beers) {
		if (b.country !== 'greece') continue;
		if (type && !b.types.includes(type)) continue;
		if (color && b.color !== color) continue;
		if (abv && !abvInRange(b.abv, abv)) continue;
		if (b.city && (CITY_IDS as string[]).includes(b.city)) counts[b.city as CityId]++;
	}
	return counts;
}

export function filterBeers(answers: Answers): Beer[] {
	const { type, color, abv, country, city } = answers;
	return beers.filter(
		(b) =>
			(!type || b.types.includes(type)) &&
			(!color || b.color === color) &&
			(!abv || abvInRange(b.abv, abv)) &&
			(!country || b.country === country) &&
			(!city || b.city === city)
	);
}

export function filterBeer(answers: Answers): Beer {
	const { type, color, abv, country, city } = answers;

	const exactWithCity = beers.find(
		(b) =>
			(!type || b.types.includes(type)) &&
			(!color || b.color === color) &&
			(!abv || abvInRange(b.abv, abv)) &&
			(!country || b.country === country) &&
			(!city || b.city === city)
	);
	if (exactWithCity) return exactWithCity;

	const exact = beers.find(
		(b) =>
			(!type || b.types.includes(type)) &&
			(!color || b.color === color) &&
			(!abv || abvInRange(b.abv, abv)) &&
			(!country || b.country === country)
	);
	if (exact) return exact;

	const noCountry = beers.find(
		(b) =>
			(!type || b.types.includes(type)) &&
			(!color || b.color === color) &&
			(!abv || abvInRange(b.abv, abv))
	);
	if (noCountry) return noCountry;

	const noColor = beers.find(
		(b) => (!type || b.types.includes(type)) && (!abv || abvInRange(b.abv, abv))
	);
	if (noColor) return noColor;

	return beers[0];
}
