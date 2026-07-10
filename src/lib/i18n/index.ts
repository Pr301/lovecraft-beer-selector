export type Locale = 'en' | 'gr'

export const translations = {
	en: {
		back: 'back',
		landing: {
			title: "Let's\nFind your\nBeer",
			cta: 'GO!',
			langEn: 'English',
			langGr: 'GReek',
		},
		mode: {
			question: 'How do you want to find your beer?',
			options: {
				quiz: { label: 'Questionnaire', desc: 'Answer a questionnaire' },
				country: { label: 'Country', desc: 'Select by country' },
				style: { label: 'Style', desc: 'Select by style of beer' },
				random: { label: 'Random', desc: 'Let RNG decide' },
			},
		},
		q1: {
			question: 'What kind of beer do you like?',
			options: {
				aromatic: 'Aromatic',
				bitter: 'Bitter',
				fruity: 'Fruity',
				'gluten-free': 'Gluten Free',
				crispy: 'Crispy',
				wheat: 'Wheat beer',
			},
		},
		q2: {
			question: 'Tap on the color of your beer?',
			next: 'Next',
		},
		q3: {
			question: 'How strong are we going?',
			next: 'Next',
			skip: 'Skip',
		},
		q4: {
			question: 'Where did your beer come from?',
			next: 'Next',
			skip: 'Skip',
		},
		result: {
			title: 'Your Beer Is:',
			explore: 'Explore more beers',
			abv: 'ABV',
			ibu: 'IBU',
		},
	},
	gr: {
		back: 'πίσω',
		landing: {
			title: 'Ας\nβρούμε την\nμπύρα σου',
			cta: 'GO!',
			langEn: 'English',
			langGr: 'GReek',
		},
		mode: {
			question: 'Πώς θέλεις να βρεις την μπύρα σου;',
			options: {
				quiz: { label: 'Ερωτηματολόγιο', desc: 'Απάντησε σε ένα ερωτηματολόγιο' },
				country: { label: 'Χώρα', desc: 'Διάλεξε με βάση τη χώρα' },
				style: { label: 'Στυλ', desc: 'Διάλεξε με βάση το στυλ μπύρας' },
				random: { label: 'Τυχαία', desc: 'Άσε την τύχη να αποφασίσει' },
			},
		},
		q1: {
			question: 'Τι είδος μπύρας σου αρέσει;',
			options: {
				aromatic: 'Αρωματική',
				bitter: 'Πικρή',
				fruity: 'Φρουτένια',
				'gluten-free': 'Χωρίς Γλουτένη',
				crispy: 'Τραγανή',
				wheat: 'Σιταρένια',
			},
		},
		q2: {
			question: 'Πάτα στο χρώμα της μπύρας σου;',
			next: 'Επόμενο',
		},
		q3: {
			question: 'Πόσο δυνατή θέλεις;',
			next: 'Επόμενο',
			skip: 'Παράλειψη',
		},
		q4: {
			question: 'Από πού είναι η μπύρα σου;',
			next: 'Επόμενο',
			skip: 'Παράλειψη',
		},
		result: {
			title: 'Η μπύρα σου είναι:',
			explore: 'Εξερεύνησε περισσότερες',
			abv: 'ABV',
			ibu: 'IBU',
		},
	},
} as const

export type Translations = (typeof translations)[Locale]
