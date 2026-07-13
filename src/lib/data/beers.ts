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
	type: TypeId;
	flavor: string[];
	notes?: string;
	styleGuideline?: StyleGuideline;
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
// Catalog: docs in the Firestore `beers` collection (seeded from
// static/beers-enriched.json via scripts/migrate-beers-to-firestore.mjs)
// mapped into the app's Beer shape. The source data uses free-text
// country/city and has no `type`, so we slug the origin and derive the
// questionnaire `type` here.
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

// Derive the questionnaire type from style + flavour + dietary flags (priority order).
function deriveType(raw: RawBeer): TypeId {
	if (raw.gluten_free) return 'gluten-free';
	const s = (raw.style + ' ' + raw.flavor.join(' ')).toLowerCase();
	if (/weiss|weizen|hefe|\bwit\b|witte|wheat|weiz/.test(s)) return 'wheat';
	if (/sour|gose|lambic|kriek|framboise|cassis|cider|radler|fruit|cherry|berry|mango|peach|passion|raspberry|strawberry|apple|blueberry/.test(s))
		return 'fruity';
	if (/stout|porter|imperial|barley\s?wine|barleywine|west coast|wcipa|\bdipa\b|\btipa\b|double ipa|triple ipa|quadruple|bitter|resinous/.test(s))
		return 'bitter';
	if (/pilsner|pilsener|\bpils\b|lager|helles|\bcrisp\b|clean/.test(s)) return 'crispy';
	return 'aromatic';
}

function mapRawBeer(raw: RawBeer): Beer {
	return {
		id: raw.id,
		name: raw.name,
		brewery: raw.brewery ?? 'Unknown',
		style: raw.style,
		abv: raw.abv ?? 0,
		ibu: raw.ibu,
		color: raw.color ?? 'blonde-ale',
		country: countrySlug(raw.country),
		city: citySlug(raw.city),
		type: deriveType(raw),
		flavor: raw.flavor,
		notes: raw.notes || undefined,
		styleGuideline: raw.style_guideline ?? undefined
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

function abvInRange(abv: number, range: AbvId): boolean {
	switch (range) {
		case '0':
			return abv === 0;
		case '4':
			return abv <= 4;
		case '5':
			return abv === 5;
		case '6-8':
			return abv >= 6 && abv <= 8;
		case '9-10':
			return abv >= 9 && abv <= 10;
		case '11+':
			return abv >= 11;
	}
}

export function filterBeer(answers: Answers): Beer {
	const { type, color, abv, country, city } = answers;

	const exactWithCity = beers.find(
		(b) =>
			(!type || b.type === type) &&
			(!color || b.color === color) &&
			(!abv || abvInRange(b.abv, abv)) &&
			(!country || b.country === country) &&
			(!city || b.city === city)
	);
	if (exactWithCity) return exactWithCity;

	const exact = beers.find(
		(b) =>
			(!type || b.type === type) &&
			(!color || b.color === color) &&
			(!abv || abvInRange(b.abv, abv)) &&
			(!country || b.country === country)
	);
	if (exact) return exact;

	const noCountry = beers.find(
		(b) =>
			(!type || b.type === type) &&
			(!color || b.color === color) &&
			(!abv || abvInRange(b.abv, abv))
	);
	if (noCountry) return noCountry;

	const noColor = beers.find((b) => (!type || b.type === type) && (!abv || abvInRange(b.abv, abv)));
	if (noColor) return noColor;

	return beers[0];
}
