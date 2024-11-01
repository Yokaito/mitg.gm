"use client";

import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithCustomToken,
} from "firebase/auth";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import * as React from "react";
import { firestoreAuth } from "../firebase/firestore";

async function syncFirebaseAuth(session: Session | null) {
  if (session) {
    try {
      await signInWithCustomToken(firestoreAuth, session.user.firebase_token);

      const auth = getAuth();

      setPersistence(auth, browserLocalPersistence);
    } catch (error) {
      console.log("error", error);
    }
  } else {
    firestoreAuth.signOut();
  }
}

export function FirebaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === "loading") {
      return;
    }

    syncFirebaseAuth(session);
  }, [session, status]);

  return children;
}
