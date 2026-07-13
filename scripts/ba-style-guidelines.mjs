// Reference data compiled from the Brewers Association Beer Style Guidelines
// (2026 edition): https://www.brewersassociation.org/edu/brewers-association-beer-style-guidelines/
//
// Field notes:
// - color/clarity/maltAroma/hopAroma/bitterness/fermentation/body/additionalNotes are the
//   BA's own descriptive sensory fields, transcribed (and lightly reflowed where the source
//   PDF's two-column layout scrambled line order) from the official style guideline text.
// - originalGravity/finalGravity/abw/abv/ibu/srm/ebc are the analytical ranges from the
//   bottom of each style's BA entry (Original Gravity, Apparent Extract/Final Gravity,
//   Alcohol by Weight/Volume, Hop Bitterness IBU, Color SRM/EBC).
// - srm/og/ibu/abv/description are kept for backwards compatibility with existing consumers
//   (e.g. build-beers-enriched.mjs / the embedded per-beer style_guideline); srm/ibu/abv are
//   refreshed to the precise BA figures above, og keeps the original condensed approximation.
//
// Not every BA style is represented here, only the ones our catalog's styles map onto.

export const BA_STYLES = {
	'amber-red-ale': {
		name: 'American-Style Amber/Red Ale',
		category: 'Ale - North American',
		color: 'Amber to reddish-brown',
		clarity: 'Chill haze is acceptable at low temperatures',
		maltAroma: 'Medium-high to high maltiness with low to medium caramel character',
		hopAroma: 'Low to medium-low, exhibiting a wide range of attributes',
		bitterness: 'Medium to medium-high',
		fermentation: 'Fruity esters, if present, are low.',
		body: 'Medium to medium-high',
		originalGravity: '1.048-1.058 (11.9-14.3 °Plato)',
		finalGravity: '1.010-1.018 (2.5-4.6 °Plato)',
		abw: '3.5%-4.8%',
		abv: '4.4%-6.1%',
		ibu: '25-45',
		srm: '8-18',
		ebc: '16-36',
		og: '1.048-1.058',
		description: 'Amber to reddish-brown; medium-high malt, caramel character.'
	},
	'smoke-beer': {
		name: 'Smoke Beer',
		category: 'Hybrid',
		color:
			'Any beer of any style incorporating smoke, and therefore may range from very light to black',
		clarity: 'Varies with underlying beer style',
		maltAroma: 'Varies with underlying beer style',
		hopAroma: 'Varies with underlying beer style',
		bitterness: 'Varies with underlying beer style',
		fermentation:
			'For Smoke Beers based on lager styles, any phenolic notes (if present) entrants should review all other Strong/Imperial should be derived from smoke; in such lagers yeast- categories (Strong Porter, Imperial Red, Belgian derived phenolics should not be present.',
		body: 'Varies with underlying beer style',
		additionalNotes:
			"Any style of beer can be smoked. The goal is to reach a balance between the style's character and the smoky properties. Any smoke beer that does not fit other smoke beer categories are appropriately categorized here. When using these guidelines as the basis for evaluating entries at competitions, brewers may be asked to provide supplemental information about entries in this category to allow for accurate evaluation of diverse entries. Such information might include the underlying beer style(s) being made to include the underlying beer style(s), or other information unique to the entry such as type of wood unique to the entry such as ingredients or processing smoke or processing which influence perceived sensory outcomes.",
		originalGravity: 'Varies with style',
		finalGravity: 'Varies with style',
		abv: 'Varies with style',
		ibu: 'Varies with style',
		srm: 'Bitterness (IBU) Varies with style • Color SRM (EBC) Varies with style',
		og: '1.035-1.080',
		description: 'Variable base style; smoke character balanced against malt/hops.'
	},
	'baltic-porter': {
		name: 'Baltic-Style Porter',
		category: 'Lager - European',
		color: 'Black',
		clarity: 'Opaque. When clarity is perceivable, chill haze should not be present.',
		maltAroma:
			'Malt sweetness is medium-low to medium-high. Distinctive malt aromas and flavors of caramelized sugars, dark sugars, and dried fruits are present. Roast malt attributes may be present at low levels, but any bitterness or astringency should be in harmony with other flavor aspects.',
		hopAroma: 'Very low. Floral hop aroma can complement aromatics.',
		bitterness: 'Low to medium-low',
		fermentation:
			'Due to its alcoholic strength, there may be very low to low levels of complex alcohol aromas and flavors, and higher levels of fruitiness suggestive of berries, grapes, or plums, but not banana. Fruity esters, DMS, and diacetyl should not be present.',
		body: 'Medium to full',
		additionalNotes:
			'Baltic Porter is brewed with lager should not be present. yeast and fermented and lagered cold producing a smooth beer. A low level of oxidation, if harmonious medium-high complex malt flavor and aroma with with other flavor components, is acceptable.',
		originalGravity:
			'1.072-1.092 (17.5-22 °Plato) Perceived Hop Aroma & Flavor: Low to medium with',
		finalGravity: '1.016- 1.022 (4.1-5.6 °Plato)',
		abw: 'Perceived bitterness: Medium-low to medium 6.0%-7.4%',
		abv: '7.6%-9.3%',
		ibu: '35-40',
		srm: '20+',
		ebc: '40+',
		og: '1.06-1.09',
		description: 'Very dark; rich malt sweetness, moderate-high alcohol, smooth lager fermentation.'
	},
	'american-barleywine': {
		name: 'American-Style Barley Wine Ale',
		category: 'Ale - North American',
		color: 'Amber to deep red/copper-garnet',
		clarity: 'Chill haze is acceptable at low temperatures',
		maltAroma:
			'Caramel or toffee malt aroma attributes are often present. High residual malty sweetness, often exhibiting caramel or toffee attributes, should be present.',
		hopAroma: 'Medium to very high, exhibiting a wide range of attributes.',
		fermentation:
			'Complex alcohols are evident. Fruity esters are often high. Diacetyl is usually absent in these beers but may be present at very low levels.',
		body: 'Full',
		additionalNotes:
			'Vinous, sherry-like, or port-like attributes arising from oxidation may be considered positive when in harmony with overall flavor profile. Low carbonation may be acceptable in this style.',
		originalGravity: '1.090-1.120 (21.6-28 °Plato)',
		finalGravity: '1.024-1.032 (6.1-8 °Plato)',
		abw: '6.7%-9.6%',
		abv: '8.5%-12.2%',
		ibu: '60-100',
		srm: '11-18',
		ebc: '22-36',
		og: '1.09-1.12',
		description: 'Amber to deep red; high malt sweetness, high bitterness, warming alcohol.'
	},
	'belgian-speciale-belge': {
		name: 'Belgian-Style Speciale Belge',
		category: 'Ale - Belgian/French',
		color: 'Gold to amber',
		clarity: 'Chill haze is acceptable at low temperatures',
		maltAroma:
			'Malt aroma should present with caramel or lightly toasted malt attributes and should integrate with the fermentation profile.',
		hopAroma: 'Very low to medium. Noble-type hops are commonly used.',
		bitterness: 'Low to medium',
		fermentation:
			'Medium fruity esters are typically present. Yeast-derived phenolic spicy flavors and aromas should be present at low to medium-low levels. Diacetyl should not be present.',
		body: 'Low to medium',
		originalGravity: '1.040-1.054 (10-13.3 °Plato)',
		finalGravity: '1.008- 3.9%-4.9% (5.0%-6.2%)',
		abv: '5.5-8.0%',
		ibu: '20-30',
		srm: '4-12',
		ebc: '8-24',
		og: '1.06-1.076',
		description: 'Amber to brown; fruity esters with spice character.'
	},
	'belgian-blonde': {
		name: 'Belgian-Style Blonde Ale',
		category: 'Ale - Belgian/French',
		color: 'Straw to light amber',
		clarity: 'Chill haze is acceptable at low temperatures',
		maltAroma: 'Low to medium.',
		hopAroma: 'Very low to medium. Noble-type hops are commonly used.',
		bitterness: 'Very low to medium-low',
		fermentation:
			'Medium to medium- high fruity esters are balanced with low to medium malt attributes. Low level yeast-derived phenolic spiciness may be present. Diacetyl and acidic character should not be present.',
		body: 'Low to medium',
		originalGravity: '1.054-1.068 (13.3-16.6 °Plato)',
		finalGravity: '1.010-1.014 (2.6-3.6 °Plato)',
		abw: '5.0%-6.2%',
		abv: '6.3%-7.9%',
		ibu: '15-40',
		srm: '2-7',
		ebc: '4-14',
		og: '1.044-1.056',
		description: 'Pale golden; fruity esters, dry finish.'
	},
	'belgian-strong-blonde': {
		name: 'Belgian-Style Strong Blonde Ale',
		category: 'Ale - Belgian/French',
		color: 'Straw to light amber',
		clarity: 'Chill haze is acceptable at low temperatures',
		maltAroma:
			'Any of cocoa, dark light body for beers of high alcoholic strength. Some or dried fruit, or caramel aroma attributes should be versions may be equally high in alcohol with a more present along with malty sweetness. Very low level medium body.',
		hopAroma: 'Medium-low to medium-high',
		bitterness: 'Medium-low to medium-high',
		fermentation:
			'Medium to medium- high fruity esters are present. Yeast-derived phenolic spicy flavors and aromas should be present at low to medium-low levels. Fusel alcohols should remain in balance and not overwhelm overall aroma and flavor. Diacetyl should not be present.',
		body: 'Low to medium',
		additionalNotes:
			'These beers are often brewed with light-colored Belgian candy sugar. Herbs and spices are sometimes used to delicately flavor these strong ales. These beers can be malty in overall impression or dry and highly attenuated. They can have a deceptively high alcohol character and a relatively',
		originalGravity: '1.064-1.096 (15.7-22.9 °Plato)',
		finalGravity: '1.008-1.018 (2-4.5 °Plato)',
		abw: '5.6%-8.8%',
		abv: '7.1%-11.2%',
		ibu: '20-50',
		srm: '2-7',
		ebc: '4-14',
		og: '1.062-1.076',
		description: 'Pale golden; higher alcohol, fruity esters, dry finish.'
	},
	'belgian-fruit-beer': {
		name: 'Belgian-Style Fruit Beer',
		category: 'Ale - Belgian/French',
		color:
			'Can range from pale to dark depending on underlying Belgian style, and is often influenced by the color of added fruit',
		clarity: 'Clear to hazy beer is acceptable',
		maltAroma: 'Can vary from not perceived to medium-high',
		hopAroma: 'Low to high',
		bitterness: 'Varies with underlying Belgian style',
		fermentation:
			'Acidic bacterial fermentation attributes may be absent or may be present; if present, such attributes contribute to acidity and enhance fruity balance.',
		body: 'Varies with style',
		additionalNotes:
			'Fruit aromas, ranging from subtle to intense, should be present and should not be overpowered by hop aromas. Belgian-Style Fruit Beers are fermented with traditional Belgian yeast (Wit, Abbey, Farmhouse, etc.). Fruit or fruit extracts, used as adjuncts in either the mash, kettle, primary or secondary fermentation, provide harmonious fruit character ranging from subtle to intense.',
		originalGravity: '1.030-1.110 (7.6-25.9 °Plato)',
		finalGravity: '1.006-1.030 (1.5-7.6 °Plato)',
		abw: '2.0%-9.5%',
		abv: '2.5%-12.0%',
		ibu: '5-70',
		srm: '5-50',
		ebc: '10-100',
		og: '1.03-1.12',
		description: 'Variable base; fruit character prominent, balanced against malt sweetness.'
	},
	'belgian-dubbel': {
		name: 'Belgian-Style Dubbel',
		category: 'Ale - Belgian/French',
		color: 'Brown to very dark',
		clarity: 'Chill haze is acceptable at low temperatures.',
		hopAroma: 'Absent, or low if present.',
		bitterness: 'Medium-low to medium',
		fermentation:
			'Fruity esters are present at low to medium levels. Clove-like phenolic flavor and aroma may be present at low to medium- low levels. Diacetyl character should not be present.',
		body: 'Low to medium',
		additionalNotes:
			'Head should be dense and mousse-like. Herbs or spices such as coriander or overall aroma or flavor, or may be absent.',
		originalGravity: '1.060-1.075 (14.7-18.2 1.012-1.016 (3.1-4.1 °Plato)',
		abw: '5.0%-6.0%',
		abv: '6.3%-7.6%',
		ibu: '20-40',
		srm: '16-36',
		ebc: '32-72',
		og: '1.062-1.076',
		description: 'Dark brown; fruity esters, malt sweetness, dried-fruit character.'
	},
	'american-belgo-ale': {
		name: 'American-Belgo-Style Ale',
		category: 'Ale - North American',
		color: 'Gold to black',
		clarity: 'Should conform the base beer style',
		maltAroma:
			'Typically low. Perception of specialty or roasted malts or barley can flavors should be present. be very low to robust in darker versions.',
		hopAroma:
			'Medium to very high, exhibiting American-type hop aromas not usually found in traditional Belgian styles.',
		bitterness: 'Medium to high, in alignment with base beer style.',
		fermentation:
			'Fruity esters are medium to high. Belgian yeast attributes such as banana, berry, apple, coriander, spice or smoky- phenolic should be in balance with malt and hops. Diacetyl, sulfur, and attributes typical of Brettanomyces should not be present.',
		body: 'Medium-low to medium, in alignment with base beer style.',
		additionalNotes:
			'American-Belgo-Style Ales are either 1) non-Belgian beer types portraying the unique characters imparted by yeasts typically used in big, fruity Belgian-style ales, or 2) defined Belgian- style beers displaying the hallmark attributes typical of American variety hops. These beers are unique unto themselves. When using these guidelines as the basis for evaluating entries at competitions, brewers may be asked to provide supplemental information about entries in this category to allow for accurate evaluation of diverse entries. Such information might include the underlying beer style upon which the entry is based, or other information unique to the entry such as ingredients or processing which influence perceived sensory outcomes. Competition organizers may create subcategories which reflect underlying beer styles.',
		originalGravity: 'Varies with style',
		finalGravity: 'Varies with style',
		abv: 'Varies with style',
		ibu: 'Varies with style',
		srm: 'Varies with style',
		ebc: 'Varies with style',
		og: 'Varies',
		description: 'Belgian yeast-driven esters and phenolics combined with American hop character.'
	},
	'belgian-strong-dark-ale': {
		name: 'Belgian-Style Strong Dark Ale',
		category: 'Ale - Belgian/French',
		color: 'Amber to very dark',
		clarity:
			'Chill haze is acceptable at low temperatures. remain in balance and not overwhelm overall aroma and flavor.',
		maltAroma:
			'Medium-low to always) brewed with dark Belgian candy sugar. Herbs medium malt aroma and sweetness from very pale and spices are sometimes used to delicately flavor these strong ales. These beers are typically well attenuated with a deceptive alcoholic strength.',
		hopAroma: 'Low to medium',
		bitterness: 'Low to medium',
		fermentation:
			'Yeast-derived phenolic spicy flavors and aromas are present at low to medium-low levels. Complex low to medium-high intensity fruity esters are present and in harmony with malt and other attributes. Fusel alcohols should',
		body: 'Medium to full',
		additionalNotes: 'These beers are often (though not',
		originalGravity: '1.064-1.096 (15.7-22.9 °Plato)',
		finalGravity: '1.012-1.018 (3.1-4.5 °Plato)',
		abw: '5.6%-8.8%',
		abv: '7.1%-11.2%',
		ibu: '20-50',
		srm: '8-40',
		ebc: '16-80',
		og: '1.06-1.076',
		description: 'Dark brown; fruity esters, high alcohol, complex malt.'
	},
	'belgian-tripel': {
		name: 'Belgian-Style Tripel',
		category: 'Ale - Belgian/French',
		color: 'Pale to light amber',
		clarity:
			'Traditional Tripels are bottle conditioned and may exhibit slight yeast haze. However, yeast should not be intentionally roused.',
		maltAroma:
			'Low to medium pale malt character; pale malts should be present. There should be no roasted or dark malt character.',
		hopAroma: 'Low to medium noble-type hop aroma',
		bitterness: 'Low to medium-high',
		fermentation:
			'A complex, sometimes mildly spicy, aroma and flavor characterize this style. Clove-like phenolic aroma and flavor may be present but at very low levels. Fruity esters should be present but in balance with the other aromas and flavors. Pear and banana esters are common. Traditional Tripels are often well attenuated. Warming alcohol strength and flavor should be present but in balance.',
		additionalNotes:
			'Head should be dense and mousse-like. Herbs or spices such as coriander or others may be used in subtle amounts to enhance overall aroma or flavor, or may be absent. Brewing sugar may be used to lighten the body. Hop/malt/alcohol character should be balanced. The overall beer flavor may finish sweet, though any sweet finish should be light due to alcohol content, not residual sugar.',
		originalGravity: '1.063-1.092 (15.5-22 °Plato)',
		finalGravity: '1.008-1.014 (2.1-3.5 °Plato)',
		abw: '5.6%-8.0%',
		abv: '7.1%-10.1%',
		ibu: '20-50',
		srm: '4-9',
		ebc: '8-18',
		og: '1.075-1.09',
		description: 'Pale; fruity esters, dry finish, deceptively high alcohol.'
	},
	'berliner-weisse': {
		name: 'Berliner-Style Weisse',
		category: 'Ale - German',
		color: 'Straw to pale. These are the lightest of all the German wheat beers.',
		clarity: 'May appear hazy or cloudy from yeast or chill haze',
		maltAroma: 'Malt sweetness is absent',
		hopAroma: 'Not present',
		bitterness: 'Not present to very low',
		fermentation:
			'Fruity esters are low to medium. Diacetyl should not be present. Brettanomyces character may be absent or present at low to medium levels and, if present, may be expressed as any of horsey, goaty, leathery, phenolic, fruity, or acidic aroma and flavor attributes. The unique combination of yeast and lactic acid bacteria fermentation yields a beer that is acidic and highly attenuated.',
		body: 'Very low',
		additionalNotes:
			'Carbonation is high. Traditionally, some Berliners were brewed or served with fruit, spices, or syrups. Some more contemporary versions have been brewed with other ingredients such as darker malts. Any such versions will take on corresponding hues, and may exhibit flavor and aroma attributes typical of such ingredients. When using these guidelines as the basis for evaluating entries at competitions, brewers may be asked to provide supplemental information about entries in this category to allow for accurate evaluation of diverse entries. Competition organizers may create subcategories which reflect groups of entries based on the addition of fruit, spice or specialty malt, or other ingredients or processes. Fruited or flavored entries would be accompanied by a very brief description of the fruit/flavor used by the brewer.',
		originalGravity: '1.028-1.044 (7.1-11 °Plato)',
		finalGravity: '1.004- 1.006 (1-1.5 °Plato)',
		abw: '2.2%-4.0%',
		abv: '2.8%-5.0%',
		ibu: '3-6',
		srm: '2-4',
		ebc: '4-8',
		og: '1.028-1.044',
		description: 'Straw to pale; tart and highly attenuated, very light body.'
	},
	'special-bitter-best-bitter': {
		name: 'Special Bitter or Best Bitter',
		category: 'Ale - British',
		color: 'Deep gold to deep copper',
		clarity: 'Chill haze is acceptable at low temperatures',
		maltAroma: 'Medium residual malt sweetness should be present',
		hopAroma: "Very low to medium at the brewer's discretion",
		bitterness: 'Medium and not harsh',
		fermentation:
			'Low carbonation traditionally characterizes draft-cask versions, but in (IBU) 30-45 • Color SRM (EBC) 8-17 (16-34 EBC) bottled versions, a slight increase in carbon dioxide content is acceptable. Fruity esters are acceptable. Diacetyl is usually absent in these beers but may be present at low levels.',
		body: 'Medium When using these guidelines as the basis for evaluating entries at competitions, competition organizers may choose to create subcategories which reflect English and American hop character.',
		originalGravity: '1.038-1.045 (9.5-11.2 °Plato)',
		finalGravity: '1.006-1.012 (1.5-3.1 °Plato)',
		abw: '3.3%-3.8%',
		abv: '4.2%-4.8%',
		ibu: '28-40',
		srm: '6-14',
		ebc: '12-28',
		og: '1.038-1.045',
		description: 'Deep gold to copper; balanced malt with moderate bitterness.'
	},
	'golden-blonde-ale': {
		name: 'Golden or Blonde Ale',
		category: 'Ale - North American',
		color: 'Straw to gold',
		clarity: 'Chill haze should not be present',
		maltAroma:
			'Low malt sweetness and toast, cereal-like or other pale malt attributes should be present in flavor and aroma at low to medium-low levels.',
		hopAroma:
			'Hop aroma and flavor should be very low to medium, with attributes typical of hops of any origin present but not dominant.',
		bitterness: 'Low to medium',
		fermentation:
			'Fruity esters may be present at low to medium-low levels. Diacetyl and DMS should not be present.',
		body: 'Low to medium with a crisp finish',
		originalGravity: '1.045-1.054 (11.2-13.3 °Plato)',
		finalGravity: '1.008-1.016 (2.1-4.1 °Plato)',
		abw: '3.2%-4.0%',
		abv: '4.1%-5.1%',
		ibu: '15-25',
		srm: '3-7',
		ebc: '6-14',
		og: '1.045-1.054',
		description: 'Straw to gold; low malt sweetness, crisp clean finish.'
	},
	'herb-spice-beer': {
		name: 'Herb and Spice Beer',
		category: 'Hybrid',
		color: 'Varies depending on underlying style',
		clarity: 'Clear to hazy is acceptable',
		maltAroma:
			'Varies depending on intention of brewer, underlying beer style, and intensity of herb or spice aroma attributes',
		hopAroma:
			'Not essential but may be present and may be more assertive than herb-spice character',
		bitterness:
			'Very low to medium-low. Reduced hop bitterness tends to accentuate herb/spice character.',
		fermentation: 'Aromas and flavors of individual spices may not always be identifiable',
		body: 'Varies with underlying style',
		additionalNotes:
			'Herb and Spice beer is any beer brewed with herbs or spices derived from leaves, roots, seeds, fruits, vegetables, flowers, etc. and which exhibits herbal or spicy attributes. Herb or spice character can range from subtle to intense. Classifying these beers can be complex. Beers which one of several wheat beer styles. The use of rice or exhibit herbal or spicy character are considered Herb corn would not normally be considered unusual and Spice Beer. Beers brewed with chili peppers are since these adjuncts are commonly used in beer categorized as Chili Pepper Beer. Beers brewed with production. However, beers made with rice or corn or without pumpkin in which herb or spice attributes varieties which imbue highly distinctive flavor typical of pumpkin pie dominate are categorized as Pumpkin Spice Beer. When using these guidelines as the basis for evaluating entries at competitions, brewers may be asked to provide supplemental information about entries in this category to allow for accurate evaluation of diverse entries. Such information might which also contain spices, fruits, or other ingredients, include the underlying beer style upon which the entry is based, or other information unique to the entry such as type or form of herb(s) or spice(s) used Experimental Beers. Within the framework of these or other factors which influence perceived sensory outcomes.',
		originalGravity: 'Varies with style',
		abv: 'Varies with style',
		ibu: 'Varies with style',
		srm: 'Varies with style',
		og: '1.030-1.110',
		description: 'Variable base; herb or spice character balanced against the underlying style.'
	},
	'english-brown-ale': {
		name: 'English-Style Brown Ale',
		category: 'Ale - British',
		color: 'Copper to dark brown',
		clarity: 'Chill haze is acceptable at low temperatures',
		maltAroma:
			'Roast malt may contribute to a biscuit or toasted aroma profile. Roast malt may contribute to the flavor profile. Malt profile can range from dry to sweet.',
		hopAroma: 'Very low',
		bitterness: 'Very low to low',
		fermentation: 'Low to medium-low level fruity esters are appropriate. Diacetyl is usually',
		originalGravity:
			'1.045-1.060 (11.2-14.7 absent in these beers but may be present at very low levels. Body: Medium Original Gravity (°Plato) 1.040-1.050 (10-12.4 °Plato)',
		finalGravity: '1.008- 1.014 (2.1-3.6 °Plato)',
		abw: '3.3%-4.7%',
		abv: '4.2%-6.0%',
		ibu: '12-25',
		srm: '12-24',
		ebc: '24-48',
		og: '1.04-1.05',
		description: 'Copper to black; roasted malt, toasted/nutty aroma.'
	},
	'czech-dark-lager': {
		name: 'Czech-Style Dark Lager',
		category: 'Lager - European',
		color: 'Reddish Brown to black',
		clarity: 'Appearance should be clear. Chill haze should not be present.',
		maltAroma:
			'Medium to medium-high with a slightly sweet rich complex malt character and may include aromas and flavors of crystal malt, bread/toast, caramel/caramel malts, chocolate. Light roast malt character may be present at moderate levels but should not dominate.',
		hopAroma: 'Very low to low with attributes of noble-type hops.',
		bitterness: 'Low to medium-high',
		fermentation:
			'Esters are usually not present, but if present should be extremely low, at the limit of perception. Diacetyl may be allowable at low levels',
		body: 'Medium to medium-high',
		additionalNotes:
			'The upper limit of original gravity of versions brewed in Czech Republic is 14.99 °Plato or 1.060 specific gravity. Very low levels of diacetyl, if have a lightly toasted malt and/or caramel character. present, are acceptable and may accent malt character. Low levels of sulfur compounds may be present. DMS and acetaldehyde should not be present. Many versions may exhibit flavor contributions typical of decoction mashing.',
		originalGravity: '1.044-1.060 (11-14.99 °Plato)',
		finalGravity: '1.013-1.017 (3.3-4.3 °Plato)',
		abw: '3.4%-4.6%',
		abv: '4.4%-5.8%',
		ibu: '18-35',
		srm: '15-40',
		ebc: '30-78',
		og: '1.044-1.056',
		description: 'Dark brown; roasted malt, balanced sweetness.'
	},
	'german-doppelbock': {
		name: 'German-Style Doppelbock',
		category: 'Lager - German',
		color: 'Copper to dark brown',
		clarity: 'Appearance should be clear. Chill haze should not be present',
		maltAroma:
			'Pronounced aromas and flavors of toasted malted barley. Some caramel and toffee character can contribute to complexity in a secondary role. Dark fruit flavors such as prune and raisin may be present. Malty sweetness is pronounced but should not be cloying. There should be no astringency from roasted malts.',
		hopAroma: 'Hop aroma is absent. Hop flavor is low.',
		bitterness: 'Not present to very low moderate levels. Diacetyl should not be present.',
		fermentation: 'Alcoholic strength is low high. Fruity esters are commonly perceived at low to',
		body: 'Full',
		originalGravity: '1.074-1.080 (18-19.3 °Plato) present.',
		finalGravity: '1.014- 1.020 (3.6-5.1 °Plato)',
		abw: 'Additional notes: Corn, rice, or other grain or sugar 5.2%-6.2%',
		abv: '6.6%-7.9%',
		ibu: '17-27',
		srm: '12-30',
		ebc: '24-60',
		og: '1.072-1.112',
		description: 'Dark brown to black; rich malty sweetness, very strong.'
	},
	'bamberg-bock-rauchbier': {
		name: 'Bamberg-Style Bock Rauchbier',
		category: 'Lager - German',
		color: 'Dark brown to very dark',
		clarity: 'Appearance should be clear. Chill haze should not be present',
		maltAroma:
			'Medium to medium-high malt aroma and flavor should be present with very low to medium-high beechwood smoke aromas and flavors. Smoke flavors should be smooth, without harshness. Smoke flavor may create a perception of mild sweetness.',
		hopAroma: 'Very low',
		bitterness: 'Medium, increasing proportionately with starting gravity.',
		fermentation:
			'Fruity esters are usually absent, but if present should be very low. Diacetyl should not be present.',
		body: 'Medium to full',
		originalGravity: '1.066-1.074 (16.1-18 °Plato)',
		finalGravity: '1.018- 1.024 (4.6-6.1 °Plato)',
		abw: '5.0%-6.0%',
		abv: '6.3%-7.6%',
		ibu: '20-30',
		srm: '20-30',
		ebc: '40-60',
		og: '1.064-1.080',
		description: 'Dark brown; smoked malt character over a strong bock base.'
	},
	'south-german-dunkel-weizen': {
		name: 'South German-Style Dunkel Weizen',
		category: 'Ale - German',
		color: 'Copper-brown to very dark',
		clarity:
			'If served with yeast, appearance may be very a yeasty flavor and a fuller mouthfeel. cloudy',
		maltAroma:
			'In darker versions, least 50 percent wheat malt. They are often roused during pouring, and, when yeast is present, will have a yeasty flavor and a characteristically fuller mouthfeel.',
		hopAroma: 'Not present',
		bitterness: 'Low',
		fermentation:
			'The phenolic and estery aromas and flavors typical of Weissbiers are present but less pronounced in Dunkel Weissbiers. Dunkel Weissbiers should be well attenuated and very highly carbonated. Diacetyl should not be present',
		body: 'Medium to full',
		additionalNotes: 'Beers in this style are made with at',
		originalGravity: '1.048-1.056 (11.9-13.8 °Plato)',
		finalGravity: '1.008-1.016 (2.1-4.1 °Plato)',
		abw: '3.8%-4.3%',
		abv: '4.8%-5.4%',
		ibu: '10-15',
		srm: '10-25',
		ebc: '20-50',
		og: '1.048-1.056',
		description: 'Copper-brown to very dark; chocolate-like malt, banana/clove yeast character.'
	},
	'contemporary-gose': {
		name: 'Contemporary-Style Gose',
		category: 'Ale - German',
		color:
			'Usually straw to medium amber and can take on the color of added fruits or other ingredients such as darker malts.',
		clarity: 'Clear to hazy. Haze may or may not result from yeast.',
		maltAroma: 'Malt aroma and flavor is not present to very low',
		hopAroma: 'Very low to low',
		bitterness: 'Not present to medium',
		fermentation:
			'Horsey, leathery, or earthy aromas contributed by Brettanomyces yeasts may be present but at low levels as these beers do not undergo prolonged aging. Contemporary Gose may be fermented with pure beer yeast strains, or with yeast mixed with bacteria, or may be spontaneously fermented. Low to medium lactic acid character is present in all examples, expressed as a sharp, refreshing sourness.',
		body: 'Low to medium-low',
		additionalNotes:
			'Contemporary-style Gose may be brewed with malted or unmalted barley, wheat, and oats. Low level salt (table salt) and coriander additions may or may not be present.',
		abv: '4.4-5.4%',
		ibu: '5-30',
		srm: '3-9',
		og: '1.036-1.056',
		description: 'Straw to medium amber; lactic sourness with added spice or fruit.'
	},
	'south-german-hefeweizen': {
		name: 'South German-Style Hefeweizen',
		category: 'Ale - German',
		color: 'Straw to amber',
		clarity: 'If served with yeast, appearance may be very',
		maltAroma: 'Very low to medium-low',
		hopAroma: 'Not present to very low',
		bitterness: 'Very low',
		fermentation:
			'Medium-low to medium-high fruity and phenolic attributes are hallmarks of this style. Phenolic attributes such as clove, nutmeg, smoke, and vanilla are present. Banana ester aroma and flavor should be present at low to medium-high levels. Diacetyl should not be present.',
		additionalNotes:
			'Beers in this style are made with at least 50 percent malted wheat, and are very highly carbonated. These beers are typically (though not always) roused during pouring, and when yeast is present, they will have a yeasty flavor and a characteristically fuller mouthfeel.',
		originalGravity: '1.047-1.056 (11.7-13.8 1.008-1.016 (2.1-4.1 °Plato)',
		abw: '3.9%-4.4%',
		abv: '4.9%-5.6%',
		ibu: '10-15',
		srm: '3-9',
		ebc: '6-18',
		og: '1.047-1.056',
		description: 'Straw to amber; banana and clove phenolics, yeasty haze.'
	},
	'munich-helles': {
		name: 'Munich-Style Helles',
		category: 'Lager - German',
		color: 'Pale to gold',
		clarity: 'Appearance should be clear. Chill haze should not be present',
		maltAroma:
			'Malt aroma and flavor are pronounced. Low levels of yeast-produced sulfur aromas and flavors may be present. Malt character may contain light biscuit attributes. There should be no caramel character.',
		hopAroma:
			'Hop aroma is not present to low. Hop flavor is very low to low, derived from noble-type hops. noble-type hops. and diacetyl should not be present. A very low level of DMS and/or sulfur attributes may be present (but not required) and in balance with other attributes.',
		body: 'Low to medium',
		additionalNotes:
			'Many beer brands known as Austrian-Style Maerzen are nearly indistinguishable from Munich-Style Helles and are appropriately categorized here.',
		originalGravity: '1.044-1.048 (11-11.9 °Plato) 1.012 (2.1-3.1 °Plato)',
		abw: '3.8%-4.4%',
		abv: '4.8%-5.6%',
		ibu: '15-25',
		srm: '3-5',
		og: '1.048-1.056',
		description: 'Pale golden; soft malt sweetness, crisp clean finish.'
	},
	'non-alcohol-malt-beverage': {
		name: 'Non-Alcohol Malt Beverage',
		category: 'Hybrid',
		color: 'Varies with underlying style',
		clarity: 'Varies with underlying style',
		maltAroma: 'Varies with underlying style',
		hopAroma: 'Varies with underlying style',
		bitterness: 'Varies with underlying style',
		fermentation:
			'Typical of underlying style of non-alcohol beer produced. Non-alcohol (N/A) malt beverages can emulate the character of with no or nearly no alcohol (less than 0.5 percent abv). Due to their nature, non-alcohol malt beverages will have a profile lacking the complexity and balance of flavors that beers containing alcohol will display. N/A beers should be assessed with this is mind, and should not be given negative evaluations for reasons related to the absence of alcohol.',
		body: 'Varies with underlying style',
		additionalNotes:
			'For purposes of competition, brewers will be asked to verify that the alcohol content of entries in this category are <0.5% abv. When using these guidelines as the basis for evaluating entries at competitions, brewers may be asked to provide supplemental information about entries in this category to allow for accurate evaluation of diverse entries, such as the underlying classic beer style.',
		originalGravity: 'Varies with style',
		finalGravity: 'Varies with style',
		abw: '<0.4% abw',
		abv: '<0.5% abv',
		ibu: 'Varies with style',
		srm: 'Varies with style',
		og: '1.020-1.050',
		description: 'Malt beverage brewed or processed to under 0.5% ABV.'
	},
	'american-ipa': {
		name: 'American-Style India Pale Ale',
		category: 'Ale - North American',
		color: 'Pale to copper',
		clarity:
			'Chill haze is acceptable at low temperatures. Hop haze is allowable at any temperature.',
		maltAroma: 'Medium-low to medium intensity malt attributes are present in aroma and flavor',
		hopAroma:
			'High to very high, exhibiting a wide range of attributes including floral, piney, citrus, fruity (berry, tropical, stone fruit and other), sulfur, diesel-like, onion-garlic, catty, resinous, and many others.',
		bitterness: 'Medium-high to very high',
		fermentation: 'Fruity esters are low to high. Diacetyl and DMS should not be present.',
		body: 'Medium-low to medium',
		additionalNotes:
			'The use of water with high mineral content may result in a crisp, dry beer rather than a malt-accentuated version. Sugar adjuncts may be used to enhance body and balance. Hops of varied origins may be used for bitterness or for approximating traditional American character. Versions of this style brewed with non-traditional yeasts, fruits, spices, or other flavorings are categorized as Experimental India Pale Ales. Versions of this style brewed with darker malts, may be categorized as Experimental India Pale Ales, or possibly as American-Style Black Ale. When using these guidelines as the basis for evaluating entries at competitions, competition organizers may choose to create subcategories which reflect the use of different types of hops or malts, and associated sensory outcomes.',
		originalGravity: '1.060-1.070 (14.7-17.1 °Plato)',
		finalGravity: '1.010-1.016 (2.5-4.1 °Plato)',
		abw: '5.0%-6.0%',
		abv: '6.3%-7.5%',
		ibu: '50-70',
		srm: '4-12',
		ebc: '8-24',
		og: '1.06-1.07',
		description: 'Pale to copper; high to very high hop character, medium-high bitterness.'
	},
	'west-coast-ipa': {
		name: 'West Coast-Style India Pale Ale',
		category: 'Ale - North American',
		color: 'Straw to gold',
		clarity: 'Chill haze or hop haze is acceptable at low levels',
		maltAroma: 'Low to medium- low. Caramel or roasted malt character should not be present.',
		hopAroma: 'High to very high, exhibiting a wide range of attributes including floral,',
		bitterness: 'Medium-high to very high, but not harsh.',
		fermentation:
			'Fruity esters range from low to medium. DMS, acetaldehyde, and diacetyl should not be present. These beers are characterized by a high degree of attenuation.',
		body: 'Low to medium',
		additionalNotes:
			'These beers are highly attenuated with an assertive hop character and a dry, crisp finish. While the West Coast-Style India Pale Ale has term ‘hazy’ is frequently used to describe the been around for some time, the style itself has progressed over time from original inception to modern day examples-this guideline serves to align directly with modern-day examples of the style.',
		originalGravity: '1.055-1.070 (13.5-17.1 °Plato)',
		finalGravity: '1.005-1.012 (1.5-3.0 °Plato)',
		abw: '5.0%-6.0%',
		abv: '6.3%-7.5%',
		ibu: '50-75',
		srm: '2-6',
		ebc: '4-12',
		og: '1.055-1.07',
		description: 'Straw to gold; high hop aroma, dry and crisp finish.'
	},
	'imperial-double-ipa': {
		name: 'American-Style Imperial or Double IPA',
		category: 'Ale - North American',
		color: 'Straw to medium amber',
		clarity:
			'Chill haze is acceptable at low temperatures. Haze created by dry hopping is allowable at any temperature.',
		maltAroma:
			'Low to medium pale malt character is typical. Low pale caramel malt character may be present.',
		hopAroma:
			'High to intense, exhibiting a wide range of attributes including floral, piney, citrus, fruity (berry, tropical, stone fruit, and other), sulfur, diesel-like, onion-garlic, catty, resinous, and many others. Hop character should be fresh and evident, and should not be harsh.',
		bitterness: 'Very high but not harsh',
		fermentation:
			'Alcohol content is medium-high to high and evident. Fruity esters are medium to high. Diacetyl should not be present.',
		body: 'Medium to full',
		additionalNotes:
			'This style of beer should exhibit the fresh character of hops. Oxidized or aged character should not be present. Versions brewed with darker malts, non-traditional yeasts, fruits, spices, or other flavorings are categorized as',
		originalGravity: '1.067-1.087 (16.5-21 °Plato)',
		finalGravity: '1.009- 1.016 (2.3-4 °Plato)',
		abw: '6.0%-8.4%',
		abv: '7.6%-10.6%',
		ibu: '65- 100',
		srm: '2-7 (4-14 EBC) Color: Straw to light amber Clarity: Can vary widely from very low haze to very high degree of cloudiness. Starch, yeast, hop, protein or other compounds contribute to a wide range of hazy appearance within this category. Perceived Malt Aroma & Flavor: Low to high malt aroma and flavor may be present Perceived Hop Aroma & Flavor: High to intense, exhibiting a very wide range of attributes, especially fruity, tropical, juicy, and many others. Perceived bitterness: Low to medium. The impression of bitterness is soft and well-integrated into overall balance and may differ significantly from Perceived bitterness: High measured or calculated IBU levels. Fermentation Characteristics: Medium-high to high fruity esters are present and can contribute to the perception of sweetness and be complementary to the hop profile. Diacetyl should not be present. Body: Medium to high. A silky or full mouthfeel may contribute to overall flavor profile. Additional notes: Grist may include oats, wheat, or other adjuncts to promote haziness. The term ‘juicy’ is frequently used to describe taste and aroma hop- derived attributes often present in these beers which Original Gravity (°Plato) 1.090-1.120 (21.6-28 °Plato) result from late, often very large, additions of hops. A • Apparent Extract/Final Gravity (°Plato) 1.024- juicy character is not required, however. Likewise the 1.028 (6.1-7.1 °Plato) • Alcohol by Weight (Volume) term ‘hazy’ is frequently used to describe the appearance of many examples of these beers. However, some versions may exhibit very low cloudiness. Other hop-derived attributes such as citrus, pine, spice, floral or others may be present with or without the presence of juicy attributes. These beers can exhibit astringency and heat (sometimes referred to as ‘hop burn’) as a result of very high hop usage rates and excessive contact time in beer, which can detract from balance and drinkability when present above low levels. Versions of this style brewed with darker malts, non- traditional ale yeasts, fruits, spices, or other flavorings are categorized as Experimental India Pale Ale. Original Gravity (°Plato) 1.067-1.087 (16.5-21 °Plato) • Apparent Extract/Final Gravity (°Plato) 1.009- 1.016 (2.3-4 °Plato) • Alcohol by Weight (Volume) 6.0%-8.4% (7.6%-10.6%) • Hop Bitterness (IBU) 30- 80; may differ significantly from perceived bitterness • Color SRM (EBC) 2-7 (4-14 EBC)',
		og: '1.067-1.087',
		description: 'Straw to medium amber; intense hop character, very high bitterness.'
	},
	'hazy-imperial-double-ipa': {
		name: 'Juicy or Hazy Imperial or Double IPA',
		category: 'Ale - North American',
		color: 'Straw to light amber',
		clarity:
			'Can vary widely from very low haze to very high degree of cloudiness. Starch, yeast, hop, protein or other compounds contribute to a wide range of hazy appearance within this category.',
		maltAroma: 'Low to high malt aroma and flavor may be present',
		hopAroma:
			'High to intense, exhibiting a very wide range of attributes, especially fruity, tropical, juicy, and many others.',
		bitterness:
			'Low to medium. The impression of bitterness is soft and well-integrated into overall balance and may differ significantly from measured or calculated IBU levels.',
		fermentation:
			'Medium-high to high fruity esters are present and can contribute to the perception of sweetness and be complementary to the hop profile. Diacetyl should not be present.',
		body: 'Medium to high. A silky or full mouthfeel may contribute to overall flavor profile.',
		additionalNotes:
			"Grist may include oats, wheat, or other adjuncts to promote haziness. The term 'juicy' is frequently used to describe taste and aroma attributes often present in these beers which result from late, often very large, additions of hops.",
		originalGravity: '1.067-1.087 (16.5-21 °Plato)',
		finalGravity: '1.009-1.016 (2.3-4 °Plato)',
		abw: '6.0%-8.4%',
		abv: '7.6%-10.6%',
		ibu: '30-80',
		srm: '2-7',
		ebc: '4-14',
		og: '1.067-1.087',
		description: 'Straw to light amber; hazy, intense fruity/tropical hop character.'
	},
	'british-ipa': {
		name: 'British-Style India Pale Ale',
		category: 'Ale - British',
		color: 'Gold to copper',
		clarity: 'Chill haze is acceptable at low temperatures',
		maltAroma: 'Medium malt flavor should be present',
		hopAroma:
			'Medium to high, expressed as floral, herbal, earthy, stone fruit or other attributes from high hopping rates.',
		bitterness: 'Medium to high',
		fermentation:
			'Fruity esters are medium to high. Traditional interpretations are characterized by medium to medium-high alcohol content. The use of water with high mineral content results in a crisp, dry beer with a subtle and balanced character of sulfur compounds. Diacetyl can be absent or may be present at very low levels.',
		body: 'Medium',
		additionalNotes:
			'A wide range of hop varieties may be used for bitterness or for approximating traditional English hop character. The use of water with high mineral content may result in a crisp, dry beer rather than a malt-accentuated version.',
		originalGravity: '1.046-1.064 (11.4-15.7 °Plato)',
		finalGravity: '1.012-1.018 (3.1-4.6 °Plato)',
		abw: '3.6%-5.6%',
		abv: '4.5%-7.1%',
		ibu: '35-63',
		srm: '6-14',
		ebc: '12-28',
		og: '1.046-1.064',
		description: 'Gold to copper; high hop character, medium-high bitterness.'
	},
	'juicy-hazy-pale-ale': {
		name: 'Juicy or Hazy Pale Ale',
		category: 'Ale - North American',
		color: 'Straw to light amber',
		clarity:
			'Can vary widely from very low haze to very high degree of cloudiness. Starch, yeast, hop, protein or other compounds contribute to a wide range of hazy appearance within this category.',
		maltAroma: 'Low to medium-low malt aroma and flavor may be present',
		hopAroma:
			'Medium-high to very high hop aroma and flavor are present, exhibiting a very wide range of attributes, especially fruity, tropical, juicy, and many others.',
		bitterness:
			'Low to medium. The impression of bitterness is soft and well-integrated into overall balance and may differ significantly from measured or calculated IBU levels.',
		fermentation:
			'Medium-low to medium-high fruity esters are present and can contribute to the perception of sweetness and be complementary to the hop profile. Diacetyl should not be present.',
		body: 'Medium-low to medium-high. Perceived silky or full mouthfeel may contribute to overall flavor profile.',
		additionalNotes:
			'Grist may include oats, wheat, or other adjuncts to promote haziness. The term ‘juicy’ is frequently used to describe taste and aroma attributes often present in these beers which result from late, often very large, additions of hops. A juicy character is not required, however. Other hop- derived attributes such as citrus, pine, spice, floral or of juicy attributes. Likewise the term ‘hazy’ is frequently used to describe the appearance of many examples of these beers. However, some versions may exhibit very low cloudiness.',
		originalGravity: '1.044-1.050 (11-12.4 °Plato)',
		finalGravity: '1.008- 1.014 (2.1-3.6 °Plato)',
		abw: '3.5%-4.3%',
		abv: '4.4%-5.4%',
		ibu: '5-30; may differ significantly from perceived bitterness',
		srm: '3-7',
		ebc: '6-14',
		og: '1.044-1.05',
		description: 'Straw to light amber; hazy, fruity/tropical hops, soft bitterness.'
	},
	'gluten-free-beer': {
		name: 'Gluten-Free Beer',
		category: 'Hybrid',
		color: 'Varies with underlying style',
		clarity: 'Varies with underlying style',
		maltAroma:
			'Varies with underlying style. Grains and fermentables which differ from those typically used to produce a given Alcohol by Weight (Volume) Varies with style • Hop beer style can and will produce flavor and aroma outcomes that differ from traditional versions. Such Varies with style differences are to be expected and are acceptable.',
		hopAroma: 'Varies with underlying style',
		bitterness: 'Varies with underlying style',
		fermentation:
			'Although brewers may design and identify these beers according to defined style guidelines, these beers should be evaluated on their own merits without strict adherence to defined style parameters.',
		body: 'Varies with underlying style',
		additionalNotes:
			'This category includes lagers, ales or other beers made from fermentable sugars, grains and converted carbohydrates and must also include some portion of cereal. All ingredients must be free any beer style defined within these guidelines but of gluten. Within the framework of these guidelines, beers brewed with barley, wheat, spelt, rye, and other gluten-containing ingredients may not be categorized as Gluten-Free. Gluten-Free Beers may contain malted grains that are gluten-free. NOTE: These guidelines do not supersede any government regulations. Wine, mead, flavored malt beverages or beverages other than ‘beer’ as defined by the TTB (U.S. Trade and Tax Bureau) are not considered ‘gluten-free beer’ under these guidelines. Gluten-reduced beers’ original ingredients would have gluten content that has been reduced by enzymes or other processes to reduced levels. Gluten-reduced beers should be categorized in the classic style category most appropriate for the beer, rather than as Gluten-Free Beer. When using these guidelines as the basis for evaluating entries at competitions, brewers may be asked to provide supplemental information about entries in this category to allow for accurate evaluation of diverse entries. Such information might include an underlying beer style if appropriate, gluten-free grains or other carbohydrate sources, or other information unique to the entry such as ingredients or processing which influence perceived sensory outcomes such as microflora, fruit, spices, other ingredients, wood-aging, etc.',
		originalGravity: 'Varies with style',
		finalGravity: 'Varies with style',
		abv: '2.5-12.0%',
		ibu: 'Varies with style',
		srm: 'Variable',
		og: '1.030-1.100',
		description: 'Non-traditional grain base brewed to approximate a target style.'
	},
	'juicy-hazy-ipa': {
		name: 'Juicy or Hazy India Pale Ale',
		category: 'Ale - North American',
		color: 'Straw to light amber',
		clarity:
			'Can vary widely from very low haze to very high degree of cloudiness. Starch, yeast, hop, protein or other compounds contribute to a wide range of hazy appearance within this category.',
		maltAroma: 'Low to medium-low malt aroma and flavor may be present',
		hopAroma:
			'High to very high hop aroma and flavor are present, exhibiting a very wide range of attributes, especially fruity, tropical, juicy, and many others.',
		bitterness:
			'Low to medium. The impression of bitterness is soft and well-integrated into overall balance and may differ significantly from measured or calculated IBU levels.',
		fermentation:
			'Medium to medium- high fruity esters are present, and can contribute to the perception of sweetness and be complementary to the hop profile. Diacetyl should not be present. other adjuncts to promote haziness. Lactose may be used to enhance body and balance. Lactose should not lend to, or overwhelm, the flavor character of these beers. The term ‘juicy’ is frequently used to describe flavor and aroma attributes often present in these beers which result from late, often very large, additions of hops. A juicy character is not required, however. Other hop-derived attributes such as citrus, pine, spice, floral or others may be present with or without the presence of juicy attributes. Likewise the appearance of many examples of these beers. However, some versions may exhibit very low cloudiness. These beers can exhibit astringency and heat (sometimes referred to as ‘hop burn’) as a result of very high hop usage rates and excessive contact time in beer, which can detract from balance and drinkability when present above low levels. Versions of this style brewed with non-traditional yeasts, fruits, spices, or other flavorings are categorized as Experimental India Pale Ales. Versions of this style brewed with darker malts may be categorized as Experimental India Pale Ales, or possibly as American-Style Black Ale. When using these guidelines as the basis for evaluating entries at competitions, competition organizers may choose to create subcategories which reflect the use of colored malts and associated hue and aroma and flavor attributes, or based on types of groups of entries based on color, hop varieties, or hops used.',
		originalGravity: '1.060-1.070 (14.7-17.1 °Plato)',
		finalGravity: '1.008-1.020 (2-5 °Plato)',
		abw: '5.0%-6.0%',
		abv: '6.3%-7.5%',
		ibu: '20-50; may differ significantly from perceived bitterness',
		srm: '3-7',
		ebc: '6-14',
		og: '1.06-1.07',
		description: 'Straw to light amber; hazy, fruity/tropical hops, soft bitterness.'
	},
	'imperial-red-ale': {
		name: 'Imperial Red Ale',
		category: 'Ale - North American',
		color: 'Deep amber to dark copper/reddish-brown',
		clarity: 'Chill haze is acceptable at low temperatures Experimental India Pale Ale.',
		maltAroma: 'Medium to high caramel malt character is present in aroma and flavor',
		hopAroma:
			'High, derived from any variety of hops. Hop flavor is prominent and balanced with other beer attributes.',
		bitterness: 'Very high',
		fermentation:
			'Very high alcohol is a Juicy or Hazy Imperial or Double hallmark of this style. Complex alcohol flavors may be present. Fruity esters are medium. Diacetyl should India Pale Ale not be present.',
		body: 'Full',
		originalGravity: '1.080-1.100 (19.3-23.7 °Plato)',
		finalGravity: '1.020-1.028 (5.1-7.1 °Plato)',
		abw: '6.3%-8.4%',
		abv: '8.0%-10.6%',
		ibu: '55-85',
		srm: '10-17',
		ebc: '20-34',
		og: '1.08-1.1',
		description: 'Deep amber to dark copper; very high alcohol, very high bitterness.'
	},
	'session-ipa': {
		name: 'Session India Pale Ale',
		category: 'Ale - North American',
		color: 'Straw to copper',
		clarity:
			'Chill haze is acceptable at low temperatures. Hop haze is allowable at any temperature.',
		maltAroma: 'A low to medium maltiness should be present in aroma and flavor.',
		hopAroma:
			'Hop aroma and flavor are medium to high, exhibiting a wide range of attributes. Overall hop character is assertive.',
		bitterness: 'Medium to high to medium. Diacetyl should not be present.',
		body: 'Low to medium',
		additionalNotes:
			'Session India Pale Ales are lower alcohol versions of any of the various American, Juicy or Hazy, British or other India Pale Ale styles from around the world. Balance and high drinkability are key to a successful Session India Pale Ale. Hop aroma and flavor attributes hew to the underlying India Pale Ale style being made at lower strength. Beers exceeding 5.0% abv are not considered Session India Pale Ales. Beers under 5.0% abv (4.0% abw) which meet the criteria for another classic or traditional style category are not considered Session India Pale Ales. An India Pale Ale made to alcohol content below 0.5% abv (0.4% abw) is categorized as a Non- Alcohol Malt Beverage.',
		originalGravity: '1.008-1.052 (2.1-12.9 °Plato)',
		finalGravity: '1.005-1.014 (1.3-4.6 °Plato)',
		abw: '0.4%-4.0%',
		abv: '0.5%-5.0%',
		ibu: '20-55',
		srm: '3-12',
		ebc: '6-24',
		og: '1.008-1.052',
		description: 'Straw to copper; medium-high hop character at lower alcohol.'
	},
	'american-imperial-stout': {
		name: 'American-Style Imperial Stout',
		category: 'Ale - North American',
		color: 'Black',
		clarity: 'Opaque',
		maltAroma:
			'Extremely rich malty flavor with full sweet malt character is typical. Roasted malt astringency and bitterness can be moderate but should not dominate the overall character.',
		hopAroma:
			'Medium-high to high, exhibiting any of floral, citrus, herbal, or any other attributes typical of American hops.',
		bitterness: 'Medium-high to very high and balanced with rich malt character.',
		fermentation:
			'High Alcohol content is evident. Fruity esters are high. Diacetyl should not be present.',
		body: 'Full',
		originalGravity: '1.080-1.100 (19.3-23.7 °Plato)',
		finalGravity: '1.020-1.030 (5.1-7.6 °Plato)',
		abw: '5.5%-9.5%',
		abv: '7.0%-12.0%',
		ibu: '50-80',
		srm: '40+',
		ebc: '80+',
		og: '1.08-1.1',
		description: 'Black; rich malty sweetness, high bitterness, complex alcohol.'
	},
	'india-pale-lager': {
		name: 'American-Style India Pale Lager',
		category: 'Lager - North American',
		color: 'Straw to gold',
		clarity:
			'Hop haze is allowable. Chill haze should not (Volume) 5.0%-6.0% (6.3%-7.6%) • Hop Bitterness be present',
		maltAroma:
			'Medium-low to medium, exhibiting bready, cracker-like, or other attributes typical of pale malts',
		hopAroma: 'Medium to high with attributes typical of hops of any origin',
		bitterness: 'Medium to high, but not harsh',
		fermentation:
			'Fruity esters range from absent to very low. DMS, acetaldehyde, and diacetyl should not be present.',
		body: 'Low to medium',
		additionalNotes:
			'This style of beer should exhibit the fresh character of hops. Some versions may be brewed with corn, rice, or other adjunct grains, and may exhibit attributes typical of those adjuncts.',
		originalGravity: '1.050-1.065 (12.4-15.9 °Plato)',
		finalGravity: '1.006-1.016 (1.5-4.1 °Plato)',
		abw: '4.4%-6.3%',
		abv: '5.6%-7.9%',
		ibu: '30-70',
		srm: '2.5-6 (5-12 EBC) Color: Straw to gold Clarity: Appearance should be clear. Chill haze should not be present Perceived Malt Aroma & Flavor: Some malt sweetness is present Perceived Hop Aroma & Flavor: Not present Perceived bitterness: Very low Fermentation Characteristics: Fruity esters and complex alcohol aromas and flavors are acceptable at low levels. Alcohol should not be solvent-like. DMS, diacetyl, and acetaldehyde should not be present. Body: Low to medium-low Additional notes: Beers of this style are varied in character. Some malt liquors are only slightly stronger than American lagers, while others approach bock strength. Original Gravity (°Plato) 1.050-1.060 (12.4-14.7 °Plato) • Apparent Extract/Final Gravity (°Plato) 1.004-1.010 (1-2.6 °Plato) • Alcohol by Weight (IBU) 12-23 • Color SRM (EBC) 2-6 (4-12 EBC)',
		og: '1.056-1.07',
		description: 'Pale to amber; hoppy IPA character with lager crispness.'
	},
	'contemporary-american-lager': {
		name: 'Contemporary American-Style Lager',
		category: 'Lager - North American',
		color: 'Straw to gold',
		clarity: 'Chill haze should not be present',
		maltAroma: 'Malt sweetness and aroma are very low to low',
		hopAroma: 'Very low to low',
		bitterness: 'Very low to low',
		fermentation:
			'Fruity esters are usually absent but may be present at very low levels. Diacetyl, acetaldehyde, and DMS should not be present.',
		body: 'Low',
		additionalNotes:
			'Corn, rice, or other grain or sugar adjuncts are often used, but all-malt formulations are also made. Contemporary American Lagers typically exhibit increased hop aroma and flavor compared to traditional versions, are clean and crisp, and aggressively carbonated.',
		originalGravity: '1.040-1.048 (10-11.9 °Plato) Fermentation Characteristics: Fruity esters are',
		finalGravity: '1.006- 1.012 (1.5-3 °Plato)',
		abw: '3.2%-4.0%',
		abv: '4.1%-5.1%',
		ibu: '5-16',
		srm: '2-4',
		ebc: '4-8',
		og: '1.040-1.050',
		description: 'Pale; light malt character, crisp clean finish.'
	},
	'american-fruit-beer': {
		name: 'American-Style Fruit Beer',
		category: 'Ale - North American',
		color:
			'Can range from pale to very dark depending on the underlying style and is often influenced by the color of added fruit',
		clarity: 'Clear or hazy is acceptable',
		maltAroma: 'Not present to medium-low',
		hopAroma: 'Not present to medium-low',
		bitterness: 'In balance with fruit character and usually at very low to medium levels',
		fermentation:
			'Beers are fermented with traditional German, British or American ale or lager yeast. Beers fermented with Belgian-style, German-style Hefeweizen or other South German wheat beer or Berliner-style Weisse yeasts should be categorized elsewhere.',
		body: 'Varies with style',
		additionalNotes:
			'Fruit aromas, ranging from subtle to intense, should be present and should not be overpowered by hop aromas. Fruit or fruit extracts, used as an adjunct in either the mash, kettle, primary or secondary fermentation, provide harmonious fruit character ranging from subtle to intense. Fruit beers fermented with Belgian yeast should be categorized as Belgian-Style Fruit Beers.',
		originalGravity: 'Varies with style',
		finalGravity: 'Varies with style',
		abv: '2.5-12.0%',
		ibu: 'Varies with style',
		srm: 'Varies with style',
		og: '1.03-1.11',
		description: 'Variable base; fruit aroma prominent, balanced sweetness.'
	},
	'international-pilsener': {
		name: 'International-Style Pilsener',
		category: 'Lager - Other',
		color: 'Straw to gold',
		clarity: 'Appearance should be clear. Chill haze should not be present',
		maltAroma:
			'A malty sweet aroma and flavor may be present at low levels, along with adjunct flavors from corn, rice, wheat or other grains.',
		hopAroma: 'Low to medium',
		bitterness: 'Low to medium',
		fermentation:
			'Very low levels of DMS aroma and flavor are acceptable. Fruity esters, acetaldehyde, and diacetyl should not be present.',
		body: 'Low to medium',
		additionalNotes:
			'These beers are often brewed with rice, corn, wheat, or other grains. Sugar adjuncts may also be used.',
		originalGravity: '1.040-1.052 (10-12.9 °Plato)',
		finalGravity: '1.008- 1.014 (2.1-3.6 °Plato)',
		abw: '3.6%-4.2%',
		abv: '4.6%-5.3%',
		ibu: '15-40',
		srm: '3-6',
		ebc: '6-12',
		og: '1.044-1.056',
		description: 'Pale golden; crisp, balanced malt/hop character.'
	},
	'belgian-fruit-lambic': {
		name: 'Belgian-Style Fruit Lambic',
		category: 'Hybrid',
		color: 'Often influenced by the color of added fruit',
		clarity: 'Cloudiness is acceptable',
		maltAroma: 'Malt sweetness should be absent, but sweetness of fruit may be low to high.',
		hopAroma: 'Hop aroma and flavor is not present. Cheesy hop character should not be present.',
		bitterness: 'Very low',
		fermentation:
			'Characteristic horsey, goaty, leathery, and phenolic aromas and flavors derived from Brettanomyces yeast are often present at moderate levels. Lactic sourness is an important part of the flavor profile, though sweetness may compromise the intensity. Fruit sourness may also be an important part of the profile.',
		body: 'Dry to full',
		additionalNotes:
			"Traditional fruit Lambics made near Brussels carry names such as Framboise, Kriek, Peche, or Cassis. Versions made outside of the Brussels area are called 'Belgian-Style Fruit Lambics' and are made to resemble the beers of true origin. See also Belgian-Style Lambic for additional background.",
		originalGravity: '1.036-1.072 (9-17.5 °Plato)',
		finalGravity: '1.008- 1.016 (2.1-4.1 °Plato)',
		abw: '3.15%-7.1%',
		abv: '4.0%-9.0%',
		ibu: '10- 15',
		srm: 'Color takes on hue of fruit',
		ebc: 'Color takes on hue of fruit',
		og: '1.04-1.054',
		description: 'Spontaneously fermented base with fruit character.'
	},
	'german-marzen': {
		name: 'German-Style Maerzen',
		category: 'Lager - German',
		color: 'Pale to reddish-brown',
		clarity: 'Appearance should be clear. Chill haze should not be present',
		maltAroma:
			'Bready or biscuity malt aroma and flavor should be present. Sweet maltiness is medium-low to medium and leads to a muted clean hop bitterness. Malt flavors should be of light toast rather than strong caramel. Low level caramel character is acceptable.',
		hopAroma: 'Low with attributes typical of noble hop varieties',
		bitterness: 'Medium-low to medium',
		fermentation: 'Fruity esters and diacetyl should not be present.',
		body: 'Medium',
		originalGravity: '1.052-1.057 (11.4-13.8 1.012-1.020 (3.1-5.1 °Plato)',
		abw: '4.0%-4.7%',
		abv: '5.1%-6.0%',
		ibu: '18-25',
		srm: '4 -15',
		ebc: '8-30',
		og: '1.050-1.062',
		description: 'Amber; malt sweetness, festive/toasty character.'
	},
	'american-pale-ale': {
		name: 'American-Style Pale Ale',
		category: 'Ale - North American',
		color: 'Straw to light amber',
		clarity:
			'Chill haze is acceptable at low temperatures. Hop haze is allowable at any temperature.',
		maltAroma:
			'Low caramel malt aroma is allowable. Low to medium maltiness may include low caramel malt character.',
		hopAroma:
			'High, exhibiting a wide range of attributes including floral, citrus, fruity (berry, tropical, stone fruit and other), sulfur, diesel- others may be present with or without the presence like, onion-garlic, catty, piney, resinous, and many others.',
		bitterness: 'Medium to medium-high',
		fermentation: 'Fruity esters may be low to high. Diacetyl should not be present.',
		body: 'Medium',
		originalGravity: '1.044-1.050 (11-12.4 °Plato)',
		finalGravity: '1.008- 1.014 (2.1-3.6 °Plato)',
		abw: '3.5%-4.3%',
		abv: '4.4%-5.4%',
		ibu: '30-50',
		srm: '4-7',
		ebc: '8-14',
		og: '1.044-1.05',
		description: 'Straw to light amber; high hop character, citrus/fruity notes.'
	},
	'classic-english-pale-ale': {
		name: 'Classic English-Style Pale Ale',
		category: 'Ale - British',
		color: 'Gold to copper',
		clarity: 'Chill haze is acceptable at low temperatures',
		maltAroma:
			'Low to medium malt aroma and flavor is present. Low caramel character is allowable.',
		hopAroma:
			'Medium-low to medium-high, expressed as floral, herbal, earthy, stone fruit or other attributes.',
		bitterness: 'Medium-low to medium-high',
		fermentation:
			'Fruity esters are medium to medium-high. Diacetyl is usually absent in these beers but may be present at very low levels.',
		body: 'Medium',
		originalGravity: '1.040-1.056 (10-13.8 °Plato)',
		finalGravity: '1.008- 1.016 (2.1-4.1 °Plato)',
		abw: '3.5%-4.2%',
		abv: '4.4%-5.3%',
		ibu: '20-40',
		srm: '5-12',
		ebc: '10-24',
		og: '1.04-1.056',
		description: 'Gold to copper; balanced with fruity esters.'
	},
	'american-strong-pale-ale': {
		name: 'American-Style Strong Pale Ale',
		category: 'Ale - North American',
		color: 'Pale to copper',
		clarity:
			'Chill haze is acceptable at low temperatures. Hop haze is allowable at any temperature.',
		maltAroma:
			'Low caramel malt aroma is allowable. Low level maltiness may include low caramel malt character.',
		hopAroma:
			'High to very high, exhibiting a wide range of attributes including floral, citrus, fruity (berry, tropical, stone fruit and other), frequently used to describe the appearance of many sulfur, diesel-like, onion-garlic, catty, piney, resinous, examples of these beers. However, some versions and many others.',
		bitterness: 'High',
		fermentation: 'Fruity esters may be low to high. Diacetyl should not be present.',
		body: 'Medium',
		originalGravity: '1.050-1.058 (12.4-14.2 °Plato)',
		finalGravity: '1.006-1.010 (1.6-2.7 °Plato)',
		abw: '4.4%-5.05%',
		abv: '5.6%-6.4%',
		ibu: '40-50',
		srm: '3-8',
		ebc: '6-16',
		og: '1.05-1.058',
		description: 'Pale to copper; high hop character, high bitterness.'
	},
	'american-fruited-sour-ale': {
		name: 'American-Style Fruited Sour Ale',
		category: 'Ale - North American',
		color:
			'Can range from pale to black depending on underlying beer style and is often influenced by the color of added fruit',
		clarity: 'Chill haze, bacteria, and yeast-induced haze is acceptable at any temperature.',
		maltAroma:
			'Low. In darker versions, any of roasted malt, caramel, or chocolate aroma and flavor attributes should be present at low levels.',
		hopAroma: 'None to high',
		bitterness: 'None to high and in balance with fruit character',
		fermentation:
			'Moderate to intense, yet balanced, fruity esters are present. Diacetyl, DMS, and Brettanomyces should not be present. The evolution of natural acidity at medium-low to high levels develops a balanced complexity and is expressed as a refreshing, pleasant sourness, in harmony with other attributes.',
		body: 'Low to high',
		additionalNotes:
			'Fruit aromas, ranging from subtle to intense, should be present. Beers exhibiting wood-derived attributes or evidence of liquids previously aged in wood are categorized as Fruited Wood-Aged Sour Beer.',
		originalGravity: 'May vary widely',
		finalGravity: 'May vary widely',
		abv: 'Varies',
		ibu: 'May vary widely',
		srm: 'May vary widely',
		og: 'Varies',
		description: 'Natural acidity balanced with fruit character.'
	},
	'dessert-pastry-beer': {
		name: 'Dessert or Pastry Beer',
		category: 'Hybrid',
		color: 'Deep amber to black',
		clarity:
			'Beer color may be too dark to perceive. When clarity is perceivable, chill haze is acceptable at low temperatures.',
		maltAroma:
			'Extremely rich malty aroma and flavor is typical. Coffee, caramel, roasted malt, or chocolate aromas and flavors may be evident.',
		hopAroma: 'If present, very low',
		bitterness:
			'Not present to low. evident. Fruity esters may be present at low levels. Diacetyl, if present, should be at low levels.',
		additionalNotes:
			'Beers in this category are built on a ingredients to create rich, sweet flavor profiles mimicking the character of desserts, pastries, or candies. Examples of culinary ingredients used in these beers include, but are not limited to, chocolate, coffee, coconut, vanilla, maple syrup, peanut butter, and marshmallow as well as fruits, nuts, and spices. The addition of sugars from any of these beers. While this category may overlap several other styles defined in these guidelines such as Chocolate or Cocoa Beers, Field Beers, and others, the combination of a dark beer base, elevated alcohol content, and rich, sweet, dessert-like flavor profiles sets this style Extract/Final Gravity (°Plato) Varies with style • apart as a unique entity. Wood or barrel-aged versions of these beers are classified elsewhere.',
		originalGravity: '1.080-1.120 (19.3-28.0 °Plato)',
		finalGravity: '1.020-1.060 (5.1-15.0 °Plato)',
		abw: '5.5%-10.25%',
		abv: '7.0%-13.0%',
		ibu: '20-65',
		srm: '13-40+',
		ebc: '25- 70+',
		og: '1.050-1.120',
		description: 'Sweet, dessert-like character from pastry-style adjuncts.'
	},
	'czech-pale-lager': {
		name: 'Czech-Style Pale Lager',
		category: 'Lager - European',
		color: 'Straw to gold',
		clarity: 'Appearance should be clear. Unfiltered versions may exhibit slight turbidity.',
		maltAroma: 'A slightly sweet and toasted, biscuity, bready malt aroma and flavor is present.',
		hopAroma: 'Medium-low to medium, derived from late kettle hopping with noble-type hops.',
		bitterness: 'Medium',
		fermentation:
			'The upper limit of original gravity of versions brewed in Czech Republic is 12.99 °Plato or 1.052 specific gravity. Esters are usually not present, but if present should be extremely low, at the limit of perception. Very low levels of diacetyl, if present, are acceptable and may accent malt character. Low levels of sulfur compounds may be present. DMS and acetaldehyde should not be present. Many versions may exhibit flavor contributions typical of decoction mashing.',
		body: 'Medium',
		additionalNotes: 'The head should be dense.',
		originalGravity: '1.044-1.052 (11-12.99 °Plato)',
		finalGravity: '1.009-1.018 (2.3-4.5 °Plato)',
		abw: '3.63%-4.03%',
		abv: '4.6%-5.1%',
		ibu: '20-45',
		srm: '4-7',
		ebc: '7-14',
		og: '1.044-1.056',
		description: 'Pale golden; hoppy, crisp, mineral-driven water character.'
	},
	'german-pilsener': {
		name: 'German-Style Pilsener',
		category: 'Lager - German',
		color: 'Straw to pale',
		clarity: 'Appearance should be clear. Chill haze should not be present',
		maltAroma:
			'A malty sweet aroma and flavor should be present at low levels. Bready or light biscuity attributes may be present. • Apparent Extract/Final Gravity (°Plato) 1.008-',
		hopAroma:
			'Hop aroma and flavor is moderate and pronounced, derived from late hopping (not dry hopping) with noble-type hops. • Color SRM (EBC) 2.5-5 (5-10 EBC) Floral, herbal, peppery, or other attributes may be present.',
		bitterness: 'Medium to high',
		fermentation: 'Fruity-ester and DMS should not be present. These are well attenuated beers.',
		body: 'Low to medium-low',
		additionalNotes:
			'The head should be dense, pure white, and persistent. Hop character is assertive and crisp.',
		originalGravity: '1.044-1.052 (11-12.9 °Plato)',
		finalGravity: '1.006- 1.012 (1.5-3.1 °Plato)',
		abw: '3.6%-4.2%',
		abv: '4.6%-5.3%',
		ibu: '25-50',
		srm: '3-4',
		ebc: '6-8',
		og: '1.044-1.056',
		description: 'Pale golden; noble hop character, crisp finish.'
	},
	'west-coast-pilsener': {
		name: 'West Coast-Style Pilsener',
		category: 'Lager - North American',
		color: 'Straw to Gold',
		clarity: 'Hop haze or chill haze is allowable at low levels',
		maltAroma:
			'Low to medium. May include pilsener malt attributes such as bready, toasty, or cracker-like.',
		hopAroma:
			'Medium-high to very high, exhibiting a wide range of attributes including floral, piney, citrus, fruity (berry, tropical, stone fruit, and other), sulfur, dank, diesel-like, catty, resinous, and many others.',
		bitterness: 'Medium to high',
		fermentation:
			'Fruity esters range from absent to medium-low; DMS, acetaldehyde, and diacetyl should not be present. Light sulfur character that enhances hop expression is allowable.',
		body: 'Low to medium. In balance to support high dry hop rates.',
		additionalNotes:
			'This style of beer should balance the fresh, assertive expression of Pacific Northwest or Southern Hemisphere hops with the drinkability found in a pilsener.',
		originalGravity: '1.050-1.057 (12.5-14 °Plato)',
		finalGravity:
			'resinous, and many others. Perceived bitterness: Medium to high Fermentation Characteristics: Fruity esters range from absent to medium-low; DMS, acetaldehyde, and diacetyl should not be present. Light sulfur character that enhances hop expression is allowable. Body: Low to medium. In balance to support high dry hop rates. Additional notes: This style of beer should balance the fresh, assertive expression of Pacific Northwest or Southern Hemisphere hops with the drinkability found in a pilsener. Kettle hops can be either noble European/noble-type hops or modern IPA hops, though the pronounced hop expression showcases modern IPA hops. Crispness and drinkability are at the forefront of the style, but body and structure are needed to balance a significant dry hop load. Beers dry hopped with European/noble hops should be classified as Italian-Style Pilsener. Original Gravity (°Plato) 1.050-1.057 (12.5-14 °Plato)',
		abw: '3.9%-4.7%',
		abv: '5.0%-6.0%',
		ibu: '30-50',
		srm: '2.5-6.5 (4-13 EBC) OTHER ORIGIN LAGER STYLES',
		og: '1.048-1.058',
		description: 'Pale golden; classic Pilsener hopped with American varieties.'
	},
	'brown-porter': {
		name: 'Brown Porter',
		category: 'Ale - British',
		color: 'Dark brown to very dark. May have red tint.',
		clarity:
			'Beer color may be too dark to perceive clarity. When clarity is perceivable, chill haze is acceptable at low temperatures.',
		maltAroma:
			'Low to medium malt sweetness. Caramel and chocolate attributes are acceptable. Strong roast barley or strong burnt or black malt character should not be present.',
		hopAroma: 'Very low to medium',
		bitterness: 'Medium',
		fermentation:
			'Fruity esters are acceptable. Diacetyl is usually absent in these beers but may be present at low levels.',
		body: 'Low to medium',
		originalGravity: '1.040-1.050 (10-12.4 °Plato)',
		finalGravity: '1.006- 1.014 (1.5-3.6 °Plato)',
		abw: '3.5%-4.7%',
		abv: '4.4%-6.0%',
		ibu: '20-30',
		srm: '20-35',
		ebc: '40-70',
		og: '1.04-1.05',
		description: 'Dark brown; low-medium malt sweetness, caramel notes.'
	},
	'american-imperial-porter': {
		name: 'American-Style Imperial Porter',
		category: 'Ale - North American',
		color: 'Black',
		clarity: 'Opaque',
		maltAroma:
			'No roast barley or strong burnt/black malt character should be present. Medium malt, caramel, and cocoa sweetness should be present.',
		hopAroma: 'Low to medium-high',
		bitterness: 'Medium-low to medium',
		fermentation:
			'Fruity esters are present but not overpowering and should complement hop character and malt-derived sweetness. Diacetyl should not be present absent.',
		body: 'Full',
		originalGravity: '1.080-1.100 (19.3-23.7 °Plato)',
		finalGravity: '1.020-1.030 (5.1-7.6 °Plato)',
		abw: '5.5%-9.5%',
		abv: '7.0%-12.0%',
		ibu: '35-50',
		srm: '40+',
		ebc: '80+',
		og: '1.08-1.1',
		description: 'Black; medium malt/cocoa sweetness, full body.'
	},
	'belgian-quadrupel': {
		name: 'Belgian-Style Quadrupel',
		category: 'Ale - Belgian/French',
		color: 'Amber to dark brown',
		clarity: 'Chill haze is acceptable at low temperatures wheat starch and/or oats.',
		maltAroma:
			'Caramel, dark sugar and malty sweet flavors and aromas can be intense, but not cloying, and should complement fruitiness.',
		hopAroma: 'Not present to very low',
		bitterness: 'Low to medium',
		fermentation:
			'Perception of alcohol can be strong. Complex fruity attributes reminiscent of any of raisins, dates, figs, grapes, or plums are often present and may be accompanied by wine-like attributes at low levels. Clove-like phenolic flavor and 1.008-1.014 (2.0-3.5 °Plato) • Alcohol by Weight aroma may be present at low to medium-low levels. Noticeable ester profile. Fusel alcohols should remain in balance and not overwhelm overall aroma and flavor. Diacetyl and DMS should not be present.',
		body: 'Full with creamy mouthfeel',
		additionalNotes:
			'Head should be dense and mousse-like. Quadrupels are well attenuated and are characterized by an intense alcohol presence balanced by other flavors, aromas and bitterness. They are well balanced with savoring/sipping-type drinkability.',
		originalGravity: '1.092-1.120 (22-28 °Plato)',
		finalGravity: '1.014-1.020 (3.6-5.1 °Plato)',
		abw: '8.0%- 11.2%',
		abv: '10.0%-14.2%',
		ibu: '25-50',
		srm: '16-36',
		ebc: '32-72',
		og: '1.08-1.12',
		description: 'Dark brown; very high alcohol, complex dark-fruit character.'
	},
	'irish-red-ale': {
		name: 'Irish-Style Red Ale',
		category: 'Ale - Irish',
		color: 'Copper-red to reddish-brown',
		clarity: 'Chill haze or yeast haze may be present at low levels',
		maltAroma:
			'Low to medium candy-like caramel malt sweetness should be present in flavor. A toasted malt character should be present, and there may be a slight roast barley or roast malt presence.',
		hopAroma: 'Not present to medium',
		fermentation:
			'Low level fruity esters are acceptable. Diacetyl is usually absent in these beers but may be present at very low levels.',
		body: 'Medium',
		originalGravity: '1.040-1.048 (10-11.9 °Plato)',
		finalGravity: '1.010- 1.014 (2.6-3.6 °Plato)',
		abw: '3.2%-3.8%',
		abv: '4.0%-4.8%',
		ibu: '20-28',
		srm: '11-18',
		ebc: '22-36',
		og: '1.04-1.048',
		description: 'Copper-red to reddish-brown; caramel sweetness, toasted malt.'
	},
	'specialty-saison': {
		name: 'Specialty Saison',
		category: 'Ale - Belgian/French',
		color: 'Straw to dark brown; may take on hue of fruit(s), darker malts, or other ingredients',
		clarity:
			'Chill haze or slight yeast haze is acceptable • Apparent Extract/Final Gravity (°Plato) 1.005-',
		maltAroma: 'Typically low to medium-low, but may vary in beers made with specialty malts.',
		hopAroma: 'Low to medium-high',
		bitterness: 'Medium to medium-high',
		fermentation:
			'Fruity esters are medium to high. Diacetyl should not be present. Complex alcohols, herbs, spices, low Brettanomyces attributes including slightly acidic, fruity, horsey, often bottle conditioned so slight yeast haze is goaty and leather-like, as well as clove-like and smoky phenolics may be present. Herb or spice flavors may be present. A low level of sour acidic flavor is acceptable when in balance with other components. Because these beers are often bottle conditioned, they may display some yeast character and high carbonation.',
		body: 'Low to medium',
		additionalNotes:
			'Specialty Saison represents a very wide family of beers which deviate substantially from Classic Saison in appearance and sensory outcomes. Such beers are brewed with dark malts, fruit(s), spice(s), or a wide range of ingredients. Ingredients including spices, herbs, flowers, fruits, vegetables, fermentable sugars and carbohydrates, special yeasts attributes to these beers. Earthy aromas are alcohol level, and hop character should harmonize wood-aging are categorized as Specialty Saison. When using these guidelines as the basis for evaluating entries at competitions, brewers may be asked to provide supplemental information about entries in this category to allow for accurate include the underlying beer style upon which the entry is based, or other information unique to the entry such as ingredients such as malts and grains, hop varieties, microflora, fruit, spices, or other ingredients, etc. or processing (wood-aging for example) which influence perceived sensory outcomes.',
		originalGravity: '1.040-1.080 (10-19.3 °Plato) 1.014 (1.2-3.5 °Plato)',
		abw: '4.0%-7.4%',
		abv: '5.0%-9.3%',
		ibu: '20-40',
		srm: '3-20',
		ebc: '6-40',
		og: '1.044-1.08',
		description: 'Variable; fruity and spicy, sessionable to strong.'
	},
	'sweet-cream-stout': {
		name: 'Sweet Stout or Cream Stout',
		category: 'Ale - British',
		color: 'Black',
		clarity: 'Opaque',
		maltAroma:
			'Medium to medium-high. Malt sweetness, chocolate and caramel should contribute to the aroma and should dominate the flavor profile. Roast flavor may be present. Low to medium-low roasted malt-derived bitterness should be present.',
		hopAroma: 'Should not be present',
		bitterness:
			'Low to medium-low and serves to balance and suppress some of the sweetness without contributing apparent flavor and aroma',
		fermentation: 'Fruity esters, if present, are low. Diacetyl should not be present.',
		body: 'Full-bodied. Body can be increased with the addition of milk sugar (lactose).',
		originalGravity: '1.045-1.056 (11.2-13.8 °Plato)',
		finalGravity: '1.012-1.020 (3.1-5.1 °Plato)',
		abw: '2.5%-5.0%',
		abv: '3.2%-6.3%',
		ibu: '15-25',
		srm: '40+',
		ebc: '80+',
		og: '1.045-1.056',
		description: 'Black; chocolate/caramel dominant, balanced residual sweetness.'
	},
	'export-stout': {
		name: 'Export-Style Stout',
		category: 'Ale - Irish',
		color: 'Black',
		clarity: 'Opaque',
		maltAroma:
			'Coffee-like roasted barley and roasted malt aromas are prominent. Initial malt and light caramel flavors give way to a distinctive dry-roasted bitterness in the finish.',
		hopAroma: 'Low to medium-low',
		bitterness: 'May be analytically high, but the perception is lessened by malt sweetness.',
		fermentation: 'Fruity esters are low',
		body: 'Medium to full',
		additionalNotes: 'Head retention should be persistent',
		originalGravity: '1.052-1.072 (12.9-17.5 °Plato)',
		finalGravity: '1.008-1.020 (2.1-5.1 °Plato)',
		abw: '4.5%-6.4%',
		abv: '5.6%-8.0%',
		ibu: '30-60',
		srm: '40+ (80+ EBC) NORTH AMERICAN ORIGIN ALE STYLES',
		og: '1.052-1.072',
		description: 'Black; roasted coffee character with more malt sweetness than dry stout.'
	},
	'oatmeal-stout': {
		name: 'Oatmeal Stout',
		category: 'Ale - British',
		color: 'Dark brown to black',
		clarity:
			'Beer color may be too dark to perceive. When clarity is perceivable, chill haze is acceptable at exhibiting higher levels of smoke character are low temperatures.',
		maltAroma:
			'Coffee, caramel, roasted malt, or chocolate aromas should be prominent. Roasted malt character of caramel or chocolate should be smooth without bitterness.',
		hopAroma: 'Optional, but if present should not upset the overall balance.',
		bitterness: 'Medium',
		fermentation:
			'Oatmeal is used in the grist, resulting in a pleasant, full flavor without being 1.016-1.028 (4.1-7.1 °Plato) • Alcohol by Weight grainy. Fruity esters are not present to very low. Diacetyl is usually absent in these beers but may be present at very low levels.',
		body: 'Full with an often-silky mouthfeel',
		originalGravity: '1.038-1.056 (9.5-13.8 °Plato)',
		finalGravity: '1.008-1.020 (2.1-5.1 °Plato)',
		abw: '3.0%-4.8%',
		abv: '3.8%-6.1%',
		ibu: '20-40',
		srm: '20+',
		ebc: '40+',
		og: '1.038-1.056',
		description: 'Dark brown to black; smooth roasted malt, silky mouthfeel from oats.'
	},
	'classic-irish-dry-stout': {
		name: 'Classic Irish-Style Dry Stout',
		category: 'Ale - Irish',
		color: 'Black',
		clarity: 'Opaque',
		maltAroma:
			'The prominence of coffee-like roasted barley and a moderate degree of roasted malt aroma and flavor defines much of the character. The hallmark dry-roasted attributes typical of Dry Stout result from the use of roasted barley. Initial malt and light caramel flavors give way to a distinctive dry-roasted bitterness in the finish.',
		hopAroma: 'European hop character may range from not present to low in aroma and flavor',
		bitterness: 'Medium to medium-high',
		fermentation:
			'Fruity esters are low relative to malt and roasted barley as well as hop bitterness. Diacetyl is usually absent in these beers but may be present at very low levels. Slight acidity may be present but is not required.',
		body: 'Medium-light to medium',
		additionalNotes: 'Head retention should be persistent',
		originalGravity: '1.038-1.048 (9.5-11.9 °Plato)',
		finalGravity: '1.008-1.012 (2.1-3.1 °Plato)',
		abw: '3.2%-4.2%',
		abv: '4.1%-5.3%',
		ibu: '30-40',
		srm: '40+',
		ebc: '80+',
		og: '1.038-1.048',
		description: 'Black; dry-roasted coffee/barley character.'
	},
	'american-stout': {
		name: 'American-Style Stout',
		category: 'Ale - North American',
		color: 'Black',
		clarity: 'Opaque',
		maltAroma:
			'Coffee-like roasted barley and roasted malt aromas are prominent. Low to medium malt sweetness with any of caramel, chocolate, or roasted coffee attributes present at low to medium levels, with a distinct dry-roasted bitterness in the finish. Astringency from roasted malt and roasted barley is low. Slight roasted malt acidity is acceptable.',
		hopAroma:
			'Medium to high, often with any of citrusy, resiny or other attributes typical of many American hop varieties.',
		bitterness: 'Medium to high',
		fermentation:
			'Fruity esters are low. Diacetyl is usually absent in these beers but may be present at very low levels.',
		body: 'Medium to full',
		additionalNotes: 'Head retention should be persistent',
		originalGravity: '1.050-1.075 (12.4-18.2 °Plato)',
		finalGravity: '1.010-1.022 (2.6-5.6 °Plato)',
		abw: '4.5%-6.4%',
		abv: '5.7%-8.0%',
		ibu: '35-60',
		srm: '40+',
		ebc: '80+',
		og: '1.05-1.075',
		description: 'Black; coffee/roasted character, medium-high bitterness.'
	},
	'british-strong-ale': {
		name: 'Strong Ale',
		category: 'Ale - British',
		color: 'Amber to dark brown',
		clarity: 'Chill haze is acceptable at low temperatures',
		maltAroma:
			'Medium to high malt and caramel sweetness. Very low levels of roast malt may be present.',
		hopAroma: 'Not present to very low',
		bitterness: 'Present but minimal, and balanced with malt flavors.',
		fermentation:
			'Rich, often sweet and complex fruity ester attributes can contribute to the profile of Strong Ales. Alcohol types can be varied and complex. Diacetyl is usually absent in these beers but may be present at very low levels.',
		body: 'Medium to full',
		originalGravity: '1.060-1.125 (14.7-29 °Plato)',
		finalGravity: '1.014-1.040 (3.6-10 °Plato)',
		abw: '5.5%-8.9%',
		abv: '7.0%-11.3%',
		ibu: '30-60',
		srm: '8-21',
		ebc: '16-42',
		og: '1.06-1.125',
		description: 'Amber to dark brown; rich, sweet, complex fruity esters.'
	},
	'other-strong-ale-or-lager': {
		name: 'Other Strong Ale or Lager',
		category: 'Hybrid',
		color: 'Varies with underlying style',
		clarity: 'Varies with underlying style',
		maltAroma: 'Varies with underlying style',
		hopAroma: 'Varies with underlying style',
		bitterness: 'Varies with underlying style',
		fermentation:
			"Within the framework of these guidelines, beers of any style intentionally brewed to a higher alcohol content than defined within that style's guidelines are categorized as Other Strong Beer. These beers should achieve a balance between the style's characteristics and the additional alcohol and are not wood- or barrel-aged.",
		body: 'Varies with underlying style',
		originalGravity: 'Varies with style',
		finalGravity: 'Varies with style',
		abw: '6.4%+',
		abv: '8%+',
		ibu: 'Varies with style',
		srm: 'Varies with style',
		og: '1.060-1.120',
		description: 'Strong specialty beer outside the standard style families.'
	},
	'south-german-weizenbock': {
		name: 'South German-Style Weizenbock',
		category: 'Ale - German',
		color: 'Gold to very dark',
		clarity:
			'If served with yeast, appearance may be very packaged and served without yeast will not have cloudy.',
		maltAroma:
			'Medium malty sweetness should be present. If dark, a mild roast malt character should emerge in the flavor and, to a yeast character should not overpower the balance of lesser degree, in the aroma.',
		hopAroma: 'Not present',
		bitterness: 'Low',
		fermentation:
			'Balanced, clove-like phenolic and fruity ester banana notes produce a well-rounded flavor and aroma. Diacetyl should not be present. Carbonation should be high.',
		body: 'Medium to full',
		additionalNotes:
			'Beers in this style are made with at least 50 percent wheat malt. They are often roused during pouring, and, when yeast is present, will have',
		originalGravity: '1.066-1.080 (16.1-19.3 1.016-1.028 (4.1-7.1 °Plato)',
		abw: '5.5%-7.5%',
		abv: '7.0%-9.5%',
		ibu: '15-35',
		srm: '4.5-30',
		ebc: '9-60',
		og: '1.066-1.08',
		description: 'Gold to very dark; balanced clove/banana character, medium-full body.'
	},
	'wild-beer': {
		name: 'Wild Beer',
		category: 'Hybrid',
		color:
			'Any color is acceptable. Versions made with fruits or other flavorings may take on corresponding hues.',
		clarity: 'Clear or hazy due to yeast, chill haze or hop haze.',
		maltAroma:
			'Generally low malt character. Maltier versions should display good overall balance with other flavor components.',
		hopAroma: 'Very low to high',
		bitterness: 'Very low to low',
		fermentation:
			'Aromas may vary significantly due to fermentation attributes contributed by various known and unknown microorganisms that the brewer has introduced from the ambient air/environment near the brewery in which the beer is brewed. Wild Beers may or may not be perceived as acidic.',
		body: 'Very low to medium',
		additionalNotes:
			'Spontaneously fermented beers with fruit, spice or other ingredients should be categorized as Wild Beers. Beers which hew to classic or traditional categories such as Belgian-Style Lambic are categorized elsewhere.',
		originalGravity: 'Varies with style',
		finalGravity: 'Varies with style',
		abv: '3.0-10.0%',
		ibu: 'Varies with style',
		srm: 'Varies with style',
		og: '1.030-1.100',
		description: 'Wild fermentation character, complex and variable.'
	},
	'mixed-culture-brett-beer': {
		name: 'Mixed-Culture Brett Beer',
		category: 'Hybrid',
		color:
			'Any color is acceptable. Beer color may be influenced by the color of added fruits or other ingredients.',
		clarity:
			'Chill haze, bacteria and yeast-induced haze is allowable at low to medium levels at any temperature.',
		maltAroma:
			'In darker versions, any of roasted malt, caramel, or chocolate aroma and flavor attributes are present at low levels.',
		hopAroma: 'Low to high',
		bitterness: 'Low to high',
		fermentation:
			'Medium to high fruity esters are present. Acidity resulting from fermentation with Brettanomyces and bacteria results in a complex flavor profile. Brettanomyces character should be present and expressed as any of horsey, goaty, leathery, phenolic, fruity, or acidic having mild fruitiness and mild earthiness expressed aroma and flavor attributes. Cultured yeast may be used in the fermentation. Bacteria should be incorporated and in evidence. Bacteria will contribute acidity which may or may not dominate the flavor profile. Diacetyl and DMS should not be present.',
		body: 'Low to high',
		additionalNotes: 'Fruited versions will exhibit fruit',
		originalGravity: 'Varies with style',
		finalGravity: 'Varies with style',
		abw: 'Varies with style',
		abv: 'Varies with style',
		ibu: 'Varies with style',
		srm: 'Varies with style',
		ebc: 'Varies with style',
		og: '1.030-1.100',
		description: 'Mixed fermentation cultures producing complex funk/fruit character.'
	},
	'belgian-witbier': {
		name: 'Belgian-Style Witbier',
		category: 'Ale - Belgian/French',
		color: 'Straw to pale',
		clarity:
			'Unfiltered starch and yeast haze should be visible. Wits are traditionally bottle conditioned and served cloudy.',
		maltAroma: 'Low with a noticeable wheat character.',
		hopAroma: 'Hop aroma is not present to low. Hop flavor is not present.',
		bitterness: 'Low, from noble-type hops.',
		fermentation:
			'Low to medium fruity esters are present. Mild phenolic spiciness and yeast flavors may be present. Mild acidity is appropriate. Diacetyl should not be present.',
		body: 'Medium, with a degree of creaminess from',
		additionalNotes:
			'Witbiers are brewed with malted barley, unmalted wheat and sometimes oats. Since the 1960’s, they are brewed with coriander and orange peel; modern versions sometimes feature other spices or citrus peel types. If present, characteristics of added spice should be balanced and not overpower other flavor attributes.',
		originalGravity: '1.038-1.050 (9.5-12.4 °Plato)',
		finalGravity: '(Volume) 3.15%-4.35% (4.0%-5.5%)',
		abv: '4.8-5.5%',
		ibu: '10-17',
		srm: '2-4',
		ebc: '4-8',
		og: '1.044-1.052',
		description: 'Pale and cloudy; coriander/orange peel spicing.'
	},
	'specialty-honey-beer': {
		name: 'Specialty Honey Beer',
		category: 'Hybrid',
		color: 'Very light to black depending on underlying style',
		clarity: 'Clear to hazy is acceptable',
		maltAroma: 'Varies depending on intention of brewer',
		hopAroma: 'Very low to very high',
		bitterness: 'Very low to very high',
		fermentation:
			'Honey Beers may be brewed to a traditional style or may be experimental. Honey Beers incorporate honey as a fermentable sugar in addition to malted barley. Honey character should be present in aroma and flavor but should not be overpowering.',
		abv: '2.5-14.0%',
		ibu: '1-100',
		srm: '1-100',
		ebc: '2-200',
		og: '1.030-1.120',
		description: 'Honey character balanced against the underlying base style.'
	},
	'european-dark-lager': {
		name: 'European-Style Dark Lager',
		category: 'Lager - German',
		color: 'Light brown to dark brown',
		clarity: 'Appearance should be clear. Chill haze should not be present',
		maltAroma: 'Malt character is present.',
		hopAroma: 'Hop aroma and sweet maltiness and hop bitterness.',
		bitterness: 'Medium-low to medium-high',
		fermentation: 'Fruity esters and diacetyl should not be present.',
		body: 'Low to medium-low',
		additionalNotes: 'These beers offer a fine balance of',
		originalGravity: '1.048-1.056 (11.9-13.8 °Plato)',
		finalGravity: '1.014-1.018 (3.6-4.6 °Plato)',
		abw: '3.8%-4.2%',
		abv: '4.8%-5.3%',
		ibu: '20-35',
		srm: '15-40',
		ebc: '30-78',
		og: '1.044-1.056',
		description: 'Dark brown to very dark; roasted malt character.'
	},
	'aged-beer': {
		name: 'Aged Beer',
		category: 'Hybrid',
		color: 'Varies with underlying style',
		clarity: 'Varies with underlying style',
		maltAroma: 'Varies with underlying style',
		bitterness: 'Varies with underlying style',
		fermentation:
			'Aged Beers are any beers aged for over one year. A brewer may brew any type of beer of any strength and enhance its character with various aging conditions for an extended time. In general, beers with high hopping rates, roast malt, high alcohol content, and complex herbal, smoke or fruit character are the best candidates for aging.',
		body: 'May vary widely with ingredients used and underlying style',
		additionalNotes:
			'Within the framework of these guidelines, Wood- and Barrel-Aged Beers which subsequently undergo aging of one or more years in glass or stainless, and which clearly exhibit sensory outcomes of that additional aging, may be categorized as Aged Beers. However, Brett Beers, Sour Beers or any other beers exhibiting attributes of aging in the presence of any microflora must be categorized elsewhere.',
		originalGravity: 'Varies with style',
		finalGravity: 'Varies with style',
		abv: '4.0-15.0%',
		ibu: 'Varies with style',
		srm: 'Varies with style',
		og: '1.040-1.120',
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
