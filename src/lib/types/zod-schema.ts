import { z } from "zod";

export const addFriendSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
});

export const getUserByUserIdSchema = z.object({
  userId: z.string(),
});

export const addContactFormSchema = z.object({
  emails: z.array(
    z.object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email({
          message: "Invalid email",
        }),
    }),
  ),
});

export const acceptFriendRequestSchema = z.object({
  friendId: z.string(),
});

export const rejectFriendRequestSchema = z.object({
  friendId: z.string(),
});

export const sendMessageSchema = z.object({
  chatId: z.string(),
  newMessageContent: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
})