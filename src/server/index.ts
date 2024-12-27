import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "./trpc";
import { userRouter } from "./routers/user.router";
import { friendRouter } from "./routers/friend.router";
import { chatRouter } from "./routers/chat.router";

export const appRouter = router({
  user: userRouter,
  friend: friendRouter,
  chat: chatRouter
});

export type AppRouter = typeof appRouter;

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
