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
	'greece' | 'germany' | 'belgium' | 'usa' | 'uk' | 'japan' | 'mexico' | 'australia';
export type CityId = 'athens' | 'thessaloniki' | 'heraklion';
export type AbvId = '0' | '4' | '5' | '6-8' | '9-10' | '11+';

export interface Beer {
	id: string;
	name: string;
	brewery: string;
	style: string;
	abv: number;
	ibu: number;
	color: ColorId;
	country: CountryId;
	city?: CityId;
	type: TypeId;
	description: { en: string; gr: string };
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
	usa: { name: 'USA', flag: '🇺🇸' },
	uk: { name: 'UK', flag: '🇬🇧' },
	japan: { name: 'Japan', flag: '🇯🇵' },
	mexico: { name: 'Mexico', flag: '🇲🇽' },
	australia: { name: 'Australia', flag: '🇦🇺' }
};

export const beers: Beer[] = [
	{
		id: 'magissa',
		name: 'Magissa (Μάγισσα)',
		brewery: 'KVLT Brewing Society',
		style: 'IPA - New England / Hazy',
		abv: 7,
		ibu: 40,
		color: 'blonde-ale',
		country: 'greece',
		city: 'athens',
		type: 'aromatic',
		description: {
			en: 'A trippy IPA. Hazy, juicy with medium carbonation levels for a silky and creamy mouthfeel. Mosaic and Azacca hops are responsible for the intense mango, pineapple, piney/herbal fragrance and for the balanced bitterness.',
			gr: 'Μια ψυχεδελική IPA. Θολή, ζουμερή με μέτρια ανθράκωση για μεταξένια και κρεμώδη αίσθηση. Λυκίσκοι Mosaic και Azacca δίνουν έντονο άρωμα μάνγκο, ανανά και βοτάνων με ισορροπημένη πικράδα.'
		}
	},
	{
		id: 'golden-tentacle',
		name: 'Golden Tentacle',
		brewery: 'Lovecraft Beers',
		style: 'Blonde Ale',
		abv: 5,
		ibu: 18,
		color: 'blonde-ale',
		country: 'greece',
		city: 'thessaloniki',
		type: 'crispy',
		description: {
			en: 'A light and refreshing blonde ale with a crisp finish. Notes of honey and light citrus with a clean, dry aftertaste.',
			gr: 'Μια ελαφριά και δροσερή ξανθιά μπύρα με τραγανή επίγευση. Νότες μελιού και ελαφριών εσπεριδοειδών.'
		}
	},
	{
		id: 'deep-amber',
		name: 'Deep Amber',
		brewery: 'Lovecraft Beers',
		style: 'Amber Ale',
		abv: 6,
		ibu: 30,
		color: 'amber-ale',
		country: 'greece',
		city: 'heraklion',
		type: 'bitter',
		description: {
			en: 'A rich amber ale with a well-balanced malt and hop profile. Caramel sweetness with a pleasantly bitter finish.',
			gr: 'Μια πλούσια κεχριμπαρένια μπύρα με ισορροπημένο προφίλ βύνης και λυκίσκου. Καραμελένια γλύκα με ευχάριστα πικρή επίγευση.'
		}
	},
	{
		id: 'wheat-kraken',
		name: 'Wheat Kraken',
		brewery: 'Lovecraft Beers',
		style: 'Hefeweizen',
		abv: 5,
		ibu: 12,
		color: 'pale-ale-ipa',
		country: 'germany',
		type: 'wheat',
		description: {
			en: 'A classic German-style wheat beer with banana and clove aromas. Smooth, cloudy, and refreshing with a soft mouthfeel.',
			gr: 'Μια κλασική γερμανική σιταρένια μπύρα με αρώματα μπανάνας και γαρίφαλου. Απαλή, θολή και δροσιστική.'
		}
	},
	{
		id: 'berry-abomination',
		name: 'Berry Abomination',
		brewery: 'Lovecraft Beers',
		style: 'Fruit Sour',
		abv: 4,
		ibu: 10,
		color: 'red-ale',
		country: 'belgium',
		type: 'fruity',
		description: {
			en: 'A wild, fruit-forward sour bursting with raspberry and blackberry. Tart, refreshing, and dangerously drinkable.',
			gr: 'Μια άγρια, φρουτένια ξινή μπύρα γεμάτη βατόμουρο και σμέουρο. Ξινή, δροσιστική και επικίνδυνα εύπιωτη.'
		}
	},
	{
		id: 'cosmic-stout',
		name: 'Cosmic Stout',
		brewery: 'Lovecraft Beers',
		style: 'Imperial Stout',
		abv: 11,
		ibu: 55,
		color: 'stout',
		country: 'uk',
		type: 'bitter',
		description: {
			en: 'A bold imperial stout with notes of dark chocolate, espresso, and roasted malts. Rich, warming, and intensely complex.',
			gr: 'Μια τολμηρή imperial stout με νότες μαύρης σοκολάτας, εσπρέσο και καβουρδισμένης βύνης. Πλούσια, ζεστή και εντυπωσιακά σύνθετη.'
		}
	},
	{
		id: 'gluten-ghost',
		name: 'Gluten Ghost',
		brewery: 'Lovecraft Beers',
		style: 'Gluten-Free Lager',
		abv: 4,
		ibu: 15,
		color: 'pale-lager',
		country: 'usa',
		type: 'gluten-free',
		description: {
			en: "A crisp, clean gluten-free lager that proves free-from doesn't mean flavour-free. Light and refreshing with a smooth finish.",
			gr: 'Μια τραγανή, καθαρή μπύρα χωρίς γλουτένη που αποδεικνύει ότι χωρίς γλουτένη δε σημαίνει χωρίς γεύση.'
		}
	},
	{
		id: 'sunken-torii',
		name: 'Sunken Torii',
		brewery: 'Lovecraft Beers',
		style: 'Rice Lager',
		abv: 5,
		ibu: 12,
		color: 'pale-lager',
		country: 'japan',
		type: 'crispy',
		description: {
			en: 'An ultra-clean rice lager brewed in the shadow of drowned shrines. Delicate, dry and crisp with a whisper of jasmine and an abyssally smooth finish.',
			gr: 'Μια πεντακάθαρη rice lager φτιαγμένη στη σκιά βυθισμένων ναών. Ντελικάτη, ξηρή και τραγανή με μια ιδέα γιασεμιού και απύθμενα απαλή επίγευση.'
		}
	},
	{
		id: 'aztec-abyss',
		name: 'Aztec Abyss',
		brewery: 'Lovecraft Beers',
		style: 'Vienna Lager',
		abv: 5,
		ibu: 22,
		color: 'amber-ale',
		country: 'mexico',
		type: 'aromatic',
		description: {
			en: 'A copper-hued Vienna lager from forgotten temple cellars. Toasted malt, subtle caramel and a faint echo of cacao rising from the deep.',
			gr: 'Μια χάλκινη Vienna lager από ξεχασμένα κελάρια ναών. Καβουρδισμένη βύνη, διακριτική καραμέλα και ένας αμυδρός απόηχος κακάο από τα βάθη.'
		}
	},
	{
		id: 'southern-shoggoth',
		name: 'Southern Shoggoth',
		brewery: 'Lovecraft Beers',
		style: 'Australian Pale Ale',
		abv: 6,
		ibu: 35,
		color: 'pale-ale-ipa',
		country: 'australia',
		type: 'fruity',
		description: {
			en: 'A shape-shifting pale ale bursting with Galaxy hops. Passionfruit, peach and citrus tentacles wrap around a bright, juicy body.',
			gr: 'Μια μεταμορφική pale ale γεμάτη λυκίσκο Galaxy. Πλοκάμια από φρούτο του πάθους, ροδάκινο και εσπεριδοειδή τυλίγουν ένα φωτεινό, ζουμερό σώμα.'
		}
	}
];

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
