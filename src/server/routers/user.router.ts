import { getUserByUserIdSchema } from "~/lib/types/zod-schema";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  getUserById: privateProcedure
    .input(getUserByUserIdSchema)
    .query(({ input }) => {
      const { userId } = input;

      try {
        if (!userId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User ID not found",
          });
        }

        console.log(userId);
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Check console for more information",
        });
      }
    }),
});
