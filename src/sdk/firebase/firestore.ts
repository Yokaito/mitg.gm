import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";
import { getAnalytics, isSupported } from "firebase/analytics";

// Initialize Firebase
const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
let analytics: ReturnType<typeof getAnalytics> | undefined;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(firebaseApp);
  }
});

const firestore = getFirestore(firebaseApp);
const firestoreAuth = getAuth(firebaseApp);

export { firestore, firestoreAuth, firebaseApp, analytics };
