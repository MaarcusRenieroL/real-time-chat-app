import { cache } from "react";
export const createTRPCContext = cache(async ({ req }: { req?: Request }) => {
  return { req };
});

export type Context = typeof createTRPCContext;
