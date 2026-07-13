// Reference data condensed from the Brewers Association Beer Style Guidelines:
// https://www.brewersassociation.org/edu/brewers-association-beer-style-guidelines/
//
// Numeric ranges (SRM/color, OG, IBU, ABV) are the BA's published sensory/analytical
// parameters for each recognized style family; not every BA style is represented here,
// only the ones our catalog's styles map onto. Descriptions are short paraphrases, not
// verbatim BA text.
//
// Consumed by build-beers-enriched.mjs to attach a `style_guideline` reference to each
// beer record based on its `style` string (see STYLE_TO_BA below).

export const BA_STYLES = {
	'amber-red-ale': {
		name: 'American-Style Amber/Red Ale',
		category: 'Ale - North American',
		srm: '8-18',
		og: '1.048-1.058',
		ibu: '25-45',
		abv: '4.4-6.1%',
		description: 'Amber to reddish-brown; medium-high malt, caramel character.'
	},
	'smoke-beer': {
		name: 'Smoke Beer',
		category: 'Hybrid',
		srm: 'Variable',
		og: '1.035-1.080',
		ibu: '10-60',
		abv: '3.5-8.0%',
		description: 'Variable base style; smoke character balanced against malt/hops.'
	},
	'baltic-porter': {
		name: 'Baltic-Style Porter',
		category: 'Lager - European',
		srm: '20-30',
		og: '1.06-1.09',
		ibu: '20-40',
		abv: '6.5-9.5%',
		description: 'Very dark; rich malt sweetness, moderate-high alcohol, smooth lager fermentation.'
	},
	'american-barleywine': {
		name: 'American-Style Barley Wine Ale',
		category: 'Ale - North American',
		srm: '11-18',
		og: '1.09-1.12',
		ibu: '60-100',
		abv: '8.5-12.2%',
		description: 'Amber to deep red; high malt sweetness, high bitterness, warming alcohol.'
	},
	'belgian-speciale-belge': {
		name: 'Belgian-Style Speciale Belge',
		category: 'Ale - Belgian/French',
		srm: '8-15',
		og: '1.06-1.076',
		ibu: '20-35',
		abv: '5.5-8.0%',
		description: 'Amber to brown; fruity esters with spice character.'
	},
	'belgian-blonde': {
		name: 'Belgian-Style Blonde Ale',
		category: 'Ale - Belgian/French',
		srm: '4-8',
		og: '1.044-1.056',
		ibu: '20-30',
		abv: '4.8-5.5%',
		description: 'Pale golden; fruity esters, dry finish.'
	},
	'belgian-strong-blonde': {
		name: 'Belgian-Style Strong Blonde Ale',
		category: 'Ale - Belgian/French',
		srm: '4-8',
		og: '1.062-1.076',
		ibu: '20-35',
		abv: '6.5-8.0%',
		description: 'Pale golden; higher alcohol, fruity esters, dry finish.'
	},
	'belgian-fruit-beer': {
		name: 'Belgian-Style Fruit Beer',
		category: 'Ale - Belgian/French',
		srm: 'Variable',
		og: '1.03-1.12',
		ibu: '10-30',
		abv: '2.5-10.0%',
		description: 'Variable base; fruit character prominent, balanced against malt sweetness.'
	},
	'belgian-dubbel': {
		name: 'Belgian-Style Dubbel',
		category: 'Ale - Belgian/French',
		srm: '15-24',
		og: '1.062-1.076',
		ibu: '15-25',
		abv: '5.5-7.0%',
		description: 'Dark brown; fruity esters, malt sweetness, dried-fruit character.'
	},
	'american-belgo-ale': {
		name: 'American-Belgo-Style Ale',
		category: 'Ale - North American',
		srm: 'Varies',
		og: 'Varies',
		ibu: 'Varies',
		abv: 'Varies',
		description: 'Belgian yeast-driven esters and phenolics combined with American hop character.'
	},
	'belgian-strong-dark-ale': {
		name: 'Belgian-Style Strong Dark Ale',
		category: 'Ale - Belgian/French',
		srm: '12-20',
		og: '1.06-1.076',
		ibu: '20-35',
		abv: '6.5-8.0%',
		description: 'Dark brown; fruity esters, high alcohol, complex malt.'
	},
	'belgian-tripel': {
		name: 'Belgian-Style Tripel',
		category: 'Ale - Belgian/French',
		srm: '4.5-7',
		og: '1.075-1.09',
		ibu: '20-40',
		abv: '7.5-9.5%',
		description: 'Pale; fruity esters, dry finish, deceptively high alcohol.'
	},
	'berliner-weisse': {
		name: 'Berliner-Style Weisse',
		category: 'Ale - German',
		srm: '2-4',
		og: '1.028-1.044',
		ibu: '3-6',
		abv: '2.8-5.0%',
		description: 'Straw to pale; tart and highly attenuated, very light body.'
	},
	'special-bitter-best-bitter': {
		name: 'Special Bitter or Best Bitter',
		category: 'Ale - British',
		srm: '6-14',
		og: '1.038-1.045',
		ibu: '28-40',
		abv: '4.2-4.8%',
		description: 'Deep gold to copper; balanced malt with moderate bitterness.'
	},
	'golden-blonde-ale': {
		name: 'Golden or Blonde Ale',
		category: 'Ale - North American',
		srm: '3-7',
		og: '1.045-1.054',
		ibu: '15-25',
		abv: '4.1-5.1%',
		description: 'Straw to gold; low malt sweetness, crisp clean finish.'
	},
	'herb-spice-beer': {
		name: 'Herb and Spice Beer',
		category: 'Hybrid',
		srm: 'Variable',
		og: '1.030-1.110',
		ibu: '5-70',
		abv: '2.5-10.0%',
		description: 'Variable base; herb or spice character balanced against the underlying style.'
	},
	'english-brown-ale': {
		name: 'English-Style Brown Ale',
		category: 'Ale - British',
		srm: '12-45',
		og: '1.04-1.05',
		ibu: '12-25',
		abv: '4.2-6.0%',
		description: 'Copper to black; roasted malt, toasted/nutty aroma.'
	},
	'czech-dark-lager': {
		name: 'Czech-Style Dark Lager',
		category: 'Lager - European',
		srm: '14-28',
		og: '1.044-1.056',
		ibu: '15-30',
		abv: '4.1-5.1%',
		description: 'Dark brown; roasted malt, balanced sweetness.'
	},
	'german-doppelbock': {
		name: 'German-Style Doppelbock',
		category: 'Lager - German',
		srm: '15-30',
		og: '1.072-1.112',
		ibu: '16-26',
		abv: '7.0-15.0%',
		description: 'Dark brown to black; rich malty sweetness, very strong.'
	},
	'bamberg-bock-rauchbier': {
		name: 'Bamberg-Style Bock Rauchbier',
		category: 'Lager - German',
		srm: '12-25',
		og: '1.064-1.080',
		ibu: '20-30',
		abv: '6.0-8.0%',
		description: 'Dark brown; smoked malt character over a strong bock base.'
	},
	'south-german-dunkel-weizen': {
		name: 'South German-Style Dunkel Weizen',
		category: 'Ale - German',
		srm: '10-25',
		og: '1.048-1.056',
		ibu: '10-15',
		abv: '4.8-5.4%',
		description: 'Copper-brown to very dark; chocolate-like malt, banana/clove yeast character.'
	},
	'contemporary-gose': {
		name: 'Contemporary-Style Gose',
		category: 'Ale - German',
		srm: '3-9',
		og: '1.036-1.056',
		ibu: '5-30',
		abv: '4.4-5.4%',
		description: 'Straw to medium amber; lactic sourness with added spice or fruit.'
	},
	'south-german-hefeweizen': {
		name: 'South German-Style Hefeweizen',
		category: 'Ale - German',
		srm: '3-9',
		og: '1.047-1.056',
		ibu: '10-15',
		abv: '4.9-5.6%',
		description: 'Straw to amber; banana and clove phenolics, yeasty haze.'
	},
	'munich-helles': {
		name: 'Munich-Style Helles',
		category: 'Lager - German',
		srm: '3-5',
		og: '1.048-1.056',
		ibu: '16-22',
		abv: '4.8-5.4%',
		description: 'Pale golden; soft malt sweetness, crisp clean finish.'
	},
	'non-alcohol-malt-beverage': {
		name: 'Non-Alcohol Malt Beverage',
		category: 'Hybrid',
		srm: 'Variable',
		og: '1.020-1.050',
		ibu: '5-30',
		abv: 'Below 0.5%',
		description: 'Malt beverage brewed or processed to under 0.5% ABV.'
	},
	'american-ipa': {
		name: 'American-Style India Pale Ale',
		category: 'Ale - North American',
		srm: '4-12',
		og: '1.06-1.07',
		ibu: '50-70',
		abv: '6.3-7.5%',
		description: 'Pale to copper; high to very high hop character, medium-high bitterness.'
	},
	'west-coast-ipa': {
		name: 'West Coast-Style India Pale Ale',
		category: 'Ale - North American',
		srm: '2-6',
		og: '1.055-1.07',
		ibu: '50-75',
		abv: '6.3-7.5%',
		description: 'Straw to gold; high hop aroma, dry and crisp finish.'
	},
	'imperial-double-ipa': {
		name: 'American-Style Imperial or Double IPA',
		category: 'Ale - North American',
		srm: '2-7',
		og: '1.067-1.087',
		ibu: '65-100',
		abv: '7.6-10.6%',
		description: 'Straw to medium amber; intense hop character, very high bitterness.'
	},
	'hazy-imperial-double-ipa': {
		name: 'Juicy or Hazy Imperial or Double IPA',
		category: 'Ale - North American',
		srm: '2-7',
		og: '1.067-1.087',
		ibu: '30-80',
		abv: '7.6-10.6%',
		description: 'Straw to light amber; hazy, intense fruity/tropical hop character.'
	},
	'british-ipa': {
		name: 'British-Style India Pale Ale',
		category: 'Ale - British',
		srm: '6-14',
		og: '1.046-1.064',
		ibu: '35-63',
		abv: '4.5-7.1%',
		description: 'Gold to copper; high hop character, medium-high bitterness.'
	},
	'juicy-hazy-pale-ale': {
		name: 'Juicy or Hazy Pale Ale',
		category: 'Ale - North American',
		srm: '3-7',
		og: '1.044-1.05',
		ibu: '5-30',
		abv: '4.4-5.4%',
		description: 'Straw to light amber; hazy, fruity/tropical hops, soft bitterness.'
	},
	'gluten-free-beer': {
		name: 'Gluten-Free Beer',
		category: 'Hybrid',
		srm: 'Variable',
		og: '1.030-1.100',
		ibu: '5-80',
		abv: '2.5-12.0%',
		description: 'Non-traditional grain base brewed to approximate a target style.'
	},
	'juicy-hazy-ipa': {
		name: 'Juicy or Hazy India Pale Ale',
		category: 'Ale - North American',
		srm: '3-7',
		og: '1.06-1.07',
		ibu: '20-50',
		abv: '6.3-7.5%',
		description: 'Straw to light amber; hazy, fruity/tropical hops, soft bitterness.'
	},
	'imperial-red-ale': {
		name: 'Imperial Red Ale',
		category: 'Ale - North American',
		srm: '10-17',
		og: '1.08-1.1',
		ibu: '55-85',
		abv: '8.0-10.6%',
		description: 'Deep amber to dark copper; very high alcohol, very high bitterness.'
	},
	'session-ipa': {
		name: 'Session India Pale Ale',
		category: 'Ale - North American',
		srm: '3-12',
		og: '1.008-1.052',
		ibu: '20-55',
		abv: '0.5-5.0%',
		description: 'Straw to copper; medium-high hop character at lower alcohol.'
	},
	'american-imperial-stout': {
		name: 'American-Style Imperial Stout',
		category: 'Ale - North American',
		srm: '40+',
		og: '1.08-1.1',
		ibu: '50-80',
		abv: '7.0-12.0%',
		description: 'Black; rich malty sweetness, high bitterness, complex alcohol.'
	},
	'india-pale-lager': {
		name: 'American-Style India Pale Lager',
		category: 'Lager - North American',
		srm: '4-10',
		og: '1.056-1.07',
		ibu: '50-70',
		abv: '5.5-7.5%',
		description: 'Pale to amber; hoppy IPA character with lager crispness.'
	},
	'contemporary-american-lager': {
		name: 'Contemporary American-Style Lager',
		category: 'Lager - North American',
		srm: '2-4',
		og: '1.040-1.050',
		ibu: '8-18',
		abv: '4.2-5.3%',
		description: 'Pale; light malt character, crisp clean finish.'
	},
	'american-fruit-beer': {
		name: 'American-Style Fruit Beer',
		category: 'Ale - North American',
		srm: '5-50',
		og: '1.03-1.11',
		ibu: '5-70',
		abv: '2.5-12.0%',
		description: 'Variable base; fruit aroma prominent, balanced sweetness.'
	},
	'international-pilsener': {
		name: 'International-Style Pilsener',
		category: 'Lager - Other',
		srm: '2-6',
		og: '1.044-1.056',
		ibu: '25-40',
		abv: '4.4-5.4%',
		description: 'Pale golden; crisp, balanced malt/hop character.'
	},
	'belgian-fruit-lambic': {
		name: 'Belgian-Style Fruit Lambic',
		category: 'Hybrid',
		srm: 'Variable',
		og: '1.04-1.054',
		ibu: '9-23',
		abv: '4.0-5.5%',
		description: 'Spontaneously fermented base with fruit character.'
	},
	'german-marzen': {
		name: 'German-Style Maerzen',
		category: 'Lager - German',
		srm: '8-14',
		og: '1.050-1.062',
		ibu: '18-24',
		abv: '5.0-6.0%',
		description: 'Amber; malt sweetness, festive/toasty character.'
	},
	'american-pale-ale': {
		name: 'American-Style Pale Ale',
		category: 'Ale - North American',
		srm: '4-7',
		og: '1.044-1.05',
		ibu: '30-50',
		abv: '4.4-5.4%',
		description: 'Straw to light amber; high hop character, citrus/fruity notes.'
	},
	'classic-english-pale-ale': {
		name: 'Classic English-Style Pale Ale',
		category: 'Ale - British',
		srm: '5-12',
		og: '1.04-1.056',
		ibu: '20-40',
		abv: '4.4-5.3%',
		description: 'Gold to copper; balanced with fruity esters.'
	},
	'american-strong-pale-ale': {
		name: 'American-Style Strong Pale Ale',
		category: 'Ale - North American',
		srm: '3-8',
		og: '1.05-1.058',
		ibu: '40-50',
		abv: '5.6-6.4%',
		description: 'Pale to copper; high hop character, high bitterness.'
	},
	'american-fruited-sour-ale': {
		name: 'American-Style Fruited Sour Ale',
		category: 'Ale - North American',
		srm: 'Varies',
		og: 'Varies',
		ibu: 'Varies',
		abv: 'Varies',
		description: 'Natural acidity balanced with fruit character.'
	},
	'dessert-pastry-beer': {
		name: 'Dessert or Pastry Beer',
		category: 'Hybrid',
		srm: 'Variable',
		og: '1.050-1.120',
		ibu: '5-40',
		abv: '4.0-12.0%',
		description: 'Sweet, dessert-like character from pastry-style adjuncts.'
	},
	'czech-pale-lager': {
		name: 'Czech-Style Pale Lager',
		category: 'Lager - European',
		srm: '3-5',
		og: '1.044-1.056',
		ibu: '30-45',
		abv: '4.1-5.1%',
		description: 'Pale golden; hoppy, crisp, mineral-driven water character.'
	},
	'german-pilsener': {
		name: 'German-Style Pilsener',
		category: 'Lager - German',
		srm: '2-5',
		og: '1.044-1.056',
		ibu: '25-40',
		abv: '4.4-5.4%',
		description: 'Pale golden; noble hop character, crisp finish.'
	},
	'west-coast-pilsener': {
		name: 'West Coast-Style Pilsener',
		category: 'Lager - North American',
		srm: '2-6',
		og: '1.048-1.058',
		ibu: '30-45',
		abv: '4.4-5.4%',
		description: 'Pale golden; classic Pilsener hopped with American varieties.'
	},
	'brown-porter': {
		name: 'Brown Porter',
		category: 'Ale - British',
		srm: '20-35',
		og: '1.04-1.05',
		ibu: '20-30',
		abv: '4.4-6.0%',
		description: 'Dark brown; low-medium malt sweetness, caramel notes.'
	},
	'american-imperial-porter': {
		name: 'American-Style Imperial Porter',
		category: 'Ale - North American',
		srm: '40+',
		og: '1.08-1.1',
		ibu: '35-50',
		abv: '7.0-12.0%',
		description: 'Black; medium malt/cocoa sweetness, full body.'
	},
	'belgian-quadrupel': {
		name: 'Belgian-Style Quadrupel',
		category: 'Ale - Belgian/French',
		srm: '12-20',
		og: '1.08-1.12',
		ibu: '25-50',
		abv: '8.0-11.0%',
		description: 'Dark brown; very high alcohol, complex dark-fruit character.'
	},
	'irish-red-ale': {
		name: 'Irish-Style Red Ale',
		category: 'Ale - Irish',
		srm: '11-18',
		og: '1.04-1.048',
		ibu: '20-28',
		abv: '4.0-4.8%',
		description: 'Copper-red to reddish-brown; caramel sweetness, toasted malt.'
	},
	'specialty-saison': {
		name: 'Specialty Saison',
		category: 'Ale - Belgian/French',
		srm: '5-40',
		og: '1.044-1.08',
		ibu: '15-40',
		abv: '4.0-9.0%',
		description: 'Variable; fruity and spicy, sessionable to strong.'
	},
	'sweet-cream-stout': {
		name: 'Sweet Stout or Cream Stout',
		category: 'Ale - British',
		srm: '40+',
		og: '1.045-1.056',
		ibu: '15-25',
		abv: '3.2-6.3%',
		description: 'Black; chocolate/caramel dominant, balanced residual sweetness.'
	},
	'export-stout': {
		name: 'Export-Style Stout',
		category: 'Ale - Irish',
		srm: '40+',
		og: '1.052-1.072',
		ibu: '30-60',
		abv: '5.6-8.0%',
		description: 'Black; roasted coffee character with more malt sweetness than dry stout.'
	},
	'oatmeal-stout': {
		name: 'Oatmeal Stout',
		category: 'Ale - British',
		srm: '20+',
		og: '1.038-1.056',
		ibu: '20-40',
		abv: '3.8-6.1%',
		description: 'Dark brown to black; smooth roasted malt, silky mouthfeel from oats.'
	},
	'classic-irish-dry-stout': {
		name: 'Classic Irish-Style Dry Stout',
		category: 'Ale - Irish',
		srm: '40+',
		og: '1.038-1.048',
		ibu: '30-40',
		abv: '4.1-5.3%',
		description: 'Black; dry-roasted coffee/barley character.'
	},
	'american-stout': {
		name: 'American-Style Stout',
		category: 'Ale - North American',
		srm: '40+',
		og: '1.05-1.075',
		ibu: '35-60',
		abv: '5.7-8.0%',
		description: 'Black; coffee/roasted character, medium-high bitterness.'
	},
	'british-strong-ale': {
		name: 'Strong Ale',
		category: 'Ale - British',
		srm: '8-21',
		og: '1.06-1.125',
		ibu: '30-60',
		abv: '7.0-11.3%',
		description: 'Amber to dark brown; rich, sweet, complex fruity esters.'
	},
	'other-strong-ale-or-lager': {
		name: 'Other Strong Ale or Lager',
		category: 'Hybrid',
		srm: 'Variable',
		og: '1.060-1.120',
		ibu: '10-100',
		abv: '6.0-15.0%',
		description: 'Strong specialty beer outside the standard style families.'
	},
	'south-german-weizenbock': {
		name: 'South German-Style Weizenbock',
		category: 'Ale - German',
		srm: '4.5-30',
		og: '1.066-1.08',
		ibu: '15-35',
		abv: '7.0-9.5%',
		description: 'Gold to very dark; balanced clove/banana character, medium-full body.'
	},
	'wild-beer': {
		name: 'Wild Beer',
		category: 'Hybrid',
		srm: '3-40',
		og: '1.030-1.100',
		ibu: '5-80',
		abv: '3.0-10.0%',
		description: 'Wild fermentation character, complex and variable.'
	},
	'mixed-culture-brett-beer': {
		name: 'Mixed-Culture Brett Beer',
		category: 'Hybrid',
		srm: '3-40',
		og: '1.030-1.100',
		ibu: '5-80',
		abv: '3.0-10.0%',
		description: 'Mixed fermentation cultures producing complex funk/fruit character.'
	},
	'belgian-witbier': {
		name: 'Belgian-Style Witbier',
		category: 'Ale - Belgian/French',
		srm: '2-4',
		og: '1.044-1.052',
		ibu: '10-17',
		abv: '4.8-5.5%',
		description: 'Pale and cloudy; coriander/orange peel spicing.'
	},
	'specialty-honey-beer': {
		name: 'Specialty Honey Beer',
		category: 'Hybrid',
		srm: 'Variable',
		og: '1.030-1.120',
		ibu: '5-70',
		abv: '2.5-14.0%',
		description: 'Honey character balanced against the underlying base style.'
	},
	'european-dark-lager': {
		name: 'European-Style Dark Lager',
		category: 'Lager - German',
		srm: '14-30',
		og: '1.044-1.056',
		ibu: '17-30',
		abv: '4.0-5.5%',
		description: 'Dark brown to very dark; roasted malt character.'
	},
	'aged-beer': {
		name: 'Aged Beer',
		category: 'Hybrid',
		srm: 'Variable',
		og: '1.040-1.120',
		ibu: '10-100',
		abv: '4.0-15.0%',
		description: 'Any style matured to develop aging complexity (incl. barrel-aging).'
	}
};

// Maps each raw `style` string used in build-beers-enriched.mjs's DATA table onto a
// BA_STYLES key. `null` means the BA guidelines don't cover an equivalent style
// (ciders, radlers, and a few only-loosely-beer-adjacent regional specialties).
export const STYLE_TO_BA = {
	'Amber Ale': 'amber-red-ale',
	'Amber Ale - Smoked': 'smoke-beer',
	'Baltic Porter': 'baltic-porter',
	'Baltic Porter - Imperial': 'baltic-porter',
	'Baltic Porter - Smoked': 'baltic-porter',
	'Barley Wine': 'american-barleywine',
	'Barleywine (BA)': 'american-barleywine',
	'Belgian Amber': 'belgian-speciale-belge',
	'Belgian Amber (Trappist)': 'belgian-speciale-belge',
	'Belgian Blonde': 'belgian-blonde',
	'Belgian Blonde (Trappist)': 'belgian-blonde',
	'Belgian Blonde / Strong Pale Ale': 'belgian-strong-blonde',
	'Belgian Dark Ale - Cherry': 'belgian-fruit-beer',
	'Belgian Dubbel (Trappist)': 'belgian-dubbel',
	'Belgian Fruit Ale - Cherry': 'belgian-fruit-beer',
	'Belgian IPA (Tripel IPA)': 'american-belgo-ale',
	'Belgian Pale Ale (Trappist, Brett)': 'belgian-speciale-belge',
	'Belgian Strong Ale': 'belgian-strong-dark-ale',
	'Belgian Strong Dark Ale': 'belgian-strong-dark-ale',
	'Belgian Strong Dark Ale (Trappist)': 'belgian-strong-dark-ale',
	'Belgian Strong Golden Ale': 'belgian-strong-blonde',
	'Belgian Strong Golden Ale - Dry-Hopped': 'belgian-strong-blonde',
	'Belgian Tripel': 'belgian-tripel',
	'Belgian Tripel (Trappist)': 'belgian-tripel',
	'Berliner Weisse - Strawberry': 'berliner-weisse',
	'Bitter / Pale Ale': 'special-bitter-best-bitter',
	'Blonde Ale': 'golden-blonde-ale',
	'Chestnut Ale': 'herb-spice-beer',
	Cider: null,
	'Cider - Fruit': null,
	'Cider - Ginger & Honey': null,
	'Cider - Hopped': null,
	'Cider - Non-Alcoholic': null,
	'Dark Ale': 'english-brown-ale',
	'Dark Lager': 'czech-dark-lager',
	Doppelbock: 'german-doppelbock',
	'Doppelbock - Smoked': 'bamberg-bock-rauchbier',
	'Dubbel (Trappist)': 'belgian-dubbel',
	Dunkelweizen: 'south-german-dunkel-weizen',
	'Fruit Beer': 'belgian-fruit-beer',
	'Ginger Beer': 'herb-spice-beer',
	'Golden Ale': 'golden-blonde-ale',
	'Golden Ale - Honey': 'specialty-honey-beer',
	'Golden Ale - Organic Honey': 'specialty-honey-beer',
	'Gose - Fruited': 'contemporary-gose',
	'Gose - Tropical': 'contemporary-gose',
	Hefeweizen: 'south-german-hefeweizen',
	'Hefeweizen - Non-Alcoholic': 'south-german-hefeweizen',
	Helles: 'munich-helles',
	'Hemp Ale': 'herb-spice-beer',
	'Herbal Ale': 'herb-spice-beer',
	'Hop Water - Non-Alcoholic': 'non-alcohol-malt-beverage',
	IPA: 'american-ipa',
	'IPA - American': 'american-ipa',
	'IPA - Cold': 'west-coast-ipa',
	'IPA - Double': 'imperial-double-ipa',
	'IPA - Double / Cold': 'imperial-double-ipa',
	'IPA - Double / Hazy': 'hazy-imperial-double-ipa',
	'IPA - Double / West Coast': 'imperial-double-ipa',
	'IPA - English': 'british-ipa',
	'IPA - Fruited': 'juicy-hazy-pale-ale',
	'IPA - Gluten Free': 'gluten-free-beer',
	'IPA - Grapefruit': 'american-ipa',
	'IPA - Hazy': 'juicy-hazy-ipa',
	'IPA - Imperial': 'imperial-double-ipa',
	'IPA - Imperial Red': 'imperial-red-ale',
	'IPA - New England': 'juicy-hazy-ipa',
	'IPA - New England / Fruited': 'juicy-hazy-ipa',
	'IPA - New England / Hazy': 'juicy-hazy-ipa',
	'IPA - Non-Alcoholic': 'non-alcohol-malt-beverage',
	'IPA - Pacific': 'west-coast-ipa',
	'IPA - Quadruple': 'imperial-double-ipa',
	'IPA - SMaSH': 'american-ipa',
	'IPA - Session': 'session-ipa',
	'IPA - Triple': 'imperial-double-ipa',
	'IPA - Tropical': 'juicy-hazy-ipa',
	'IPA - West Coast': 'west-coast-ipa',
	'IPA - Winter': 'american-ipa',
	'Imperial Stout (BA)': 'american-imperial-stout',
	'India Pale Ale - Dry': 'american-ipa',
	'India Pale Lager': 'india-pale-lager',
	Lager: 'contemporary-american-lager',
	'Lager - Dark': 'european-dark-lager',
	'Lager - Fruited': 'american-fruit-beer',
	'Lager - Gluten Free': 'gluten-free-beer',
	'Lager - Non-Alcoholic': 'non-alcohol-malt-beverage',
	'Lager - Pilsner': 'international-pilsener',
	'Lambic - Apple': 'belgian-fruit-lambic',
	'Lambic - Blackcurrant': 'belgian-fruit-lambic',
	'Lambic - Kriek (Cherry)': 'belgian-fruit-lambic',
	'Lambic - Peach': 'belgian-fruit-lambic',
	'Lambic - Raspberry': 'belgian-fruit-lambic',
	'Lambic - Strawberry': 'belgian-fruit-lambic',
	Märzen: 'german-marzen',
	'Pale Ale': 'american-pale-ale',
	'Pale Ale - American': 'american-pale-ale',
	'Pale Ale - DDH': 'juicy-hazy-pale-ale',
	'Pale Ale - English': 'classic-english-pale-ale',
	'Pale Ale - Extra': 'american-strong-pale-ale',
	'Pale Ale - Hazy': 'juicy-hazy-pale-ale',
	'Pale Ale - Non-Alcoholic': 'non-alcohol-malt-beverage',
	'Pale Ale - Session': 'session-ipa',
	'Pale Lager': 'contemporary-american-lager',
	'Pastry Sour': 'american-fruited-sour-ale',
	'Pastry Stout': 'dessert-pastry-beer',
	Pilsner: 'international-pilsener',
	'Pilsner - Czech': 'czech-pale-lager',
	'Pilsner - German': 'german-pilsener',
	'Pilsner - Gluten Free': 'gluten-free-beer',
	'Pilsner - Honey': 'specialty-honey-beer',
	'Pilsner - West Coast': 'west-coast-pilsener',
	Porter: 'brown-porter',
	'Porter - Imperial': 'american-imperial-porter',
	Quadrupel: 'belgian-quadrupel',
	'Quadrupel (Trappist)': 'belgian-quadrupel',
	Radler: null,
	'Radler - Non-Alcoholic': null,
	'Red Ale': 'amber-red-ale',
	'Red Ale - Irish': 'irish-red-ale',
	'Red Ale - Irish (Nitro)': 'irish-red-ale',
	'Red Ale - Rum Barrel': 'amber-red-ale',
	'Ruby Ale': 'english-brown-ale',
	'Saison - Wild': 'specialty-saison',
	'Smoked Ale': 'smoke-beer',
	'Smoked Beer': 'smoke-beer',
	'Smoothie Sour': 'american-fruited-sour-ale',
	'Sour - Cherry': 'american-fruited-sour-ale',
	'Sour - Fruited': 'american-fruited-sour-ale',
	'Sour - Melon': 'american-fruited-sour-ale',
	'Sour - Spiced': 'american-fruited-sour-ale',
	'Sour - Tropical': 'american-fruited-sour-ale',
	'Special Dark Lager': 'european-dark-lager',
	'Spring Lager': 'contemporary-american-lager',
	Stout: 'sweet-cream-stout',
	'Stout - Coffee': 'american-stout',
	'Stout - Cream': 'sweet-cream-stout',
	'Stout - Espresso': 'american-stout',
	'Stout - Foreign Extra': 'export-stout',
	'Stout - Imperial': 'american-imperial-stout',
	'Stout - Imperial (BA)': 'american-imperial-stout',
	'Stout - Imperial Pastry': 'dessert-pastry-beer',
	'Stout - Irish (Nitro)': 'classic-irish-dry-stout',
	'Stout - Oatmeal': 'oatmeal-stout',
	'Stout - Pastry': 'dessert-pastry-beer',
	'Stout - Smoked': 'smoke-beer',
	'Stout - Tropical': 'export-stout',
	'Stout / Dark Ale': 'american-stout',
	'Strong Ale': 'british-strong-ale',
	'Strong Ale (BA)': 'other-strong-ale-or-lager',
	'Strong Lager': 'other-strong-ale-or-lager',
	'Strong Lager / Doppelbock': 'german-doppelbock',
	'Tripel (Trappist)': 'belgian-tripel',
	'Weiss IPA': 'american-ipa',
	Weissbier: 'south-german-hefeweizen',
	'Weizen-Doppelbock': 'south-german-weizenbock',
	'Weizen-Eisbock': 'south-german-weizenbock',
	Weizenbock: 'south-german-weizenbock',
	'Wheat Beer - Mastic': 'herb-spice-beer',
	'Whisky Beer': 'aged-beer',
	'Wild Ale (BA)': 'wild-beer',
	'Wild Ale - Fruited': 'wild-beer',
	'Wild Ale - Mixed Ferm': 'mixed-culture-brett-beer',
	Witbier: 'belgian-witbier',
	'Witbier (Trappist)': 'belgian-witbier',
	'Witbier / Weissbier': 'belgian-witbier'
};

export function baGuidelineFor(style) {
	const key = STYLE_TO_BA[style];
	if (!key) return null;
	const entry = BA_STYLES[key];
	if (!entry) return null;
	return { key, ...entry };
}
