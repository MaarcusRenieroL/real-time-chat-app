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

export const friendSchema = z.object({
  id: z.string(),
});

export const messageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  text: z.string(),
  timeStamp: z.number(),
});

export const messageArraySchema = z.array(messageSchema);

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
