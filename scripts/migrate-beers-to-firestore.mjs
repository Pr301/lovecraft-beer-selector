// One-time / re-runnable migration: uploads scripts/beers-enriched.json into a
// Firestore collection (doc ID = beer id). Uses application-default
// credentials, so run `gcloud auth application-default login` first if needed.
//
// Targets the `beers` collection by default (what the deployed app reads).
// Pass a collection name to target something else, e.g.:
//   node scripts/migrate-beers-to-firestore.mjs beersDev
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const PROJECT_ID = 'lovecraft-beer-selector';
const COLLECTION = process.argv[2] || 'beers';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, 'beers-enriched.json');

initializeApp({
	credential: applicationDefault(),
	projectId: PROJECT_ID
});

const db = getFirestore();

const beers = JSON.parse(await readFile(dataPath, 'utf-8'));

const BATCH_LIMIT = 500;
let written = 0;

console.log(`Target collection: ${COLLECTION}`);

for (let i = 0; i < beers.length; i += BATCH_LIMIT) {
	const batch = db.batch();
	for (const beer of beers.slice(i, i + BATCH_LIMIT)) {
		const ref = db.collection(COLLECTION).doc(beer.id);
		batch.set(ref, beer);
	}
	await batch.commit();
	written += Math.min(BATCH_LIMIT, beers.length - i);
	console.log(`Uploaded ${written}/${beers.length}`);
}

console.log('Done.');
