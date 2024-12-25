import NextAuth, { Session } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { pgDrizzleDb } from "../db/drizzle";
import { users } from "../db/drizzle/schema";
import { eq } from "drizzle-orm";

export const { signIn, signOut, auth, handlers } = NextAuth({
  adapter: DrizzleAdapter(pgDrizzleDb),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
});
