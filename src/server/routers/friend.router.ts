import {
  acceptFriendRequestSchema,
  addContactFormSchema,
  rejectFriendRequestSchema,
} from "~/lib/types/zod-schema";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { pgDrizzleDb } from "~/lib/db/drizzle";
import { friendRequests, friends, users } from "~/lib/db/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { redisDb } from "~/lib/db/redis/db";
import { pusherServer } from "~/lib/pusher";

export const friendRouter = router({
  getFriendsByUserId: privateProcedure.query(async ({ ctx }) => {
    const { session } = ctx;

    try {
      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please sign in again",
        });
      }

      const friendIdsList = await pgDrizzleDb
        .select()
        .from(friends)
        .where(eq(friends.userId, session.userId));

      const friendList = [];

      for (const friend of friendIdsList) {
        const [existingUser] = await pgDrizzleDb
          .select()
          .from(users)
          .where(eq(users.id, friend.friendId))
          .limit(1);

        if (!existingUser) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User with id: " + friend.friendId + " was not found",
          });
        }

        friendList.push(existingUser);
      }

      return {
        message: "Friends fetched successfully",
        data: friendList,
      };
    } catch (error) {
      console.error("Get Friends List Error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  }),
  getFriendRequestsByUserId: privateProcedure.query(async ({ ctx }) => {
    const { session } = ctx;

    try {
      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please sign in again",
        });
      }

      const friendRequestsList = await pgDrizzleDb
        .select()
        .from(friendRequests)
        .where(eq(friendRequests.recipientId, session.userId));

      const friendRequestUsers = [];

      for (const friendRequest of friendRequestsList) {
        const [existingUser] = await pgDrizzleDb
          .select()
          .from(users)
          .where(eq(users.id, friendRequest.senderId));

        if (!existingUser) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message:
              "User with id: " + friendRequest.senderId + " was not found",
          });
        }
        friendRequestUsers.push(existingUser);
      }

      return {
        message: "Friend Requests fetched successfully",
        data: friendRequestUsers,
      };
    } catch (error) {}
  }),
  sendFriendRequest: privateProcedure
    .input(addContactFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;
      const { emails } = input;

      try {
        if (!emails) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "No emails provided. Please include at least one email address.",
          });
        }

        if (!session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please sign in again",
          });
        }

        for (const email of emails) {
          const [existingUser] = await pgDrizzleDb
            .select()
            .from(users)
            .where(eq(users.email, email.email))
            .limit(1);

          if (!existingUser) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "User with email: " + email.email + " was not found",
            });
          }

          await pusherServer.trigger(
            `private-user-${existingUser.id}`,
            "friend-request",
            {
              senderId: session.userId,
              senderName: session.name,
              senderEmail: session.email,
              timestamp: new Date().toISOString(),
            },
          );

          await pgDrizzleDb.insert(friendRequests).values({
            senderId: session.userId,
            recipientId: existingUser.id,
          });
        }

        return {
          message: "Friend Requests sent",
        };
      } catch (error) {
        console.error("Add Friends Error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
      }
    }),
  acceptFriendRequest: privateProcedure
    .input(acceptFriendRequestSchema)
    .mutation(async ({ ctx, input }) => {
      const { friendId } = input;
      const { session } = ctx;

      try {
        if (!friendId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Id is required",
          });
        }

        if (!session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please log in again.",
          });
        }

        const [friendRequest] = await pgDrizzleDb
          .select()
          .from(friendRequests)
          .where(
            and(
              eq(friendRequests.senderId, friendId),
              eq(friendRequests.recipientId, session.userId),
            ),
          )
          .limit(1);

        if (!friendRequest) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Friend Request not found",
          });
        }

        await pgDrizzleDb.insert(friends).values({
          userId: friendRequest.senderId,
          friendId: friendRequest.recipientId,
        });

        await pgDrizzleDb.insert(friends).values({
          friendId: friendRequest.senderId,
          userId: friendRequest.recipientId,
        });

        await pgDrizzleDb
          .delete(friendRequests)
          .where(
            eq(friendRequests.friendRequestId, friendRequest.friendRequestId),
          );

        const sortedIds = [session.userId, friendId].sort();
        const chatId = `${sortedIds[0]}--${sortedIds[1]}`;

        const chatExists = await redisDb.exists(chatId);

        if (!chatExists) {
          await redisDb.zadd(chatId, {
            score: Date.now(),
            member: "",
          });
        }

        const [sessionUser] = await pgDrizzleDb
          .select({ chatIds: users.chatIds })
          .from(users)
          .where(eq(users.id, session.userId))
          .limit(1);

        const [friendUser] = await pgDrizzleDb
          .select({ chatIds: users.chatIds })
          .from(users)
          .where(eq(users.id, friendId))
          .limit(1);

        await pgDrizzleDb
          .update(users)
          .set({
            chatIds: sessionUser.chatIds
              ? [...sessionUser.chatIds, chatId]
              : [chatId],
          })
          .where(eq(users.id, session.userId));

        await pgDrizzleDb
          .update(users)
          .set({
            chatIds: friendUser.chatIds
              ? [...friendUser.chatIds, chatId]
              : [chatId],
          })
          .where(eq(users.id, friendId));

        await pusherServer.trigger(
          `private-user-${friendId}`,
          "friend-request-accepted",
          {
            id: session.userId,
            name: session.name,
            email: session.email,
            avatar: session.avatar,
            timestamp: new Date().toISOString(),
          },
        );

        return {
          message: "Friend request accepted",
        };
      } catch (error) {
        console.error("Accept Friend Request Error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred.",
        });
      }
    }),
  rejectFriendRequest: privateProcedure
    .input(rejectFriendRequestSchema)
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;
      const { friendId } = input;

      try {
        if (!session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please sign in again",
          });
        }

        if (!friendId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Friend Id is required",
          });
        }

        await pgDrizzleDb
          .delete(friendRequests)
          .where(eq(friendRequests.senderId, friendId));

        return {
          message: "Friend request rejected",
        };
      } catch (error) {
        console.error("Reject Friend Request Error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred.",
        });
      }
    }),
});

