import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { Context } from "./trpc/context";
import { ZodError } from "zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  isServer: typeof window === "undefined" ? true : false,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
  isDev: process.env.NODE_ENV === "development" ? true : false,
});

export const middleware = t.middleware;
export const withAuth = middleware(async ({ next }) => {
  const session = getKindeServerSession();

  const loggedInUser = await session.getUser();

  if (!loggedInUser) {
    return next({
      ctx: {
        session: {
          userId: "",
          name: "",
          avatar: "",
          email: "",
        },
      },
    });
  }

  return next({
    ctx: {
      session: {
        userId: loggedInUser.id,
        name: loggedInUser.given_name + " " + (loggedInUser.family_name || ""),
        avatar: loggedInUser.picture,
        email: loggedInUser.email,
      },
    },
  });
});

export const createCallerFactory = t.createCallerFactory;
export const router = t.router;

export const procedure = t.procedure;

export const publicProcedure = procedure;
export const privateProcedure = procedure.use(withAuth);
