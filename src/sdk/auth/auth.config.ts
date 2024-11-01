import Discord from "next-auth/providers/discord";
import type { NextAuthConfig } from "next-auth";
import { env } from "../env";

export default {
  providers: [
    Discord({
      clientId: env.AUTH_DISCORD_ID,
      clientSecret: env.AUTH_DISCORD_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
