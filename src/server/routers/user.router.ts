import { getUserByUserIdSchema } from "~/lib/types/zod-schema";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { pgDrizzleDb } from "~/lib/db/drizzle";
import { users } from "~/lib/db/drizzle/schema";
import { eq } from "drizzle-orm";

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
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Check console for more information",
        });
      }
    }),
});
