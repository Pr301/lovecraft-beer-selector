// One-time / re-runnable migration: uploads the BA_STYLES reference data (see
// ba-style-guidelines.mjs) into the `styleGuidelines` Firestore collection
// (doc ID = style key). This is generic reference data — independent of any
// specific beer — for looking up typical SRM/OG/IBU/ABV/description by style
// when a beer record is missing one of those datapoints. Uses
// application-default credentials, so run `gcloud auth application-default
// login` first if needed.
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { BA_STYLES } from './ba-style-guidelines.mjs';

const PROJECT_ID = 'lovecraft-beer-selector';

initializeApp({
	credential: applicationDefault(),
	projectId: PROJECT_ID
});

const db = getFirestore();

const entries = Object.entries(BA_STYLES);
const BATCH_LIMIT = 500;
let written = 0;

for (let i = 0; i < entries.length; i += BATCH_LIMIT) {
	const batch = db.batch();
	for (const [key, style] of entries.slice(i, i + BATCH_LIMIT)) {
		const ref = db.collection('styleGuidelines').doc(key);
		batch.set(ref, { key, ...style });
	}
	await batch.commit();
	written += Math.min(BATCH_LIMIT, entries.length - i);
	console.log(`Uploaded ${written}/${entries.length}`);
}

console.log('Done.');
