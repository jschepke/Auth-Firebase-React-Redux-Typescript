import { FirebaseOptions, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import type { User } from "firebase/auth";

// cspell: disable
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};
// cspell: enable

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//# default way to initialize auth
const auth = getAuth(app);

//# custom way to initialize auth
// const auth = initializeAuth(app, { errorMap: debugErrorMap });

const firestore = getFirestore();

export type FirestoreCollections = "users" | "fakeUsers";

const firestoreRefs = {
  docs: {
    /**
     * Reference to firestore document eventsList,
     * containing all the events essentials visible to anyone
     */
    listOfEvents: doc(firestore, "eventsLists", "listOfEvents"),
  },
  collections: {
    /**
     * users collection
     */
    users: collection(firestore, "users"),
    /**
     * fake users collection
     */
    fakeUsers: collection(firestore, "fakeUsers"),
    /**
     * Reference to firestore collection events
     */
    events: collection(firestore, "events"),
    /**
     * Reference to firestore collection eventsLists
     * todo change the name eventsLists to ListsOfEvents
     */
    listsOfEvents: collection(firestore, "eventsLists"),
  },
};

const firestoreQueries = {
  currentUserEvents: (user: User) => {
    return query(
      firestoreRefs.collections.events,
      where("userID", "==", user.uid)
    );
  },
};

connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(firestore, "localhost", 8080);

export { auth, firestore, firestoreRefs, firestoreQueries };
