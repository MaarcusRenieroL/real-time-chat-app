import { getUserByUserIdSchema } from "~/lib/types/zod-schema";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { pgDrizzleDb } from "~/lib/db/drizzle";
import { users } from "~/lib/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { redisDb } from "~/lib/db/redis/db";
import { MessageList } from "~/lib/types";

export const userRouter = router({
  getUserById: privateProcedure
    .input(getUserByUserIdSchema)
    .query(async ({ input }) => {
      const { userId } = input;

      try {
        if (!userId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User ID not found",
          });
        }

        const [existingUser] = await pgDrizzleDb
          .select()
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);

        if (!existingUser) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User with id: " + userId + " was not found",
          });
        }

        return {
          message: "User fetched successfully",
          data: existingUser,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Check console for more information",
        });
      }
    }),
  getChatsByUserId: privateProcedure.query(async ({ ctx }) => {
    const { session } = ctx;

    try {
      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please sign in again",
        });
      }

      const chatIdList = await pgDrizzleDb
        .select({ chatIds: users.chatIds })
        .from(users)
        .where(eq(users.id, session.userId));

      const chatIds = chatIdList
        .map((item) => item.chatIds)
        .flat()
        .filter((item) => item !== session.userId);

      const chats = [];

      for (const id of chatIds) {
        const userIds = id!.toString().split("--");
        let senderId = "";
        let receiverId = "";

        if (userIds[0] == session.userId) {
          senderId = userIds[0];
          receiverId = userIds[1];
        } else {
          senderId = userIds[1];
          receiverId = userIds[0];
        }

        const messages: MessageList[] = await redisDb.zrange(id!, 0, -1);

        const [receiver] = await pgDrizzleDb
          .select()
          .from(users)
          .where(eq(users.id, receiverId))
          .limit(1);

        chats.push({
          chatId: id!,
          imageUrl: receiver.image!,
          receiverName: receiver.name!,
          lastMessage: messages[messages.length - 1].content!,
          timestamp: messages[messages.length - 1].timestamp!,
        });
      }

      return {
        message: "Chats fetched succesfully",
        data: chats,
      };
    } catch (error) {
      console.error("Get Chat Ids By User Id Error:", error);
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
