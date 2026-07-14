export type Locale = 'en' | 'gr';

export const translations = {
	en: {
		back: 'back',
		home: 'Home',
		landing: {
			title: "Let's\nFind your\nBeer",
			cta: 'GO!',
			langEn: 'English',
			langGr: 'GReek'
		},
		mode: {
			question: 'How do you want to find your beer?',
			options: {
				quiz: { label: 'Questionnaire', desc: 'Answer a questionnaire' },
				country: { label: 'Country', desc: 'Select by country' },
				style: { label: 'Style', desc: 'Select by style of beer' },
				random: { label: 'Random', desc: 'Let RNG decide' }
			}
		},
		q1: {
			question: 'What kind of beer do you like?',
			options: {
				aromatic: 'Aromatic',
				bitter: 'Bitter',
				fruity: 'Fruity',
				'gluten-free': 'Gluten Free',
				crispy: 'Crispy',
				wheat: 'Wheat beer'
			}
		},
		q2: {
			question: 'Tap on the color of your beer?',
			next: 'Next'
		},
		q3: {
			question: 'How strong are we going?',
			next: 'Next',
			skip: 'Skip'
		},
		q4: {
			question: 'Where did your beer come from?',
			next: 'Next',
			skip: 'Skip',
			worldwide: 'Worldwide',
			europe: 'Europe',
			pickCity: 'Pick a city!',
			countries: {
				greece: 'Greece',
				germany: 'Germany',
				belgium: 'Belgium',
				netherlands: 'Netherlands',
				czech: 'Czech Republic',
				poland: 'Poland',
				bulgaria: 'Bulgaria',
				hungary: 'Hungary',
				latvia: 'Latvia',
				sweden: 'Sweden',
				austria: 'Austria',
				italy: 'Italy',
				uk: 'UK',
				ireland: 'Ireland',
				usa: 'USA',
				mexico: 'Mexico',
				cyprus: 'Cyprus',
				other: 'Other'
			},
			cities: {
				athens: 'Athens',
				thessaloniki: 'Thessaloniki',
				heraklion: 'Heraklion',
				serres: 'Serres',
				evia: 'Evia',
				corfu: 'Corfu',
				chios: 'Chios',
				attica: 'Attica',
				folegandros: 'Folegandros',
				patras: 'Patras',
				rethymno: 'Rethymno',
				samothraki: 'Samothraki',
				chalkidiki: 'Chalkidiki'
			}
		},
		random: {
			question: 'How should we pick?',
			options: {
				slot: { label: 'Slot Machine', desc: 'Pull the lever and let fate decide' },
				dice: { label: 'D20 Tap Roll', desc: 'Roll for one of our 20 taps' }
			},
			slotCta: 'Pull the Lever!',
			diceCta: 'Roll the D20!',
			rolling: 'Rolling...',
			tapLabel: 'Tap',
			seeResult: 'See My Beer!'
		},
		result: {
			title: 'Your Beer Is:',
			matchesTitle: 'Your Matches:',
			empty: 'No beers match all your answers.',
			explore: 'Explore more beers',
			abv: 'ABV',
			ibu: 'IBU'
		}
	},
	gr: {
		back: 'πίσω',
		home: 'Αρχική',
		landing: {
			title: 'Ας\nβρούμε την\nμπύρα σου',
			cta: 'GO!',
			langEn: 'English',
			langGr: 'GReek'
		},
		mode: {
			question: 'Πώς θέλεις να βρεις την μπύρα σου;',
			options: {
				quiz: { label: 'Ερωτηματολόγιο', desc: 'Απάντησε σε ένα ερωτηματολόγιο' },
				country: { label: 'Χώρα', desc: 'Διάλεξε με βάση τη χώρα' },
				style: { label: 'Στυλ', desc: 'Διάλεξε με βάση το στυλ μπύρας' },
				random: { label: 'Τυχαία', desc: 'Άσε την τύχη να αποφασίσει' }
			}
		},
		q1: {
			question: 'Τι είδος μπύρας σου αρέσει;',
			options: {
				aromatic: 'Αρωματική',
				bitter: 'Πικρή',
				fruity: 'Φρουτένια',
				'gluten-free': 'Χωρίς Γλουτένη',
				crispy: 'Τραγανή',
				wheat: 'Σιταρένια'
			}
		},
		q2: {
			question: 'Πάτα στο χρώμα της μπύρας σου;',
			next: 'Επόμενο'
		},
		q3: {
			question: 'Πόσο δυνατή θέλεις;',
			next: 'Επόμενο',
			skip: 'Παράλειψη'
		},
		q4: {
			question: 'Από πού είναι η μπύρα σου;',
			next: 'Επόμενο',
			skip: 'Παράλειψη',
			worldwide: 'Παγκόσμια',
			europe: 'Ευρώπη',
			pickCity: 'Διάλεξε πόλη!',
			countries: {
				greece: 'Ελλάδα',
				germany: 'Γερμανία',
				belgium: 'Βέλγιο',
				netherlands: 'Ολλανδία',
				czech: 'Τσεχία',
				poland: 'Πολωνία',
				bulgaria: 'Βουλγαρία',
				hungary: 'Ουγγαρία',
				latvia: 'Λετονία',
				sweden: 'Σουηδία',
				austria: 'Αυστρία',
				italy: 'Ιταλία',
				uk: 'Ηνωμένο Βασίλειο',
				ireland: 'Ιρλανδία',
				usa: 'ΗΠΑ',
				mexico: 'Μεξικό',
				cyprus: 'Κύπρος',
				other: 'Άλλη'
			},
			cities: {
				athens: 'Αθήνα',
				thessaloniki: 'Θεσσαλονίκη',
				heraklion: 'Ηράκλειο',
				serres: 'Σέρρες',
				evia: 'Εύβοια',
				corfu: 'Κέρκυρα',
				chios: 'Χίος',
				attica: 'Αττική',
				folegandros: 'Φολέγανδρος',
				patras: 'Πάτρα',
				rethymno: 'Ρέθυμνο',
				samothraki: 'Σαμοθράκη',
				chalkidiki: 'Χαλκιδική'
			}
		},
		random: {
			question: 'Πώς θέλεις να διαλέξουμε;',
			options: {
				slot: { label: 'Slot Machine', desc: 'Τράβα τον μοχλό κι άσε την τύχη' },
				dice: { label: 'Ζάρι D20', desc: 'Ρίξε ζάρι για μία από τις 20 βρύσες' }
			},
			slotCta: 'Τράβα τον μοχλό!',
			diceCta: 'Ρίξε το D20!',
			rolling: 'Κυλάει...',
			tapLabel: 'Βρύση',
			seeResult: 'Δες τη μπύρα σου!'
		},
		result: {
			title: 'Η μπύρα σου είναι:',
			matchesTitle: 'Οι μπύρες σου:',
			empty: 'Καμία μπύρα δεν ταιριάζει σε όλες τις επιλογές σου.',
			explore: 'Εξερεύνησε περισσότερες',
			abv: 'ABV',
			ibu: 'IBU'
		}
	}
} as const;

export type Translations = (typeof translations)[Locale];
