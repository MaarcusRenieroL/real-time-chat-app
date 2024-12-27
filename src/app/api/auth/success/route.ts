import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { pgDrizzleDb } from "~/lib/db/drizzle";
import { users } from "~/lib/db/drizzle/schema";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id)
    throw new Error("something went wrong with authentication" + user);

  const [dbUser] = await pgDrizzleDb
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (!dbUser) {
    await pgDrizzleDb.insert(users).values({
      id: user.id,
      name: user.given_name + " " + user.family_name,
      email: user.email,
      image: user.picture,
    });
  }

  return NextResponse.redirect("http://localhost:3000/");
}
