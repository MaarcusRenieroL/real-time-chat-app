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
