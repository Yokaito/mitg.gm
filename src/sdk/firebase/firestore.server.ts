import { FirebaseApp, initializeApp } from "firebase/app";
import { User, getAuth, signInWithCustomToken } from "firebase/auth";
import { firebaseConfig } from "./config";
import { getFirestore, type Firestore } from "@firebase/firestore";
import { auth } from "../auth";

interface AuthenticatedAppResponse {
  firestore: Firestore;
  currentUser: User;
}

export async function firestoreUnauthenticatedServer(): Promise<Firestore> {
  const app = initializeApp(firebaseConfig);

  return getFirestore(app);
}

export async function firestoreAuthenticatedServer(): Promise<AuthenticatedAppResponse> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const app = initializeAuthenticatedApp(session.user.id);
  const authApp = getAuth(app);

  await signInWithCustomToken(authApp, session!.user!.firebase_token);

  return {
    firestore: getFirestore(app),
    currentUser: authApp.currentUser!,
  };
}

function initializeAuthenticatedApp(uid: string): FirebaseApp {
  const random = Math.random().toString(36).split(".")[1];
  const appName = `authenticated-context:${uid}:${random}`;
  const app = initializeApp(firebaseConfig, appName);

  return app;
}
