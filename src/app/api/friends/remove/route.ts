import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth } from "~/lib/auth";
import { db } from "~/lib/db";
import { friendSchema } from "~/lib/types/zod-schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { id: idToRemove } = friendSchema.parse(body);

    console.log(idToRemove);

    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.srem(`user:${session.user.id}:friends`, idToRemove);
    await db.srem(`user:${idToRemove}:friends`, session.user.id);

    return new NextResponse("Friend removed");
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      return new NextResponse("Invalid request payload", { status: 422 });
    }

    return new NextResponse("Invalid request", { status: 400 });
  }
}