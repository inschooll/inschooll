import { createTRPCRouter } from "~/server/api/trpc";
import { profileRouter } from "./routers/profile";
import { schoolRouter } from "./routers/school";
import { awsRouter } from "./routers/aws";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profile: profileRouter,
  school: schoolRouter,
  aws: awsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
