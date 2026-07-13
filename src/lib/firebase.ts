import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Public client identifiers — safe to ship in the bundle. Access is enforced
// by Firestore security rules (firestore.rules), not by hiding these values.
const firebaseConfig = {
	apiKey: 'AIzaSyCtXRO0-yUzuZe0luVge2LxvbkywuyFAyc',
	authDomain: 'lovecraft-beer-selector.firebaseapp.com',
	projectId: 'lovecraft-beer-selector',
	storageBucket: 'lovecraft-beer-selector.firebasestorage.app',
	messagingSenderId: '705190059870',
	appId: '1:705190059870:web:7af30d05742f53f469b9cf'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
