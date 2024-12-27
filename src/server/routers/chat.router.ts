import { sendMessageSchema } from "~/lib/types/zod-schema";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { redisDb } from "~/lib/db/redis/db";
import { pusherServer } from "~/lib/pusher";
import { pgDrizzleDb } from "~/lib/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "~/lib/db/drizzle/schema";

export const chatRouter = router({
  sendMessage: privateProcedure
    .input(sendMessageSchema)
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;
      const { chatId, newMessageContent, recipientId, senderId } = input;

      try {
        if (!session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please sign in again",
          });
        }

        if (!chatId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "No chat selected",
          });
        }

        if (!newMessageContent) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Message content is required",
          });
        }

        if (!recipientId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Recipient ID is required",
          });
        }

        if (!senderId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Sender ID is required",
          });
        }

        const message = {
          chatId,
          content: newMessageContent,
          senderId,
          recipientId,
          timestamp: new Date().toISOString(),
        };

        await redisDb.zadd(chatId, {
          score: Date.now(),
          member: JSON.stringify(message),
        });

        console.log(senderId)

        const [sender] = await pgDrizzleDb.select().from(users).where(eq(users.id, senderId)).limit(1);

        await pusherServer.trigger(`chat-${chatId}`, "client-new-message", message);

        await pusherServer.trigger(`notifications-${recipientId}`, "new-message", {
          chatId: chatId,
          senderName: sender.name,
          message: message.content,
        });

        return {
          message: "Message sent successfully",
          data: message,
        }
      } catch (error) {
        console.error("Send Message Error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
      }
    }),

});
