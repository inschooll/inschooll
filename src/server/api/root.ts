import { createTRPCRouter } from "~/server/api/trpc";
import { schoolRouter } from "./routers/school";
import { awsRouter } from "./routers/aws";
import { authRouter } from "./routers/auth";
import { userRouter } from "./routers/user";
import { countryRouter } from "./routers/country";
import { stateRouter } from "./routers/state";
import { passwordRouter } from "./routers/password";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  school: schoolRouter,
  aws: awsRouter,
  auth: authRouter,
  user: userRouter,
  country: countryRouter,
  state: stateRouter,
  password: passwordRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
