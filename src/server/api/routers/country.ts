import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import * as schema from "~/server/db/schema";
import { asc, eq } from "drizzle-orm";

export const countryRouter = createTRPCRouter({
  getAll: publicProcedure.mutation(async ({ ctx }) => {
    console.log('Fetching country');
    return await ctx.db.query.country.findMany({
      orderBy: [asc(schema.country.name)]
    });
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id: countryId } = input;
      await ctx.db.query.country.findFirst({
        where: () => eq(schema.country.id, countryId),
      });
    }),
});
