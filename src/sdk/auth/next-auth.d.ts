// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      discord_id: string;
      firebase_token: string;
    } & DefaultSession["user"];
  }
}
