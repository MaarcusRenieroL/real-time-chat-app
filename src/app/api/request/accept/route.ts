import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth } from "~/lib/auth";
import { db } from "~/lib/db";
import { fetchRedis } from "~/lib/helpers/redis";
import { friendSchema } from "~/lib/types/zod-schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { id: idToAdd } = friendSchema.parse(body);

    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd,
    );

    if (isAlreadyFriends) {
      return new Response("Already friends", { status: 400 });
    }

    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd,
    );

    if (!hasFriendRequest) {
      return new Response("No friend request", { status: 400 });
    }

    await db.sadd(`user:${session.user.id}:friends`, idToAdd);

    await db.sadd(`user:${idToAdd}:friends`, session.user.id);

    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd);

    return new NextResponse("Friend Accepted", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid request payload", { status: 422 });
    }

    return new NextResponse("Invalid request", { status: 400 });
  }
}
