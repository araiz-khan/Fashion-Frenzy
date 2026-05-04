
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getDatabase, type Database } from 'firebase/database';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Use 'any' to allow for late initialization and to avoid TS errors
// when the config is missing. The error handling in layout.tsx will prevent
// the app from running with uninitialized services.
let app: any;
let auth: any;
let db: any;
let rtdb: any;
let storage: any;
let firebaseError: string | null = null;

if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("YOUR_API_KEY") || !firebaseConfig.projectId) {
    firebaseError = "Firebase API Key or Project ID is missing or a placeholder. Please update your .env file.";
}

if (!firebaseError) {
    try {
        if (!getApps().length) {
            app = initializeApp(firebaseConfig);
        } else {
            app = getApps()[0];
        }

        auth = getAuth(app);
        db = getFirestore(app);
        rtdb = getDatabase(app);
        storage = getStorage(app);
    } catch (e: any) {
        console.error("Firebase initialization error:", e.message);
        firebaseError = e.message;
    }
}

export { app, auth, db, rtdb, storage, firebaseError };
