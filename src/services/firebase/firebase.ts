import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
  type User,
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  collection,
  connectFirestoreEmulator,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/**------------------------------------------------------------------------
 *#                              AUTH
 *------------------------------------------------------------------------**/

/**
 * Firebase Auth instance
 * @remarks
 * Default way to initialize auth
 */
const auth = getAuth(app);

// Sets the current language to the default device/browser preference
auth.useDeviceLanguage();

// Auth providers
const googleAuthProvider = new GoogleAuthProvider();

/**------------------------------------------------------------------------
 *#                             FIRESTORE
 *------------------------------------------------------------------------**/

const firestore = getFirestore();

const firestoreQueries = {
  currentUserEvents: (user: User) => {
    return query(
      collection(firestore, 'events'),
      where('userID', '==', user.uid)
    );
  },
};

/**------------------------------------------------------------------------
 *#                            EMULATOR
 *------------------------------------------------------------------------**/

connectAuthEmulator(auth, 'http://localhost:9099');
connectFirestoreEmulator(firestore, 'localhost', 8080);

/**------------------------------------------------------------------------
 *#                           EXPORTS
 *------------------------------------------------------------------------**/

export { auth, firestore, firestoreQueries, googleAuthProvider };
