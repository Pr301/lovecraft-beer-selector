// Builds static/beers-enriched.json from compact, brewery-grouped source data.
//
// Source: ~/Downloads/BEER LIST.xls (extracted with `strings`), deduplicated across
// packaging variants. Origin/city is a brewery-level property; beers inherit it.
// Fields derived from beer name + knowledge, web-verified where a `src` URL is given.
// Images are intentionally omitted this pass. See static/beers-enriched.README.md.
//
// Run:  node scripts/build-beers-enriched.mjs
//
// Beer tuple: [name, style, abv, opts?]
//   abv: number | null
//   opts: { color, flavor, gf, vegan, packaging, conf, city, notes, src }
// Brewery meta supplies defaults: { brewery, country, city, conf, src, notes }

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'static', 'beers-enriched.json'); // standalone research deliverable
const APP_OUT = join(ROOT, 'src', 'lib', 'data', 'beers-catalog.json'); // consumed by the app

const COLORS = new Set([
	'pale-lager',
	'blonde-ale',
	'pale-ale-ipa',
	'amber-ale',
	'red-ale',
	'brown-ale',
	'porter',
	'stout'
]);

function colorFor(style) {
	const s = style.toLowerCase();
	if (/kriek|cherry|framboise|raspberry|cassis|strawberry|fruit lambic|rouge|red ale|red ipa|red beer|ruby/.test(s))
		return 'red-ale';
	if (/imperial stout|oatmeal stout|tropical stout|cream stout|nitro stout|marshmallow stout|espresso stout|\bstout\b/.test(s))
		return 'stout';
	if (/baltic porter/.test(s)) return 'brown-ale';
	if (/porter/.test(s)) return 'porter';
	if (/quad|doppelbock|rauchbock|dark lager|dunkel|dark ale|dark premium|double dark|bruin|eisbock|barley\s?wine|barleywine|whisky beer|imperial(?!\s*red)/.test(s))
		return 'brown-ale';
	if (/amber|marzen|märzen|vienna|dubbel|smoked amber|rauch|chestnut|honey ale/.test(s)) return 'amber-ale';
	if (/imperial red|red ipa/.test(s)) return 'red-ale';
	if (/neipa|hazy|new england|ipa|pale ale|\bapa\b|xpa|dipa|tipa|india pale|smash|cold ipa|hipa/.test(s))
		return 'pale-ale-ipa';
	if (/gose|berliner/.test(s)) return 'blonde-ale';
	if (/sour|wild ale|saison/.test(s)) return 'blonde-ale';
	if (/pilsner|pilsener|\bpils\b|helles|radler|pale lager|hoppy lager|dark lager|mango lager|\blager\b|premium|exkluziv|celebration/.test(s))
		return 'pale-lager';
	if (/tripel|triple|blonde|blond|golden|weiss|weizen|hefe|witte|\bwit\b|wheat|weiz/.test(s)) return 'blonde-ale';
	if (/strong ale|strong golden|belgian/.test(s)) return 'blonde-ale';
	if (/cider/.test(s)) return null;
	return null;
}

function flavorFor(style) {
	const s = style.toLowerCase();
	if (/imperial stout|marshmallow stout/.test(s)) return ['roasted', 'dark-chocolate', 'espresso', 'boozy'];
	if (/pastry|smoothie|gelato/.test(s)) return ['sweet', 'creamy', 'fruity', 'dessert'];
	if (/oatmeal stout/.test(s)) return ['roasted', 'coffee', 'chocolate', 'oats', 'smooth'];
	if (/espresso stout|coffee/.test(s)) return ['coffee', 'roasted', 'chocolate'];
	if (/tropical stout/.test(s)) return ['roasted', 'dark-fruit', 'chocolate', 'warming'];
	if (/cream stout|nitro stout|\bstout\b/.test(s)) return ['roasted-barley', 'coffee', 'chocolate', 'creamy'];
	if (/baltic porter/.test(s)) return ['roasted', 'dark-fruit', 'chocolate', 'warming'];
	if (/porter/.test(s)) return ['chocolate', 'coffee', 'roasted-malt'];
	if (/barley\s?wine|barleywine/.test(s)) return ['caramel', 'dark-fruit', 'boozy', 'malty'];
	if (/quad|doppelbock|rauchbock/.test(s)) return ['dark-fruit', 'caramel', 'malty', 'warming'];
	if (/dubbel/.test(s)) return ['dark-fruit', 'caramel', 'malty'];
	if (/eisbock/.test(s)) return ['dark-fruit', 'plum', 'malty', 'warming'];
	if (/dark lager|dunkel|dark ale|dark premium|double dark|bruin/.test(s)) return ['caramel', 'toasted-malt', 'coffee', 'smooth'];
	if (/tripel|triple|belgian strong golden|strong golden/.test(s)) return ['fruity', 'spicy', 'honey', 'dry'];
	if (/blonde|blond|golden/.test(s)) return ['fruity', 'floral', 'honey', 'crisp'];
	if (/hefe|weiss|weizen|weiz|vitus/.test(s)) return ['banana', 'clove', 'wheat', 'soft'];
	if (/wit|witte/.test(s)) return ['wheat', 'citrus', 'coriander', 'soft'];
	if (/neipa|new england|hazy/.test(s)) return ['tropical', 'juicy', 'citrus', 'soft'];
	if (/dipa|tipa|double ipa|triple ipa|imperial ipa|quadruple ipa/.test(s)) return ['resinous', 'tropical', 'boozy', 'bitter'];
	if (/west coast|wcipa|cold ipa|smash|hipa/.test(s)) return ['citrus', 'pine', 'resinous', 'bitter'];
	if (/red ipa|imperial red/.test(s)) return ['caramel', 'resinous-hop', 'citrus', 'bitter'];
	if (/\bipa\b|india pale/.test(s)) return ['citrus', 'tropical', 'pine', 'bitter'];
	if (/pale ale|\bapa\b|xpa/.test(s)) return ['citrus', 'floral', 'light-body', 'crisp'];
	if (/gose/.test(s)) return ['tart', 'salty', 'citrus', 'refreshing'];
	if (/sour|wild|kriek|framboise|cassis|peach|strawberry|cherry|fruit/.test(s)) return ['tart', 'fruity', 'refreshing', 'juicy'];
	if (/saison/.test(s)) return ['peppery', 'fruity', 'dry', 'farmhouse'];
	if (/radler/.test(s)) return ['citrus', 'light', 'refreshing', 'sweet'];
	if (/amber|marzen|vienna|smoked amber|rauch|honey ale|chestnut/.test(s)) return ['caramel', 'toasted-malt', 'toffee'];
	if (/red ale|red beer|ruby|rouge/.test(s)) return ['caramel', 'toasted-malt', 'fruity'];
	if (/pilsner|pilsener|pils|helles|lager|premium/.test(s)) return ['bready-malt', 'floral-hop', 'crisp', 'clean'];
	if (/cider/.test(s)) return ['apple', 'crisp', 'sweet'];
	if (/herbal/.test(s)) return ['herbal', 'botanical', 'bittersweet'];
	return ['malty', 'balanced', 'smooth'];
}

// ---------------------------------------------------------------------------
// Data. `_` = brewery meta; array = beers.
// ---------------------------------------------------------------------------
const DATA = {
	// ============================ GREECE ============================
	flaros: {
		_: { brewery: 'Flaros', country: 'Greece', city: 'Serres', conf: 'medium',
			src: 'https://www.beeradvocate.com/beer/profile/48946/',
			notes: 'Brewed within the 33 Brewing Company family; Untappd lists Athens, BeerAdvocate Serres.' },
		beers: [
			['Flaros IPA', 'IPA - American', 5.7, { flavor: ['citrus', 'pine', 'grapefruit', 'bitter'], conf: 'high' }],
			['Flaros Porter', 'Porter', 6.5, { flavor: ['chocolate', 'coffee', 'roasted-malt', 'caramel'], conf: 'high' }],
			['Flaros Amber', 'Amber Ale', 5.2, { conf: 'high' }],
			['Flaros Session Ale', 'Pale Ale - Session', 4.7, { conf: 'high' }],
			['Flaros DIPA', 'IPA - Double', 8, { conf: 'low', notes: 'ABV estimated.' }],
			['Flaros Barley Wine', 'Barley Wine', 10, { conf: 'low', notes: 'ABV estimated.' }]
		]
	},
	septem: {
		_: { brewery: 'Septem Microbrewery', country: 'Greece', city: 'Orologio, Evia', conf: 'medium',
			src: 'https://www.septem.gr/index-en.html' },
		beers: [
			['Septem Thursday\'s Red Ale', 'Red Ale - Irish', 4.5, { conf: 'high' }],
			['Septem Monday\'s Pilsner', 'Pilsner', 5.0, { conf: 'high' }],
			['Septem Friday\'s Pale Ale', 'Pale Ale', 5.0, { conf: 'medium' }],
			['Septem Saturday\'s Porter', 'Porter', 5.5, { conf: 'medium', notes: 'ABV estimated.' }],
			['Septem Sunday\'s Honey Golden Ale', 'Golden Ale - Honey', 5.5, { conf: 'medium', notes: 'ABV estimated.' }],
			['Septem Mylos Lager', 'Lager', 4.6, { conf: 'high' }],
			['Septem Seta Nera Oatmeal Stout', 'Stout - Oatmeal', 5.5, { conf: 'medium', notes: 'ABV estimated.' }],
			['Septem Lava Imperial Red IPA', 'IPA - Imperial Red', 9.0, { conf: 'high' }],
			['Septem Dry Stone', 'IPA', 8.1, { conf: 'high', notes: 'Listed at 8.1% (Key-Keg).' }],
			['Septem Quaranta Giorni NEIPA', 'IPA - New England', 5.9, { conf: 'high' }],
			['Septem Dilemma Barleywine', 'Barley Wine', 10.9, { conf: 'high' }],
			['Septem Kleos Imperial Stout', 'Stout - Imperial', 10.6, { conf: 'high' }]
		]
	},
	voreia: {
		_: { brewery: 'Voreia / Siris Microbrewery', country: 'Greece', city: 'Serres', conf: 'medium',
			src: 'https://voreiabeer.com/en/', vegan: true },
		beers: [
			['Voreia Pilsner (Gluten Free)', 'Pilsner - Gluten Free', 5.0, { gf: true, conf: 'high' }],
			['Voreia India Pale Ale', 'IPA', 6.0, { conf: 'medium', notes: 'Marked VEGAN on the list; ABV approximate.' }],
			['Voreia Stout', 'Stout', 5.0, { conf: 'medium', notes: 'Bronze, Brussels Beer Challenge 2015. ABV approximate.' }],
			['Voreia Weiss', 'Witbier / Weissbier', 5.0, { conf: 'medium' }],
			['Voreia Lager', 'Lager', 5.0, { conf: 'medium' }],
			['Voreia Latina', 'Pale Lager', 4.5, { conf: 'high', notes: 'Listed at 4.5%.' }],
			['Voreia Pale Ale (Session)', 'Pale Ale - Session', 4.5, { conf: 'medium' }],
			['Voreia Smoked Amber Ale', 'Amber Ale - Smoked', 5.5, { conf: 'medium', notes: 'ABV estimated.' }]
		]
	},
	sknipa: {
		_: { brewery: 'Sknipa (Standard Microbrewery of Thessaloniki)', country: 'Greece', city: 'Thessaloniki', conf: 'medium',
			src: 'https://www.sknipa.beer/en/', notes: 'Unpasteurised/unfiltered; Salonikia is Sknipa\'s label.' },
		beers: [
			['Sknipa Lager', 'Lager', 5.0, { conf: 'medium' }],
			['Sknipa Imperial Stout', 'Stout - Imperial', 12.0, { conf: 'high' }],
			['Sknipa Bold Session IPA', 'IPA - Session', 4.5, { conf: 'low', notes: 'ABV estimated.' }],
			['Sknipa Strong Ale', 'Strong Ale', 7.5, { color: 'amber-ale', conf: 'low', notes: 'ABV estimated.' }],
			['Sknipa Crafty Greek Roustchouk Porter', 'Porter', 6.2, { conf: 'high', notes: 'Listed 15P / 6.2%.' }],
			['Salonikia Oatmeal Stout', 'Stout - Oatmeal', 5.5, { conf: 'medium' }],
			['Salonikia Pale Ale', 'Pale Ale - American', 5.5, { conf: 'high', notes: 'Listed at 5.5%.' }],
			['Salonikia Honey Pilsner', 'Pilsner - Honey', 5.5, { conf: 'high', notes: 'Silver, Frankfurt Int. 2019.' }],
			['Salonikia Weiss', 'Weissbier', 5.0, { conf: 'low' }],
			['Salonikia Mango Lager', 'Lager - Fruited', 5.0, { flavor: ['mango', 'bready-malt', 'crisp', 'fruity'], conf: 'low' }]
		]
	},
	tsaperdona: {
		_: { brewery: 'Thessbeera (with Sknipa)', country: 'Greece', city: 'Thessaloniki', conf: 'high',
			src: 'https://www.thessbeera.gr/product/tsaperdona-hoppy-lager-330-ml-57/' },
		beers: [
			['Tsaperdona Hoppy Lager', 'India Pale Lager', 5.7, { flavor: ['citrus', 'floral-hop', 'crisp', 'bready-malt'], conf: 'high', notes: 'Silver, Untappd Community Awards 2024 (IPL).' }],
			['Thess Blonde (2310)', 'Blonde Ale', 4.9, { conf: 'medium', notes: '2310 = Thessaloniki dialing code; listed 4.9%.' }]
		]
	},
	corfu: {
		_: { brewery: 'Corfu Beer (Corfu Microbrewery)', country: 'Greece', city: 'Arillas, Corfu', conf: 'medium',
			src: 'https://arillas.com/corfubeer' },
		beers: [
			['Corfu Lager', 'Lager', 5.0, { conf: 'medium' }],
			['Corfu Pilsner', 'Pilsner', 5.0, { conf: 'medium', notes: 'Royal Ionian pilsner.' }],
			['Corfu IPA Contessa', 'IPA', 6.2, { conf: 'high', notes: 'Unfiltered, double fermentation.' }],
			['Corfu Red Ale Special', 'Red Ale', 5.5, { conf: 'low', notes: 'ABV estimated.' }],
			['Corfu Dark Ale', 'Dark Ale', 5.5, { color: 'brown-ale', flavor: ['roasted-malt', 'caramel', 'bitter', 'coffee'], conf: 'low', notes: 'Listed as BITTER; ABV estimated.' }],
			['Corfu Epos', 'Strong Ale', 7.0, { color: 'amber-ale', conf: 'low', notes: 'ABV estimated.' }],
			['Corfu Hoppy and Free', 'Pale Ale - Non-Alcoholic', 0.5, { conf: 'low', notes: 'Low/no-alcohol hoppy ale.' }],
			['Corfu Weiss Amorosa', 'Weissbier', 5.0, { conf: 'low' }],
			['Royal Ionian Radler', 'Radler', 2.0, { conf: 'high', notes: 'Listed at 2% (Corfu).' }]
		]
	},
	kvlt: {
		_: { brewery: 'KVLT Brewing Society', country: 'Greece', city: 'Athens', conf: 'high',
			src: 'https://untappd.com/b/kvlt-brewing-society-magissa-magissa/4442225', notes: 'Associated with 33 Brewing Company, Athens.' },
		beers: [
			['Magissa (Μάγισσα)', 'IPA - New England / Hazy', 7.0, { flavor: ['mango', 'pineapple', 'piney', 'juicy', 'creamy'], conf: 'high' }],
			['KVLT Salted Caramel Dark Lager', 'Lager - Dark', 5.5, { color: 'brown-ale', flavor: ['milk-caramel', 'vanilla', 'cocoa', 'salted', 'smooth'], conf: 'high' }]
		]
	},
	darkcrops: {
		_: { brewery: 'Dark Crops Brewery', country: 'Greece', city: 'Athens', conf: 'high',
			src: 'https://untappd.com/DarkCrops' },
		beers: [
			['Dark Crops White Whale Imperial Stout', 'Stout - Imperial', 15.0, { flavor: ['roasted-coffee', 'dark-chocolate', 'dark-fruit', 'mocha', 'boozy'], conf: 'high', notes: 'Listed at 15%.' }],
			['Dark Crops Freezing Moon Imperial Stout', 'Stout - Imperial', 10.0, { flavor: ['chocolate', 'coffee', 'licorice', 'roasted'], conf: 'high', notes: 'Listed at 10%.' }],
			['Dark Crops American Pale Ale', 'Pale Ale - American', 5.5, { conf: 'medium' }],
			['Dark Crops India Pale Ale', 'IPA', 6.5, { conf: 'medium' }],
			['Dark Crops Minor Threat DIPA', 'IPA - Double', 8.0, { conf: 'medium' }],
			['Dark Crops Hop Luminati Triple IPA', 'IPA - Triple', 10.0, { conf: 'high', notes: 'Listed at 10%.' }],
			['Dark Crops Heretic Belgian Dark Ale', 'Belgian Strong Dark Ale', 7.0, { color: 'brown-ale', flavor: ['dark-fruit', 'spicy', 'caramel', 'warming'], conf: 'high', notes: 'Listed at 7%.' }],
			['Dark Crops Candivore', 'Weiss IPA', 5.5, { color: 'blonde-ale', flavor: ['wheat', 'citrus', 'tropical', 'soft'], conf: 'low' }]
		]
	},
	clepsydra: {
		_: { brewery: 'Clepsydra Brewing', country: 'Greece', city: 'Athens (brews on Chios)', conf: 'medium',
			src: 'https://untappd.com/ClepsydraNomadBrewing' },
		beers: [
			['Clepsydra Walnut Pie', 'Pastry Stout', 10.0, { color: 'stout', flavor: ['walnut', 'caramel', 'vanilla', 'sweet', 'boozy'], conf: 'high', notes: 'Listed at 10%.' }],
			['Clepsydra Rauch Stout', 'Stout - Smoked', 6.0, { flavor: ['smoky', 'roasted', 'chocolate', 'coffee'], conf: 'low', notes: 'ABV estimated.' }],
			['Clepsydra Just In Time NEIPA', 'IPA - New England', 7.0, { conf: 'high', notes: 'Citrus-spiked; listed at 7%.' }]
		]
	},
	thria: {
		_: { brewery: 'Thria Brewery', country: 'Greece', city: 'Attica (Thriasio)', conf: 'low',
			src: 'name+knowledge', notes: 'Origin city unverified.' },
		beers: [
			['Thria IPA', 'IPA', 7.5, { conf: 'high', notes: 'Listed at 7.5%.' }],
			['Thria Double IPA', 'IPA - Double', 8.5, { conf: 'low', notes: 'ABV estimated.' }]
		]
	},
	noblemen: {
		_: { brewery: 'Noble Men Beer', country: 'Greece', city: 'Athens', conf: 'medium',
			src: 'https://greekbeershop.gr/brewery/noble-men-beer/', notes: 'Brand by brewer Pavlos Kotsidis.' },
		beers: [
			['Noble Men Holy Strength', 'Belgian Strong Ale', 12.0, { color: 'brown-ale', conf: 'high', notes: 'Listed at 12%.' }],
			['Noble Men Red Grizzly', 'Red Ale', 5.5, { conf: 'high', notes: 'Listed at 5.5%.' }]
		]
	},
	katsika: {
		_: { brewery: 'Katsika Beer', country: 'Greece', city: 'Folegandros', conf: 'medium',
			src: 'https://www.facebook.com/katsika.beer/', notes: 'Unfiltered island craft beer.' },
		beers: [
			['Katsika Pale Ale', 'Pale Ale', 5.4, { conf: 'high', notes: 'Listed at 5.4%.' }],
			['Katsika Pilsner', 'Pilsner', 5.0, { conf: 'high', notes: 'Listed at 5%.' }]
		]
	},
	ammousa: {
		_: { brewery: 'Ammousa Beer', country: 'Greece', city: 'Patras', conf: 'high',
			src: 'https://www.ammousabeer.gr/get-to-know-me/' },
		beers: [
			['Ammousa IPA', 'IPA - English', 5.5, { flavor: ['citrus', 'ginger', 'floral', 'bitter'], conf: 'high', notes: 'English IPA with ginger; listed 5.5%.' }],
			['Ammousa Tropical Stout', 'Stout - Tropical', 7.0, { conf: 'high', notes: 'Listed at 7%.' }]
		]
	},
	retimi: {
		_: { brewery: 'Retimi (Rethymnian Independent Microbrewery)', country: 'Greece', city: 'Rethymno, Crete', conf: 'high',
			src: 'https://www.tastybeertours.com/post/crete-craft-beer-guide-ii', notes: 'Founded 2024.' },
		beers: [
			['Retimi Blond Ale', 'Blonde Ale', 5.0, { conf: 'medium' }],
			['Retimi Red Ale', 'Red Ale', 5.5, { conf: 'medium', notes: 'Highly rated in style.' }],
			['Retimi Smokey Ale', 'Smoked Ale', 5.5, { color: 'amber-ale', flavor: ['smoky', 'caramel', 'toasted-malt'], conf: 'low' }],
			['Retimi Strong Ale', 'Strong Ale', 8.0, { color: 'amber-ale', conf: 'low', notes: 'ABV estimated.' }]
		]
	},
	fonias: {
		_: { brewery: 'Samothraki Microbrewery (Fonias)', country: 'Greece', city: 'Samothraki', conf: 'high',
			src: 'https://www.discovergreece.com/travel-ideas/cover-story/greek-beer-and-microbreweries' },
		beers: [
			['Fonias IPA', 'IPA', 6.7, { conf: 'high', notes: 'Listed at 6.7%.' }],
			['Fonias Pale Ale', 'Pale Ale', 6.2, { flavor: ['peach', 'citrus', 'floral', 'full-body'], conf: 'high', notes: 'Peachy aromas; listed 6.2%.' }]
		]
	},
	valtinger: {
		_: { brewery: 'Valtinger', country: 'Greece', city: 'Kassandra, Chalkidiki', conf: 'high',
			src: 'https://www.thessbeera.gr/' },
		beers: [
			['Valtinger Honey Ale', 'Golden Ale - Honey', 5.6, { color: 'blonde-ale', conf: 'high', notes: 'Listed at 5.6%.' }],
			['Valtinger Hop On IPA', 'IPA', 6.5, { conf: 'high', notes: 'Listed at 6.5%.' }],
			['Valtinger Pilsner', 'Pilsner - German', 5.4, { conf: 'high', notes: 'Listed at 5.4%.' }]
		]
	},
	chios: {
		_: { brewery: 'Chios Microbrewery', country: 'Greece', city: 'Chios', conf: 'high',
			src: 'https://untappd.com/ChiosBeer/beer', notes: 'Founded 2011.' },
		beers: [
			['Chios BBQ', 'Smoked Beer', 5.5, { color: 'amber-ale', flavor: ['smoky', 'toasted-malt', 'caramel'], conf: 'low' }],
			['Chios Wheat with Mastic', 'Wheat Beer - Mastic', 5.0, { color: 'blonde-ale', flavor: ['wheat', 'mastic-resin', 'herbal', 'soft'], conf: 'medium', notes: 'Made with Chios mastic.' }]
		]
	},
	earthgravel: {
		_: { brewery: 'Earth & Gravel Brewing Co.', country: 'Greece', city: 'Athens', conf: 'high',
			src: 'https://untappd.com/EarthGravelBrewingCo' },
		beers: [
			['Earth & Gravel Cruiser', 'Lager - Gluten Free', 4.5, { gf: true, conf: 'medium', notes: 'Marked gluten free on the list.' }],
			['Earth & Gravel Lane Splitter', 'IPA - Session', 4.5, { conf: 'medium' }]
		]
	},
	solo: {
		_: { brewery: 'Solo Craft Beer', country: 'Greece', city: 'Heraklion, Crete', conf: 'medium',
			src: 'https://www.discovergreece.com/travel-ideas/cover-story/greek-beer-and-microbreweries', notes: 'Gold (Solo Porter), Barcelona Beer Festival 2017.' },
		beers: [['Solo Craft Lager', 'Lager', 5.0, { conf: 'medium' }]]
	},
	methia: {
		_: { brewery: 'Methia', country: 'Greece', city: null, conf: 'low', src: 'name+knowledge', notes: 'Origin city unverified.' },
		beers: [
			['Methia IPA', 'IPA', 6.0, { conf: 'low' }],
			['Methia Pale Ale', 'Pale Ale', 5.0, { conf: 'low' }]
		]
	},
	lola: {
		_: { brewery: 'Lola Beer', country: 'Greece', city: null, conf: 'low', src: 'name+knowledge', notes: 'Origin city unverified.' },
		beers: [
			['Lola Art Pilsner', 'Pilsner', 5.0, { conf: 'medium', notes: 'Listed at 5%.' }],
			['Lola Cambos Lager', 'Lager', 5.0, { conf: 'low' }],
			['Lola Loco Herbal Beer', 'Herbal Ale', 5.0, { color: 'blonde-ale', conf: 'low' }],
			['Lola IPA (Gluten Free)', 'IPA - Gluten Free', 5.5, { gf: true, conf: 'medium', notes: 'Marked gluten free.' }]
		]
	},
	paragon: {
		_: { brewery: 'Paragon Brewing', country: 'Greece', city: null, conf: 'low', src: 'name+knowledge', notes: 'Origin city unverified.' },
		beers: [
			['Paragon Cold IPA Hop Welder', 'IPA - Cold', 6.0, { conf: 'low' }],
			['Paragon Smash IPA Idaho', 'IPA - SMaSH', 6.0, { conf: 'low', notes: 'Single-hop Idaho 7.' }]
		]
	},
	greekMisc: {
		_: { brewery: null, country: 'Greece', city: null, conf: 'low', src: 'name+knowledge', notes: 'Greek craft; origin city unverified.' },
		beers: [
			['Odyssey Red Beer', 'Red Ale', 5.5, { brewery: 'Odyssey', conf: 'low' }],
			['Freddo Espresso Stout', 'Stout - Espresso', 5.4, { brewery: 'Freddo', conf: 'medium', notes: 'Listed at 5.4%.' }],
			['Molotov Dry H.I.P.A.', 'India Pale Ale - Dry', 7.0, { brewery: 'Molotov', conf: 'medium', notes: 'Listed at 7%.' }],
			['Miss Ruby Red Ale', 'Red Ale', 5.5, { brewery: 'Miss Ruby', conf: 'low', notes: 'Listed at 5.5%.' }],
			['Malt N Marvel Double IPA (Blue Monkey collab)', 'IPA - Double', 8.0, { brewery: 'Malt N Marvel', conf: 'low', notes: 'Collab with Blue Monkey.' }],
			['Ora Weiss', 'Weissbier', 5.0, { brewery: 'Ora', conf: 'low' }],
			['Alea Pale Ale', 'Pale Ale', 5.0, { brewery: 'Alea', conf: 'low', notes: 'Listed as 20 TEM 0.5L.' }],
			['Loches Chestnut', 'Chestnut Ale', 6.0, { brewery: 'Loches', color: 'amber-ale', flavor: ['chestnut', 'caramel', 'nutty', 'malty'], conf: 'low' }],
			['Mr B. Benzina (Gluten Free)', 'Lager - Gluten Free', 5.0, { brewery: 'Mr B.', gf: true, conf: 'low' }],
			['Lager 7 Koytaki', 'Lager', 5.0, { brewery: 'Lager 7', conf: 'low' }],
			['Crocodilos WCIPA', 'IPA - West Coast', 6.5, { brewery: 'Crocodilos', conf: 'low' }],
			['Ghosting Pilsner', 'Pilsner', 5.0, { brewery: 'Crocodilos', conf: 'low' }],
			['Toul\'s Melonise', 'Sour - Melon', 5.0, { brewery: 'Toul\'s', color: 'blonde-ale', flavor: ['melon', 'tart', 'fruity', 'refreshing'], conf: 'low' }],
			['Ierne Oatmeal Stout', 'Stout - Oatmeal', 5.5, { brewery: 'Ierne', conf: 'low', notes: 'Origin unverified.' }],
			['Cannabian (Bio)', 'Hemp Ale', 5.0, { brewery: 'Cannabian', color: 'blonde-ale', flavor: ['hemp', 'herbal', 'grassy', 'bittersweet'], conf: 'low', notes: 'Origin unverified.' }]
		]
	},
	greekNomadUncertain: {
		_: { brewery: null, country: 'Greece', city: null, conf: 'low', src: 'name+knowledge', notes: 'Origin unverified; likely Greek nomad/collab.' },
		beers: [
			['Meraki American IPA', 'IPA - American', 6.0, { brewery: 'Meraki', conf: 'low' }],
			['Saudade DDH New England IPA', 'IPA - New England', 6.5, { brewery: 'Saudade', conf: 'low' }],
			['Tarab Hazy IPA', 'IPA - Hazy', 6.0, { brewery: 'Tarab', conf: 'low' }],
			['Wabisabi Pacific IPA', 'IPA - Pacific', 5.5, { brewery: 'Wabisabi', conf: 'low' }]
		]
	},
	blakstoc: {
		_: { brewery: 'Blakstoc', country: 'Greece', city: 'Athens', conf: 'low', src: 'name+knowledge', notes: 'Cider maker; origin approximate.' },
		beers: [
			['Blakstoc Standard Hard Cider', 'Cider', 5.0, { color: null, conf: 'low' }],
			['Blakstoc Wild Tree (Hoppy Cider)', 'Cider - Hopped', 5.0, { color: null, flavor: ['apple', 'hoppy', 'dry', 'crisp'], conf: 'low' }],
			['Blakstoc Ginger For My Honey Cider', 'Cider - Ginger & Honey', 5.0, { color: null, flavor: ['apple', 'ginger', 'honey', 'sweet'], conf: 'low' }]
		]
	},
	blackout: {
		_: { brewery: 'Blackout Brewing', country: 'Greece', city: null, conf: 'low', src: 'name+knowledge',
			notes: 'Barrel-aged specialist; origin unverified.' },
		beers: [
			['Blackout Anti-Cake', 'Stout - Imperial (BA)', 12.0, { conf: 'low' }],
			['Blackout Insania', 'Stout - Imperial (BA)', 12.0, { conf: 'low' }],
			['Blackout Life is a Perception', 'Stout - Imperial (BA)', 12.0, { conf: 'low' }],
			['Blackout World is Decay', 'Stout - Imperial (BA)', 12.0, { conf: 'low' }],
			['Blackout The Brutality of Plastic Existence', 'Stout - Imperial (BA)', 12.0, { conf: 'low' }],
			['Blackout Divination', 'Barleywine (BA)', 12.0, { conf: 'low' }],
			['Blackout Megalovanilla', 'Strong Ale (BA)', 11.0, { color: 'brown-ale', conf: 'low' }]
		]
	},
	// ============================ UK / IRELAND ============================
	brewdog: {
		_: { brewery: 'BrewDog', country: 'Scotland (UK)', city: 'Ellon', conf: 'high',
			src: 'https://www.brewdog.com/', vegan: true },
		beers: [
			['BrewDog Punk IPA', 'IPA - American', 5.4, { flavor: ['tropical', 'grapefruit', 'pine', 'bitter'], conf: 'high' }],
			['BrewDog Elvis Juice', 'IPA - Grapefruit', 6.5, { flavor: ['grapefruit', 'citrus', 'caramel', 'bitter'], conf: 'high' }],
			['BrewDog Hazy Jane', 'IPA - New England / Hazy', 5.0, { conf: 'high' }],
			['BrewDog Hazy Jane Guava', 'IPA - New England / Fruited', 5.0, { flavor: ['guava', 'tropical', 'juicy', 'soft'], conf: 'high' }],
			['BrewDog Double Hazy Jane', 'IPA - Double / Hazy', 8.2, { conf: 'medium' }],
			['BrewDog Jack Hammer', 'IPA - West Coast', 7.2, { conf: 'high' }],
			['BrewDog Counter Strike', 'IPA', 6.0, { conf: 'low', notes: 'ABV estimated.' }],
			['BrewDog Cold Beer (Gluten Free)', 'Lager - Gluten Free', 4.5, { gf: true, color: 'pale-lager', conf: 'high' }],
			['BrewDog Lost Lager', 'Lager - Pilsner', 4.6, { conf: 'high' }],
			['BrewDog Black Heart', 'Stout', 4.1, { conf: 'high', notes: 'Stout brewed with cocoa.' }],
			['BrewDog Hoppy Christmas', 'IPA - Winter', 7.2, { conf: 'medium' }],
			['BrewDog Two Scoops (Mackies collab)', 'IPA - Fruited', 5.0, { flavor: ['raspberry', 'vanilla', 'sweet', 'juicy'], conf: 'low', notes: 'Mackies ice-cream collab.' }]
		]
	},
	oharas: {
		_: { brewery: 'Carlow Brewing (O\'Hara\'s)', country: 'Ireland', city: 'Bagenalstown', conf: 'high',
			src: 'https://www.carlowbrewing.com/' },
		beers: [
			['O\'Hara\'s Nitro Irish Stout', 'Stout - Irish (Nitro)', 4.3, { conf: 'high' }],
			['O\'Hara\'s Irish Red Nitro', 'Red Ale - Irish (Nitro)', 4.3, { conf: 'high' }],
			['O\'Hara\'s Pale Ale', 'Pale Ale', 5.2, { conf: 'medium' }]
		]
	},
	fullers: {
		_: { brewery: 'Fuller\'s', country: 'England (UK)', city: 'London', conf: 'high', src: 'https://www.fullers.co.uk/' },
		beers: [
			['Fuller\'s London Pride', 'Bitter / Pale Ale', 4.7, { color: 'amber-ale', flavor: ['caramel', 'marmalade', 'toasted-malt', 'balanced'], conf: 'high' }],
			['Fuller\'s Black Cab Stout', 'Stout', 4.5, { conf: 'high' }],
			['Fuller\'s Organic Honey Dew', 'Golden Ale - Organic Honey', 5.0, { color: 'blonde-ale', flavor: ['honey', 'floral', 'crisp', 'light'], conf: 'high' }]
		]
	},
	stpeters: {
		_: { brewery: 'St Peter\'s Brewery', country: 'England (UK)', city: 'Bungay, Suffolk', conf: 'high', src: 'https://stpetersbrewery.co.uk/' },
		beers: [
			['St Peter\'s Cream Stout', 'Stout - Cream', 6.5, { conf: 'high' }],
			['St Peter\'s India Pale Ale', 'IPA - English', 5.5, { conf: 'high' }],
			['St Peter\'s Ruby Red Ale', 'Red Ale', 4.3, { conf: 'high' }],
			['St Peter\'s The Saints Whisky Beer', 'Whisky Beer', 4.8, { color: 'brown-ale', flavor: ['whisky', 'malt', 'oak', 'warming'], conf: 'medium' }]
		]
	},
	wychwood: {
		_: { brewery: 'Wychwood Brewery', country: 'England (UK)', city: 'Witney, Oxfordshire', conf: 'high', src: 'https://www.wychwood.co.uk/' },
		beers: [
			['Wychwood Hobgoblin Ruby', 'Ruby Ale', 5.2, { color: 'red-ale', flavor: ['caramel', 'toffee', 'dark-fruit', 'malty'], conf: 'high' }],
			['Wychwood Hobgoblin Gold', 'Golden Ale', 4.5, { color: 'blonde-ale', conf: 'high' }],
			['Wychwood Hobgoblin IPA', 'IPA - English', 5.3, { conf: 'high' }],
			['Wychwood King Goblin', 'Strong Ale', 6.6, { color: 'red-ale', flavor: ['caramel', 'dark-fruit', 'malty', 'warming'], conf: 'high' }]
		]
	},
	ukMisc: {
		_: { brewery: null, country: 'England (UK)', city: null, conf: 'medium', src: 'name+knowledge' },
		beers: [
			['Blue Monkey Pale Ale', 'Pale Ale', 4.2, { brewery: 'Blue Monkey', city: 'Nottingham', conf: 'medium' }],
			['Northern Monk Dark & Wild', 'Stout / Dark Ale', 5.5, { brewery: 'Northern Monk', city: 'Leeds', color: 'stout', conf: 'low' }]
		]
	},
	innisgunn: {
		_: { brewery: 'Innis & Gunn', country: 'Scotland (UK)', city: 'Edinburgh', conf: 'high', src: 'https://www.innisandgunn.com/' },
		beers: [['Innis & Gunn Blood Red Sky (Rum)', 'Red Ale - Rum Barrel', 6.8, { color: 'red-ale', flavor: ['rum', 'caramel', 'dark-fruit', 'vanilla'], conf: 'medium' }]]
	},
	guinness: {
		_: { brewery: 'Guinness', country: 'Ireland', city: 'Dublin', conf: 'high', src: 'https://www.guinness.com/' },
		beers: [['Guinness Special Export 8%', 'Stout - Foreign Extra', 8.0, { conf: 'high', notes: 'Belgian-market Special Export.' }]]
	},
	emperors: {
		_: { brewery: 'Emperor\'s Brewery', country: 'England (UK)', city: 'Coalville, Leicestershire', conf: 'high',
			src: 'https://untappd.com/EmperorsBrewery', notes: 'Imperial stout / porter specialist.' },
		beers: [
			['Mindless Philosopher', 'Porter - Imperial', 12.0, { flavor: ['blueberry', 'chocolate', 'roasted', 'boozy'], conf: 'high' }],
			['Hokey Religion', 'Stout - Imperial Pastry', 11.0, { flavor: ['chocolate', 'coconut', 'vanilla', 'sweet'], conf: 'high' }],
			['Executor', 'Stout - Imperial', 11.0, { conf: 'medium' }],
			['Interceptor', 'Stout - Imperial', 11.0, { conf: 'low' }]
		]
	},
	imperialUnknown: {
		_: { brewery: null, country: null, city: null, conf: 'low', src: 'name+knowledge', notes: 'Brewery/origin unverified.' },
		beers: [
			['Imperial Stout Hook', 'Stout - Imperial', 10.0, { brewery: 'Hook', conf: 'low' }],
			['Imperial Stout Outset', 'Stout - Imperial', 10.0, { brewery: 'Outset', conf: 'low' }]
		]
	},
	// ============================ BELGIUM / NL ============================
	duvel: {
		_: { brewery: 'Duvel Moortgat', country: 'Belgium', city: 'Puurs-Sint-Amands', conf: 'high', src: 'https://www.duvel.com/', vegan: true },
		beers: [
			['Duvel Classic', 'Belgian Strong Golden Ale', 8.5, { flavor: ['fruity', 'pear', 'spicy', 'dry', 'bitter-finish'], conf: 'high' }],
			['Duvel 6.66', 'Belgian Blonde', 6.66, { conf: 'high', notes: 'Lower-strength Duvel.' }],
			['Duvel Citra', 'Belgian Strong Golden Ale - Dry-Hopped', 8.5, { flavor: ['citra-hop', 'grapefruit', 'fruity', 'dry'], conf: 'medium' }],
			['Duvel Cashmere', 'Belgian Strong Golden Ale - Dry-Hopped', 8.5, { flavor: ['stone-fruit', 'melon', 'fruity', 'dry'], conf: 'medium' }]
		]
	},
	chouffe: {
		_: { brewery: 'Brasserie d\'Achouffe (Duvel Moortgat)', country: 'Belgium', city: 'Achouffe', conf: 'high', src: 'https://chouffe.com/', vegan: true },
		beers: [
			['La Chouffe', 'Belgian Blonde / Strong Pale Ale', 8.0, { flavor: ['fruity', 'coriander', 'spicy', 'honey'], conf: 'high' }],
			['McChouffe', 'Belgian Strong Dark Ale', 8.0, { color: 'brown-ale', flavor: ['dark-fruit', 'caramel', 'spicy', 'malty'], conf: 'high' }],
			['Cherry Chouffe', 'Belgian Fruit Ale - Cherry', 8.0, { color: 'red-ale', flavor: ['cherry', 'fruity', 'sweet', 'spicy'], conf: 'high' }],
			['La Chouffe Houblon IPA', 'Belgian IPA (Tripel IPA)', 9.0, { color: 'blonde-ale', flavor: ['citrus', 'floral', 'fruity', 'bitter'], conf: 'high' }]
		]
	},
	westmalle: {
		_: { brewery: 'Brouwerij der Trappisten van Westmalle', country: 'Belgium', city: 'Westmalle', conf: 'high', src: 'https://www.trappistwestmalle.be/en', vegan: true },
		beers: [
			['Westmalle Tripel', 'Belgian Tripel (Trappist)', 9.5, { flavor: ['fruity', 'banana', 'spicy', 'bitter', 'dry-finish'], conf: 'high' }],
			['Westmalle Dubbel', 'Belgian Dubbel (Trappist)', 7.0, { color: 'brown-ale', flavor: ['dark-fruit', 'caramel', 'spicy', 'malty'], conf: 'high' }]
		]
	},
	orval: {
		_: { brewery: 'Brasserie d\'Orval (Trappist)', country: 'Belgium', city: 'Villers-devant-Orval', conf: 'high', src: 'https://www.orval.be/en', vegan: true },
		beers: [['Orval', 'Belgian Pale Ale (Trappist, Brett)', 6.2, { color: 'amber-ale', flavor: ['dry', 'hoppy', 'earthy', 'funky-brett', 'bitter'], conf: 'high' }]]
	},
	latrappe: {
		_: { brewery: 'Bierbrouwerij De Koningshoeven (Trappist)', country: 'Netherlands', city: 'Berkel-Enschot', conf: 'high', src: 'https://www.latrappetrappist.com/en' },
		beers: [
			['La Trappe Quadrupel', 'Quadrupel (Trappist)', 10.0, { color: 'brown-ale', conf: 'high' }],
			['La Trappe Dubbel', 'Dubbel (Trappist)', 7.0, { color: 'brown-ale', conf: 'high' }],
			['La Trappe Tripel', 'Tripel (Trappist)', 8.0, { color: 'blonde-ale', conf: 'high' }],
			['La Trappe Blond', 'Belgian Blonde (Trappist)', 6.5, { color: 'blonde-ale', conf: 'high' }],
			['La Trappe Isid\'or', 'Belgian Amber (Trappist)', 7.5, { color: 'amber-ale', conf: 'high' }],
			['La Trappe Witte', 'Witbier (Trappist)', 5.5, { color: 'blonde-ale', conf: 'high' }]
		]
	},
	karmeliet: {
		_: { brewery: 'Brouwerij Bosteels (AB InBev)', country: 'Belgium', city: 'Buggenhout', conf: 'high', src: 'https://www.bethedog.com/' },
		beers: [['Tripel Karmeliet', 'Belgian Tripel', 8.4, { color: 'blonde-ale', flavor: ['banana', 'vanilla', 'citrus', 'spicy', 'creamy'], conf: 'high' }]]
	},
	lindemans: {
		_: { brewery: 'Brouwerij Lindemans', country: 'Belgium', city: 'Vlezenbeek', conf: 'high', src: 'https://www.lindemans.be/en' },
		beers: [
			['Lindemans Kriek', 'Lambic - Kriek (Cherry)', 3.5, { color: 'red-ale', flavor: ['cherry', 'sweet', 'tart', 'almond'], conf: 'high' }],
			['Lindemans Framboise', 'Lambic - Raspberry', 2.5, { color: 'red-ale', flavor: ['raspberry', 'sweet', 'tart', 'fruity'], conf: 'high' }],
			['Lindemans Cassis', 'Lambic - Blackcurrant', 3.5, { color: 'red-ale', flavor: ['blackcurrant', 'sweet', 'tart', 'fruity'], conf: 'high' }],
			['Lindemans Peacheresse', 'Lambic - Peach', 2.5, { color: 'blonde-ale', flavor: ['peach', 'sweet', 'tart', 'fruity'], conf: 'high' }],
			['Lindemans Strawberry', 'Lambic - Strawberry', 2.5, { color: 'red-ale', flavor: ['strawberry', 'sweet', 'tart', 'fruity'], conf: 'high' }],
			['Lindemans Apple', 'Lambic - Apple', 3.5, { color: 'blonde-ale', flavor: ['apple', 'sweet', 'tart', 'crisp'], conf: 'high' }]
		]
	},
	goudencarolus: {
		_: { brewery: 'Brouwerij Het Anker (Gouden Carolus)', country: 'Belgium', city: 'Mechelen', conf: 'high', src: 'https://hetanker.be/en' },
		beers: [
			['Gouden Carolus Classic', 'Belgian Strong Dark Ale', 8.5, { color: 'brown-ale', flavor: ['dark-fruit', 'caramel', 'spicy', 'warming'], conf: 'high' }],
			['Gouden Carolus Tripel', 'Belgian Tripel', 9.0, { color: 'blonde-ale', conf: 'high' }],
			['Gouden Carolus Ambrio', 'Belgian Amber', 8.0, { color: 'amber-ale', conf: 'high' }]
		]
	},
	stbernardus: {
		_: { brewery: 'Brouwerij St. Bernardus', country: 'Belgium', city: 'Watou', conf: 'high', src: 'https://www.sintbernardus.be/en' },
		beers: [['St. Bernardus Abt 12', 'Quadrupel', 10.0, { color: 'brown-ale', flavor: ['dark-fruit', 'caramel', 'spicy', 'malty'], conf: 'high' }]]
	},
	kasteel: {
		_: { brewery: 'Brouwerij Van Honsebrouck (Kasteel)', country: 'Belgium', city: 'Izegem', conf: 'high', src: 'https://www.vanhonsebrouck.be/en' },
		beers: [['Kasteel Rouge', 'Belgian Dark Ale - Cherry', 8.0, { color: 'red-ale', flavor: ['cherry', 'sweet', 'chocolate', 'fruity'], conf: 'high' }]]
	},
	lacorne: {
		_: { brewery: 'Brasserie d\'Ebly (La Corne)', country: 'Belgium', city: 'Ebly', conf: 'medium', src: 'name+knowledge' },
		beers: [['La Corne Tripel', 'Belgian Tripel', 10.0, { color: 'blonde-ale', conf: 'medium' }]]
	},
	liefmans: {
		_: { brewery: 'Brouwerij Liefmans (Duvel Moortgat)', country: 'Belgium', city: 'Oudenaarde', conf: 'high', src: 'https://www.liefmans.com/en' },
		beers: [['Liefmans Fruitesse (On the Rocks)', 'Fruit Beer', 3.8, { color: 'red-ale', flavor: ['cherry', 'strawberry', 'raspberry', 'sweet', 'tart'], conf: 'high' }]]
	},
	chimay: {
		_: { brewery: 'Bières de Chimay (Trappist)', country: 'Belgium', city: 'Baileux (Chimay)', conf: 'high', src: 'https://chimay.com/en/' },
		beers: [
			['Chimay Blue', 'Belgian Strong Dark Ale (Trappist)', 9.0, { color: 'brown-ale', flavor: ['dark-fruit', 'caramel', 'spicy', 'warming'], conf: 'high' }],
			['Chimay Red', 'Dubbel (Trappist)', 7.0, { color: 'brown-ale', conf: 'high' }],
			['Chimay White Tripel', 'Tripel (Trappist)', 8.0, { color: 'blonde-ale', conf: 'high' }]
		]
	},
	rochefort: {
		_: { brewery: 'Brasserie de Rochefort (Trappist)', country: 'Belgium', city: 'Rochefort', conf: 'high', src: 'https://www.trappistes-rochefort.com/en' },
		beers: [
			['Rochefort 6', 'Dubbel (Trappist)', 7.5, { color: 'brown-ale', conf: 'high' }],
			['Rochefort 8', 'Belgian Strong Dark Ale (Trappist)', 9.2, { color: 'brown-ale', conf: 'high' }],
			['Rochefort 10', 'Quadrupel (Trappist)', 11.3, { color: 'brown-ale', flavor: ['dark-fruit', 'caramel', 'port', 'warming'], conf: 'high' }]
		]
	},
	corsendonk: {
		_: { brewery: 'Corsendonk', country: 'Belgium', city: 'Oud-Turnhout', conf: 'medium', src: 'name+knowledge' },
		beers: [
			['Corsendonk Agnus (Tripel)', 'Belgian Tripel', 7.5, { color: 'blonde-ale', conf: 'medium' }],
			['Corsendonk Blanche', 'Witbier', 4.8, { color: 'blonde-ale', conf: 'medium' }],
			['Corsendonk Gold Tripel', 'Belgian Tripel', 8.5, { color: 'blonde-ale', conf: 'medium' }]
		]
	},
	delirium: {
		_: { brewery: 'Brouwerij Huyghe (Delirium)', country: 'Belgium', city: 'Melle', conf: 'high', src: 'https://www.delirium.be/en' },
		beers: [
			['Delirium Tremens', 'Belgian Strong Golden Ale', 8.5, { color: 'blonde-ale', flavor: ['fruity', 'spicy', 'honey', 'dry'], conf: 'high' }],
			['Delirium Nocturnum', 'Belgian Strong Dark Ale', 8.5, { color: 'brown-ale', flavor: ['dark-fruit', 'caramel', 'spicy', 'warming'], conf: 'high' }],
			['Delirium Red', 'Belgian Fruit Ale - Cherry', 8.0, { color: 'red-ale', flavor: ['cherry', 'sweet', 'fruity', 'spicy'], conf: 'high' }]
		]
	},
	mongozo: {
		_: { brewery: 'Mongozo (Huyghe)', country: 'Belgium', city: 'Melle', conf: 'high', src: 'name+knowledge' },
		beers: [['Mongozo Premium Pilsener (Gluten Free)', 'Pilsner - Gluten Free', 5.0, { gf: true, color: 'pale-lager', conf: 'high' }]]
	},
	// ============================ CZECH ============================
	urquell: {
		_: { brewery: 'Plzeňský Prazdroj', country: 'Czech Republic', city: 'Plzeň (Pilsen)', conf: 'high', src: 'https://www.pilsnerurquell.com/', vegan: true },
		beers: [['Pilsner Urquell', 'Pilsner - Czech', 4.4, { flavor: ['bready-malt', 'saaz-hop', 'spicy', 'crisp', 'bitter-finish'], conf: 'high' }]]
	},
	bernard: {
		_: { brewery: 'Rodinný pivovar Bernard', country: 'Czech Republic', city: 'Humpolec', conf: 'high', src: 'https://www.bernard.cz/en/' },
		beers: [
			['Bernard Dark Lager', 'Dark Lager', 5.1, { color: 'brown-ale', conf: 'high' }],
			['Bernard Celebration Lager', 'Pale Lager', 5.0, { color: 'pale-lager', conf: 'medium' }]
		]
	},
	kozel: {
		_: { brewery: 'Velkopopovický Kozel', country: 'Czech Republic', city: 'Velké Popovice', conf: 'high', src: 'name+knowledge' },
		beers: [['Kozel Dark', 'Dark Lager', 3.8, { color: 'brown-ale', flavor: ['caramel', 'roasted-malt', 'sweet', 'smooth'], conf: 'high' }]]
	},
	primator: {
		_: { brewery: 'Pivovar Náchod (Primátor)', country: 'Czech Republic', city: 'Náchod', conf: 'high', src: 'https://www.primator.cz/en/' },
		beers: [
			['Primator Premium', 'Pale Lager', 5.0, { color: 'pale-lager', conf: 'high' }],
			['Primator Lezak (Pils)', 'Pilsner', 4.9, { color: 'pale-lager', conf: 'medium', notes: 'List "11%" refers to °Balling, not ABV.' }],
			['Primator English Pale Ale', 'Pale Ale - English', 5.0, { conf: 'high' }],
			['Primator IPA', 'IPA', 6.5, { conf: 'high' }],
			['Primator Stout', 'Stout', 4.6, { conf: 'high' }],
			['Primator Weizenbier', 'Hefeweizen', 5.0, { color: 'blonde-ale', conf: 'high' }],
			['Primator Dark Premium', 'Dark Lager', 4.8, { color: 'brown-ale', conf: 'high' }],
			['Primator Double Dark', 'Special Dark Lager', 24, { color: 'brown-ale', flavor: ['caramel', 'dark-fruit', 'boozy', 'sweet'], conf: 'medium', notes: 'List "24%" is likely °Balling; true ABV lower.' }],
			['Primator Exkluziv', 'Strong Lager', 7.5, { color: 'amber-ale', conf: 'medium', notes: 'List "16%" likely °Balling.' }],
			['Primator Imperial', 'Strong Lager', 10.5, { color: 'amber-ale', conf: 'medium', notes: 'List "21%" likely °Balling.' }],
			['Primator Mother In Law', 'Strong Lager', 8.0, { color: 'amber-ale', conf: 'low' }],
			['Primator Jarni (Green)', 'Spring Lager', 5.0, { color: 'pale-lager', conf: 'low' }],
			['Primator Citrus Yuzu (Alcohol Free)', 'Radler - Non-Alcoholic', 0.5, { color: 'pale-lager', flavor: ['yuzu', 'citrus', 'light', 'refreshing'], conf: 'medium' }]
		]
	},
	zichovec: {
		_: { brewery: 'Pivovar Zichovec', country: 'Czech Republic', city: 'Zichovec', conf: 'high', src: 'https://zichovec.com/' },
		beers: [
			['Zichovec Hotline', 'IPA - West Coast', 6.5, { conf: 'medium' }],
			['Zichovec Nectar of Happiness', 'IPA - Double / Hazy', 8.0, { conf: 'medium' }],
			['Zichovec Orange \'n Choco', 'Stout - Pastry', 8.0, { color: 'stout', flavor: ['orange', 'chocolate', 'sweet', 'roasted'], conf: 'medium' }],
			['Zichovec Sour Passion Fruit', 'Sour - Fruited', 4.0, { color: 'blonde-ale', flavor: ['passionfruit', 'tart', 'juicy', 'refreshing'], conf: 'medium' }],
			['Zichovec Sour Raspberry', 'Sour - Fruited', 4.0, { color: 'red-ale', flavor: ['raspberry', 'tart', 'juicy', 'refreshing'], conf: 'medium' }],
			['Zichovec Coco Noir', 'Stout - Pastry', 10.0, { color: 'stout', flavor: ['coconut', 'chocolate', 'sweet', 'boozy'], conf: 'low' }],
			['Zichovec Like A Cert', 'IPA', 6.0, { conf: 'low' }],
			['Zichovec 13 Years of Innovation', 'IPA - Double', 8.0, { conf: 'low' }],
			['Zichovec Zazvorka', 'Ginger Beer', 4.0, { color: 'blonde-ale', flavor: ['ginger', 'spicy', 'crisp', 'refreshing'], conf: 'low' }]
		]
	},
	// ============================ POLAND ============================
	pinta: {
		_: { brewery: 'Browar PINTA', country: 'Poland', city: 'Wieprz', conf: 'high', src: 'https://browarpinta.pl/' },
		beers: [
			['PINTA Discovery Finland', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['PINTA Discovery France', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['PINTA Hazy Discovery Miami', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['PINTA Hazy Discovery Sunnyside', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['PINTA Hazy Delivery', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['PINTA Hazy Morning', 'Pale Ale - Hazy', 5.0, { conf: 'low' }],
			['PINTA Modern Drinking', 'IPA - West Coast', 6.0, { conf: 'medium' }],
			['PINTA Right Step', 'IPA - West Coast', 6.0, { conf: 'low' }],
			['PINTA That\'s Clear', 'IPA - West Coast', 6.0, { conf: 'low' }],
			['PINTA IIPPAA', 'IPA - Double / West Coast', 8.0, { conf: 'medium' }],
			['PINTA Kwas MY (Limoncello Sour)', 'Sour - Fruited', 5.0, { color: 'blonde-ale', flavor: ['lemon', 'tart', 'sweet', 'refreshing'], conf: 'low' }],
			['PINTA Mini-Maxi IPA (Non-Alc.)', 'IPA - Non-Alcoholic', 0.5, { conf: 'medium' }],
			['PINTA Portermass Double Vanilla', 'Baltic Porter - Imperial', 10.0, { color: 'brown-ale', flavor: ['vanilla', 'chocolate', 'roasted', 'boozy'], conf: 'medium' }],
			['PINTA Risfactor Coconut & Coffee', 'Stout - Imperial', 10.0, { flavor: ['coconut', 'coffee', 'chocolate', 'boozy'], conf: 'medium' }],
			['PINTA Risfactor Vanilla & Cinnamon', 'Baltic Porter - Imperial', 10.0, { color: 'brown-ale', flavor: ['vanilla', 'cinnamon', 'roasted', 'boozy'], conf: 'medium' }],
			['PINTA Barrel Brewing Diffuse (Wild Ale)', 'Wild Ale (BA)', 7.0, { color: 'blonde-ale', flavor: ['funky', 'oak', 'tart', 'fruity'], conf: 'low' }]
		]
	},
	funkyfluid: {
		_: { brewery: 'Funky Fluid', country: 'Poland', city: 'Włocławek', conf: 'high', src: 'https://funkyfluid.com/' },
		beers: [
			['Funky Fluid Gelato: Crema', 'Pastry Sour', 6.0, { color: 'blonde-ale', conf: 'low' }],
			['Funky Fluid Gelato: Panna Cotta', 'Pastry Sour', 6.0, { color: 'blonde-ale', conf: 'low' }],
			['Funky Fluid Gelato: Blueberry Maple Muffin', 'Pastry Sour', 6.0, { color: 'red-ale', flavor: ['blueberry', 'maple', 'sweet', 'creamy'], conf: 'low' }],
			['Funky Fluid Gelato: Green', 'Pastry Sour', 6.0, { color: 'blonde-ale', conf: 'low' }],
			['Funky Fluid Gelato: Puncovy Rez', 'Pastry Sour', 6.0, { color: 'blonde-ale', conf: 'low' }],
			['Funky Fluid Gelato: Xtreme Berries & Cream', 'Pastry Sour', 7.0, { color: 'red-ale', flavor: ['berries', 'cream', 'sweet', 'tart'], conf: 'low' }],
			['Funky Fluid Gelato: Xtreme Matcha', 'Pastry Sour', 7.0, { color: 'blonde-ale', flavor: ['matcha', 'creamy', 'sweet', 'tart'], conf: 'low' }],
			['Funky Fluid Crazy Hazy IPA', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['Funky Fluid Classy', 'Stout - Imperial Pastry', 10.0, { conf: 'low' }],
			['Funky Fluid Cherry Sour', 'Sour - Cherry', 5.0, { color: 'red-ale', flavor: ['cherry', 'tart', 'juicy', 'sweet'], conf: 'low' }],
			['Funky Fluid Born In The USA', 'IPA', 6.0, { conf: 'low' }],
			['Funky Fluid Beijing NEIPA (Funky on Tour)', 'IPA - New England', 6.0, { conf: 'low' }],
			['Funky Fluid Selecao / final eight', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['Funky Fluid It\'s Coming Home', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['Funky Fluid Joga Bonito Brazil', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['Funky Fluid Tiki Taka Spain', 'IPA - Hazy', 6.0, { conf: 'low' }]
		]
	},
	alchemik: {
		_: { brewery: 'Browar Alchemik', country: 'Poland', city: 'Warsaw', conf: 'medium', src: 'name+knowledge' },
		beers: [
			['Alchemik Bean Different: Mocha Hazelnut (with Tetrapod)', 'Stout - Pastry', 8.0, { flavor: ['mocha', 'hazelnut', 'chocolate', 'sweet'], conf: 'low' }],
			['Alchemik Arabian Nights', 'Stout - Pastry', 8.0, { conf: 'low' }],
			['Alchemik Berry Naughty: Blueberry & Banana', 'Pastry Sour', 6.0, { color: 'red-ale', flavor: ['blueberry', 'banana', 'sweet', 'tart'], conf: 'low' }],
			['Alchemik Nobody\'s Parfait: Double Cherry Tonka', 'Pastry Sour', 6.0, { color: 'red-ale', flavor: ['cherry', 'tonka', 'sweet', 'tart'], conf: 'low' }],
			['Alchemik Nobody\'s Parfait: Pear & White Grape', 'Pastry Sour', 6.0, { color: 'blonde-ale', flavor: ['pear', 'grape', 'sweet', 'tart'], conf: 'low' }],
			['Alchemik Sorbet City: Mango, Pomegranate & Sumac', 'Pastry Sour', 6.0, { color: 'blonde-ale', flavor: ['mango', 'pomegranate', 'sumac', 'tart'], conf: 'low' }]
		]
	},
	moonlark: {
		_: { brewery: 'Moon Lark Brewing', country: 'Poland', city: 'Bielsko-Biała', conf: 'medium', src: 'name+knowledge' },
		beers: [
			['Moon Lark Chimney (Smoked Baltic Porter)', 'Baltic Porter - Smoked', 9.0, { color: 'brown-ale', flavor: ['smoky', 'roasted', 'chocolate', 'warming'], conf: 'medium' }],
			['Moon Lark Deepness (Baltic Porter)', 'Baltic Porter', 9.0, { color: 'brown-ale', conf: 'medium' }],
			['Moon Lark Goat (Rauch Doppelbock)', 'Doppelbock - Smoked', 8.0, { color: 'brown-ale', flavor: ['smoky', 'caramel', 'malty', 'warming'], conf: 'medium' }],
			['Moon Lark Icebreaker (Cold DIPA)', 'IPA - Double / Cold', 8.0, { conf: 'medium' }],
			['Moon Lark Prime (West Coast IPA)', 'IPA - West Coast', 6.5, { conf: 'medium' }],
			['Moon Lark Reef (Hazy IPA)', 'IPA - Hazy', 6.0, { conf: 'medium' }],
			['Moon Lark Slice (Hazy IPA)', 'IPA - Hazy', 6.0, { conf: 'medium' }],
			['Moon Lark ZigZag (Hazy DIPA)', 'IPA - Double / Hazy', 8.0, { conf: 'medium' }]
		]
	},
	stumostow: {
		_: { brewery: 'Browar Stu Mostów', country: 'Poland', city: 'Wrocław', conf: 'high', src: 'https://stumostow.pl/en/' },
		beers: [
			['Stu Mostow Explore Volcano (Pastry Imp. Stout)', 'Stout - Imperial Pastry', 10.0, { conf: 'medium' }],
			['Stu Mostow Pumpkin Spice Sour', 'Sour - Spiced', 5.0, { color: 'amber-ale', flavor: ['pumpkin', 'spice', 'tart', 'sweet'], conf: 'low' }],
			['Stu Mostow Strawberry Berliner Weisse', 'Berliner Weisse - Strawberry', 4.0, { color: 'red-ale', flavor: ['strawberry', 'tart', 'wheat', 'refreshing'], conf: 'medium' }],
			['Stu Mostow Tropical Gose', 'Gose - Tropical', 4.5, { color: 'blonde-ale', flavor: ['tropical', 'salty', 'tart', 'refreshing'], conf: 'medium' }],
			['Stu Mostow Wild Blackberry Mix Ferm Ale (#22)', 'Wild Ale - Mixed Ferm', 6.0, { color: 'red-ale', flavor: ['blackberry', 'funky', 'tart', 'oak'], conf: 'low' }],
			['Stu Mostow Wild Raspberry Mix Ferm Ale (#23)', 'Wild Ale - Mixed Ferm', 6.0, { color: 'red-ale', flavor: ['raspberry', 'funky', 'tart', 'oak'], conf: 'low' }],
			['Stu Mostow Wild Riesling Mix Ferm (#25)', 'Wild Ale - Mixed Ferm', 6.0, { color: 'blonde-ale', flavor: ['grape', 'funky', 'tart', 'oak'], conf: 'low' }],
			['Stu Mostow Wild Saison Blueberry (#28)', 'Saison - Wild', 6.0, { color: 'blonde-ale', flavor: ['blueberry', 'funky', 'tart', 'peppery'], conf: 'low' }],
			['Stu Mostow Wild Sour Saison Apricot & Palo Santo', 'Saison - Wild', 6.0, { color: 'blonde-ale', flavor: ['apricot', 'funky', 'tart', 'woody'], conf: 'low' }],
			['Stu Mostow Wild Blueberry, Raspberry, Blackberry', 'Wild Ale - Fruited', 6.0, { color: 'red-ale', flavor: ['mixed-berry', 'funky', 'tart', 'juicy'], conf: 'low' }],
			['Stu Mostow X Anniversary Imperial Baltic Porter', 'Baltic Porter - Imperial', 10.0, { color: 'brown-ale', conf: 'low' }]
		]
	},
	nepo: {
		_: { brewery: 'NEPO Brewery', country: 'Poland', city: null, conf: 'low', src: 'name+knowledge', notes: 'Origin approximate.' },
		beers: [
			['NEPO Big Deal', 'IPA - Double', 8.0, { conf: 'low' }],
			['NEPO Good Time', 'Pale Ale', 5.0, { conf: 'low' }],
			['NEPO Doppel Rauchbock', 'Doppelbock - Smoked', 8.0, { color: 'brown-ale', flavor: ['smoky', 'caramel', 'malty', 'warming'], conf: 'low' }],
			['NEPO Hop Water w/ Apple & Lemon', 'Hop Water - Non-Alcoholic', 0, { color: null, flavor: ['apple', 'lemon', 'hoppy', 'refreshing'], conf: 'medium', notes: 'Non-alcoholic hop water.' }],
			['NEPO Hop Water w/ Pine, Apple & Orange', 'Hop Water - Non-Alcoholic', 0, { color: null, flavor: ['pine', 'apple', 'orange', 'refreshing'], conf: 'medium', notes: 'Non-alcoholic hop water.' }]
		]
	},
	lubrow: {
		_: { brewery: 'Browar Lubrow', country: 'Poland', city: 'Borcz', conf: 'high', src: 'https://untappd.com/Lubrow' },
		beers: [['Lubrow Rysy 2499', 'IPA', 6.0, { conf: 'low' }]]
	},
	polandNomad: {
		_: { brewery: null, country: 'Poland', city: null, conf: 'low', src: 'name+knowledge', notes: 'Origin unverified; likely Polish craft/collab.' },
		beers: [
			['Szosa DDH Hazy DIPA', 'IPA - Double / Hazy', 8.0, { brewery: 'Szosa', conf: 'low' }],
			['Lovelas Forest Triple IPA', 'IPA - Triple', 10.0, { brewery: 'Lovelas', conf: 'low' }],
			['307km NEIPA', 'IPA - New England', 6.0, { brewery: '307km', conf: 'low' }]
		]
	},
	// ============================ BULGARIA ============================
	sofiaelectric: {
		_: { brewery: 'Sofia Electric Brewing', country: 'Bulgaria', city: 'Sofia', conf: 'high', src: 'https://untappd.com/SofiaElectricBrewing' },
		beers: [
			['Sofia Electric Amperage', 'IPA - New England', 6.0, { conf: 'medium' }],
			['Sofia Electric Overflow', 'IPA - New England', 6.0, { conf: 'medium' }],
			['Sofia Electric Broomstick', 'IPA - New England', 6.0, { conf: 'medium' }],
			['Sofia Electric Workhorse', 'IPA - New England', 6.0, { conf: 'medium' }],
			['Sofia Electric 30 Days Off', 'IPA - American', 6.0, { conf: 'medium' }],
			['Sofia Electric Day Glow (No Coast IPA)', 'IPA', 6.0, { conf: 'low' }],
			['Sofia Electric Gravity (DDH Pale Ale)', 'Pale Ale - DDH', 5.5, { conf: 'low' }],
			['Sofia Electric Tucker Box (XPA)', 'Pale Ale - Extra', 5.0, { conf: 'low' }],
			['Sofia Electric Token', 'Pilsner', 5.0, { color: 'pale-lager', conf: 'medium' }],
			['Sofia Electric July Morning', 'Lager', 4.5, { color: 'pale-lager', conf: 'medium' }],
			['Sofia Electric Brewers Tears (Wet-Hopped Märzen)', 'Märzen', 5.5, { color: 'amber-ale', conf: 'low' }],
			['Sofia Electric 6 Months Behind Schedule', 'Stout - Imperial', 11.0, { conf: 'medium' }],
			['Sofia Electric 14 Months Behind Schedule', 'Stout - Imperial', 12.0, { conf: 'medium' }],
			['Sofia Electric Fractal Noise', 'Stout - Imperial', 11.0, { conf: 'low' }],
			['Sofia Electric Overloaded Amplifier', 'Stout - Imperial', 11.0, { conf: 'low' }],
			['Sofia Electric 6 Months Behind Schedule 2026 (Imp. Baltic Porter)', 'Baltic Porter - Imperial', 10.0, { color: 'brown-ale', conf: 'low' }],
			['Sofia Electric Atavistic Beast', 'Barley Wine', 11.0, { conf: 'low' }],
			['Sofia Electric Copperhead (BA Strong Ale)', 'Strong Ale (BA)', 10.0, { color: 'brown-ale', conf: 'low' }],
			['Sofia Electric Fruit Fusion Factory (Tropical Sour)', 'Sour - Tropical', 5.0, { color: 'blonde-ale', flavor: ['tropical', 'tart', 'juicy', 'refreshing'], conf: 'low' }],
			['Sofia Electric Kisel Papaya (Fruited Sour)', 'Sour - Fruited', 5.0, { color: 'blonde-ale', flavor: ['papaya', 'tart', 'juicy', 'refreshing'], conf: 'low' }],
			['Sofia Electric Can\'t Spell Dua Lipa without Dual IPA', 'IPA - New England', 6.5, { conf: 'medium', notes: 'Also listed as SEB / Can\'t Spell Dua Lipa.' }]
		]
	},
	elysia: {
		_: { brewery: 'Elysia Brewing', country: 'Bulgaria', city: null, conf: 'low', src: 'name+knowledge', notes: 'Origin approximate.' },
		beers: [['Elysia West Coast Pilsner', 'Pilsner - West Coast', 5.0, { color: 'pale-lager', flavor: ['citrus', 'floral-hop', 'crisp', 'bitter'], conf: 'low' }]]
	},
	// ============================ HUNGARY ============================
	madscientist: {
		_: { brewery: 'Mad Scientist', country: 'Hungary', city: 'Budapest', conf: 'high', src: 'https://untappd.com/MadScientistBeer' },
		beers: [
			['Mad Scientist Candyman 2025 (Marshmallow Stout)', 'Stout - Pastry', 8.0, { flavor: ['marshmallow', 'chocolate', 'sweet', 'roasted'], conf: 'medium' }],
			['Mad Scientist Liquid Cocaine', 'Stout - Imperial', 11.0, { conf: 'low' }],
			['Mad Scientist New York Mocaccino Beer', 'Stout - Pastry', 8.0, { flavor: ['coffee', 'chocolate', 'creamy', 'sweet'], conf: 'low' }],
			['Mad Scientist & Pigs: Even Satan Fashioneth', 'IPA - Double', 8.0, { conf: 'low' }],
			['Mad Scientist Jam72', 'Sour - Fruited', 6.0, { color: 'red-ale', flavor: ['mixed-berry', 'tart', 'jammy', 'sweet'], conf: 'low' }],
			['Mad Scientist Lost Jam', 'Sour - Fruited', 6.0, { color: 'red-ale', flavor: ['mixed-berry', 'tart', 'jammy', 'sweet'], conf: 'low' }],
			['Mad Scientist Mortal Mango Bay', 'Sour - Fruited', 5.0, { color: 'blonde-ale', flavor: ['mango', 'tart', 'juicy', 'sweet'], conf: 'low' }],
			['Mad Scientist Mortal Kombat: Scorpion', 'Sour - Fruited', 5.0, { color: 'red-ale', flavor: ['fruity', 'tart', 'juicy', 'sweet'], conf: 'low' }],
			['Mad Scientist Mortal Kombat: Sub-Zero', 'Sour - Fruited', 5.0, { color: 'blonde-ale', flavor: ['fruity', 'tart', 'juicy', 'sweet'], conf: 'low' }],
			['Mad Scientist Vispipuuro', 'Sour - Fruited', 6.0, { color: 'red-ale', flavor: ['lingonberry', 'tart', 'juicy', 'sweet'], conf: 'low' }],
			['Mad Scientist Roasters Paradise: San Rafael', 'Stout - Coffee', 8.0, { flavor: ['coffee', 'chocolate', 'roasted', 'sweet'], conf: 'low' }],
			['Mad Scientist The All Knowing', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['Mad Scientist LOTR: Dwarven Forge', 'IPA - Hazy', 6.0, { conf: 'low', notes: 'Lord of the Rings series.' }],
			['Mad Scientist LOTR: Elven Berry', 'Sour - Fruited', 5.0, { color: 'red-ale', flavor: ['berry', 'tart', 'juicy', 'sweet'], conf: 'low' }],
			['Mad Scientist LOTR: Mordor', 'Stout - Imperial', 10.0, { conf: 'low' }],
			['Mad Scientist LOTR: Prancing Pony', 'Pale Ale', 5.0, { conf: 'low' }],
			['Mad Scientist LOTR: Rohan', 'IPA', 6.0, { conf: 'low' }],
			['Mad Scientist LOTR: White Tree', 'IPA - Hazy', 6.0, { conf: 'low' }]
		]
	},
	// ============================ LATVIA ============================
	arpus: {
		_: { brewery: 'Ārpus Brewing Co.', country: 'Latvia', city: 'near Riga (Ādaži)', conf: 'high', src: 'https://arpusbrewing.co/' },
		beers: [
			['Ārpus IPA', 'IPA', 6.0, { conf: 'low' }],
			['Ārpus Double IPA', 'IPA - Double / Hazy', 8.0, { conf: 'medium' }],
			['Ārpus Quadruple IPA', 'IPA - Quadruple', 12.0, { conf: 'medium' }],
			['Ārpus x Mortalis Collab Smoothie', 'Smoothie Sour', 6.0, { color: 'red-ale', flavor: ['fruity', 'creamy', 'tart', 'sweet'], conf: 'low' }]
		]
	},
	// ============================ SWEDEN ============================
	elmeleven: {
		_: { brewery: 'Elmeleven', country: 'Sweden', city: 'Arlöv', conf: 'high', src: 'https://untappd.com/Elmeleven/beer' },
		beers: [
			['Elmeleven Living Machines 2 PULP', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['Elmeleven Space Between Stars', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['Elmeleven The Frontier', 'IPA - Hazy', 6.0, { conf: 'low' }],
			['Elmeleven The Paradox', 'IPA - Hazy', 6.0, { conf: 'low' }]
		]
	},
	// ============================ GERMANY ============================
	weihenstephan: {
		_: { brewery: 'Bayerische Staatsbrauerei Weihenstephan', country: 'Germany', city: 'Freising', conf: 'high', src: 'https://www.weihenstephaner.de/en/', vegan: true },
		beers: [
			['Weihenstephaner Hefeweissbier', 'Hefeweizen', 5.4, { color: 'blonde-ale', flavor: ['banana', 'clove', 'wheat', 'soft'], conf: 'high' }],
			['Weihenstephaner Vitus', 'Weizenbock', 7.7, { color: 'blonde-ale', flavor: ['banana', 'clove', 'citrus', 'warming'], conf: 'high' }],
			['Weihenstephaner Korbinian', 'Doppelbock', 7.4, { color: 'brown-ale', flavor: ['caramel', 'dark-fruit', 'malty', 'warming'], conf: 'high' }],
			['Weihenstephaner Hefe Dunkel', 'Dunkelweizen', 5.3, { color: 'brown-ale', flavor: ['banana', 'clove', 'caramel', 'malty'], conf: 'high' }],
			['Weihenstephaner Original Helles', 'Helles', 5.1, { color: 'pale-lager', conf: 'high' }],
			['Weihenstephaner Alkoholfrei Weiss', 'Hefeweizen - Non-Alcoholic', 0.5, { color: 'blonde-ale', conf: 'high' }]
		]
	},
	ayinger: {
		_: { brewery: 'Brauerei Aying (Ayinger)', country: 'Germany', city: 'Aying', conf: 'high', src: 'https://ayinger-bier.de/en/' },
		beers: [['Ayinger Bräuweisse', 'Hefeweizen', 5.1, { color: 'blonde-ale', flavor: ['banana', 'clove', 'wheat', 'soft'], conf: 'high' }]]
	},
	maisels: {
		_: { brewery: 'Maisel\'s (Brauerei Gebr. Maisel)', country: 'Germany', city: 'Bayreuth', conf: 'high', src: 'https://www.maisel.com/en/' },
		beers: [['Maisel\'s Weisse Original', 'Hefeweizen', 5.2, { color: 'blonde-ale', flavor: ['banana', 'clove', 'wheat', 'soft'], conf: 'high' }]]
	},
	schneider: {
		_: { brewery: 'Schneider Weisse (G. Schneider & Sohn)', country: 'Germany', city: 'Kelheim', conf: 'high', src: 'https://schneider-weisse.de/en/' },
		beers: [
			['Schneider Aventinus Weizen-Eisbock (Tap 10)', 'Weizen-Eisbock', 12.0, { color: 'brown-ale', flavor: ['dark-fruit', 'plum', 'raisin', 'banana', 'warming'], conf: 'high' }],
			['Schneider Aventinus (Tap 6)', 'Weizen-Doppelbock', 8.2, { color: 'brown-ale', flavor: ['banana', 'dark-fruit', 'caramel', 'clove'], conf: 'high' }]
		]
	},
	suddendeath: {
		_: { brewery: 'Sudden Death Brewing Co.', country: 'Germany', city: 'Roßdorf', conf: 'medium', src: 'https://sudden-death.de/' },
		beers: [
			['Sudden Death Nailed Shut', 'IPA - Double', 8.0, { conf: 'medium' }],
			['Sudden Death Echoes of Collapse', 'IPA - Double', 8.0, { conf: 'low' }],
			['Sudden Death Can of Whoop-Ass (Fully Loaded)', 'IPA - Double', 8.5, { conf: 'low' }],
			['Sudden Death Let\'s Order A Pizza 2026', 'IPA - Triple', 10.0, { conf: 'low' }],
			['Sudden Death Death Luxury 2026', 'IPA', 6.5, { conf: 'low' }],
			['Sudden Death Rollermania', 'IPA', 6.5, { conf: 'low' }],
			['Sudden Death Through Moonlit Halls', 'IPA', 6.5, { conf: 'low' }],
			['Sudden Death Space Doom Vacuum (Fruit Sour)', 'Sour - Fruited', 5.0, { color: 'red-ale', flavor: ['fruity', 'tart', 'juicy', 'sweet'], conf: 'low' }]
		]
	},
	// ============================ AUSTRIA ============================
	samichlaus: {
		_: { brewery: 'Brauerei Schloss Eggenberg', country: 'Austria', city: 'Vorchdorf', conf: 'high', src: 'https://www.schloss-eggenberg.at/en/' },
		beers: [['Samichlaus Bier', 'Strong Lager / Doppelbock', 14.0, { color: 'amber-ale', flavor: ['caramel', 'toffee', 'dark-fruit', 'boozy', 'malty'], conf: 'high', notes: 'Brewed once a year, Dec 6th.' }]]
	},
	// ============================ ITALY ============================
	peroni: {
		_: { brewery: 'Birra Peroni', country: 'Italy', city: 'Rome', conf: 'high', src: 'https://www.peroni.com/' },
		beers: [['Peroni Red (Prodotta)', 'Pale Lager', 4.7, { color: 'pale-lager', conf: 'medium' }]]
	},
	// ============================ USA ============================
	sierranevada: {
		_: { brewery: 'Sierra Nevada Brewing Co.', country: 'USA', city: 'Chico, California', conf: 'high', src: 'https://sierranevada.com/', vegan: true },
		beers: [
			['Sierra Nevada Torpedo Extra IPA', 'IPA - American', 7.2, { flavor: ['citrus', 'pine', 'grapefruit', 'resinous'], conf: 'high' }],
			['Sierra Nevada Atomic Torpedo', 'IPA - Imperial', 9.0, { flavor: ['citrus', 'pine', 'tropical', 'resinous', 'bitter'], conf: 'medium' }]
		]
	},
	budweiser: {
		_: { brewery: 'Budweiser (AB InBev)', country: 'USA', city: null, conf: 'medium', src: 'name+knowledge' },
		beers: [['Budweiser Free', 'Lager - Non-Alcoholic', 0, { color: 'pale-lager', conf: 'high', notes: '0% alcohol-free lager.' }]]
	},
	// ============================ MEXICO ============================
	corona: {
		_: { brewery: 'Grupo Modelo (Corona)', country: 'Mexico', city: 'Mexico City', conf: 'high', src: 'name+knowledge' },
		beers: [['Corona', 'Pale Lager', 4.5, { color: 'pale-lager', flavor: ['light-malt', 'crisp', 'refreshing', 'clean'], conf: 'high' }]]
	},
	// ============================ SWEDEN (cider) ============================
	kopparberg: {
		_: { brewery: 'Kopparberg', country: 'Sweden', city: 'Kopparberg', conf: 'high', src: 'https://www.kopparbergcider.com/' },
		beers: [['Kopparberg Strawberry & Lime (0%)', 'Cider - Non-Alcoholic', 0, { color: null, flavor: ['strawberry', 'lime', 'sweet', 'refreshing'], conf: 'high' }]]
	},
	// ============================ CYPRUS ============================
	radicalway: {
		_: { brewery: 'Radical Way Brewing', country: 'Cyprus', city: 'Nicosia', conf: 'high', src: 'https://www.radicalwaybrewing.com/', notes: 'Nomadic; also brews in Greece.' },
		beers: [
			['Radical Way Axegrind', 'IPA - Double', 8.0, { conf: 'low' }],
			['Radical Way Extinction Algorithm', 'IPA - Double', 8.0, { conf: 'low' }],
			['Radical Way Shockwave', 'IPA', 6.5, { conf: 'low' }],
			['Radical Way Sunset Vice', 'IPA - Hazy', 6.0, { conf: 'low' }]
		]
	},
	// ============================ UNCATEGORISED / UNVERIFIED ============================
	// Source entries whose brewery/origin could not be confidently identified. Kept so the
	// full list is represented; all low confidence, country null unless a strong guess.
	misc: {
		_: { brewery: null, country: null, city: null, conf: 'low', src: 'name+knowledge', notes: 'Brewery/origin unverified.' },
		beers: [
			['Bevoq Seedated (collab Pöhjala)', 'Imperial Stout (BA)', 11.0, { brewery: 'Bevoq', color: 'stout', conf: 'low', notes: 'Collab with Põhjala (Estonia); Bevoq origin unverified.' }],
			['PBB Essence', 'Imperial Stout (BA)', 11.0, { brewery: 'PBB', color: 'stout', conf: 'low' }],
			['Hop Around the World: New Zealand (Hazy IPA)', 'IPA - Hazy', 6.0, { conf: 'low', notes: 'Travel/series beer; brewer unidentified.' }],
			['Smoothie Bowl Fruit Fondue (Pastry Sour)', 'Pastry Sour', 6.0, { color: 'red-ale', flavor: ['fruity', 'creamy', 'tart', 'sweet'], conf: 'low' }],
			['The Cocktail Collection: Salty Kiss (Fruited Gose)', 'Gose - Fruited', 5.0, { color: 'blonde-ale', flavor: ['salty', 'fruity', 'tart', 'refreshing'], conf: 'low' }],
			['Toucan Tropical IPA', 'IPA - Tropical', 6.0, { brewery: 'Toucan', conf: 'low' }],
			['Chaos Ultra Hazy DDH IPA', 'IPA - Hazy', 6.5, { brewery: 'Chaos', conf: 'low' }],
			['Ultrasphere Ultra Hazy TDH IPA', 'IPA - Hazy', 6.5, { brewery: 'Ultrasphere', conf: 'low' }],
			['Kopparberg Strawberry & Lime', 'Cider - Fruit', 4.0, { brewery: 'Kopparberg', country: 'Sweden', city: 'Kopparberg', color: null, flavor: ['strawberry', 'lime', 'sweet', 'refreshing'], conf: 'medium', notes: 'Alcoholic version (distinct from the 0% listed separately).' }]
		]
	}
};

// ---------------------------------------------------------------------------
const slug = (s) =>
	s
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

const out = [];
const seen = new Set();
for (const group of Object.values(DATA)) {
	const meta = group._;
	for (const [name, style, abv, opts = {}] of group.beers) {
		let id = slug(name);
		while (seen.has(id)) id += '-x';
		seen.add(id);
		const color = opts.color !== undefined ? opts.color : colorFor(style);
		if (color !== null && !COLORS.has(color)) throw new Error(`bad color for ${name}: ${color}`);
		out.push({
			id,
			name,
			brewery: opts.brewery || meta.brewery,
			style,
			abv: abv === undefined ? null : abv,
			ibu: opts.ibu ?? null,
			country: opts.country !== undefined ? opts.country : meta.country,
			city: opts.city !== undefined ? opts.city : meta.city,
			color,
			flavor: opts.flavor || flavorFor(style),
			gluten_free: opts.gf ?? false,
			vegan: opts.vegan ?? meta.vegan ?? null,
			packaging: opts.packaging || [],
			image: null,
			notes: [meta.notes, opts.notes].filter(Boolean).join(' ') || '',
			confidence: opts.conf || meta.conf,
			source: opts.src || meta.src
		});
	}
}

// Validate
const ids = new Set();
for (const b of out) {
	if (!b.id || !b.name || b.abv === undefined) throw new Error('missing keys: ' + b.name);
	if (ids.has(b.id)) throw new Error('dup id: ' + b.id);
	ids.add(b.id);
	if (!Array.isArray(b.flavor) || b.flavor.length < 3) throw new Error('flavor<3: ' + b.name);
}

const json = JSON.stringify(out, null, 2) + '\n';
writeFileSync(OUT, json);
writeFileSync(APP_OUT, json);
const byConf = out.reduce((a, b) => ((a[b.confidence] = (a[b.confidence] || 0) + 1), a), {});
const byCountry = out.reduce((a, b) => ((a[b.country] = (a[b.country] || 0) + 1), a), {});
console.log('wrote', out.length, 'beers to', OUT, 'and', APP_OUT);
console.log('confidence:', JSON.stringify(byConf));
console.log('countries:', JSON.stringify(byCountry));
