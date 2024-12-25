import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { pgDrizzleDb } from "../db/drizzle";

export const { signIn, signOut, auth, handlers } = NextAuth({
  adapter: DrizzleAdapter(pgDrizzleDb),
  providers: [Google, GitHub],
});
