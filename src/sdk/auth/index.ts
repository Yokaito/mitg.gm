import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import authConfig from "./auth.config";
import { adminAuth, adminDb } from "../firebase/admin";

const fourteenDays = 14 * 24 * 60 * 60; // in seconds

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: FirestoreAdapter(adminDb),
  session: {
    strategy: "jwt",
    maxAge: fourteenDays,
  },
  callbacks: {
    session: async ({ session, token }) => {
      const picture = token?.picture;
      const isDiscord = token?.picture?.includes("discord");

      if (isDiscord && picture) {
        const [, , , , discord_id] = picture.split("/");

        session.user.discord_id = discord_id;
      }

      if (token.sub) {
        session.user.id = token.sub;

        const firebase = await adminAuth.createCustomToken(token.sub);
        session.user.firebase_token = firebase;
      }

      return session;
    },
    jwt: async ({ token }) => {
      return token;
    },
  },
  ...authConfig,
});
