import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import * as schema from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  getByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.user.findFirst({
        where: () => eq(schema.user.username, input.username),
      });
      return user;
    }),
  getByEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.user.findFirst({
        where: () => eq(schema.user.email, input.email),
      });
      return user;
    }),
});
