import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import * as schema from "~/server/db/schema";
import { asc, eq } from "drizzle-orm";

export const stateRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.state.findMany({
      orderBy: [asc(schema.state.name)],
    });
  }),
  getAllByCountryId: publicProcedure
    .input(z.object({ countryId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { countryId } = input;
      return await ctx.db.query.state.findMany({
        orderBy: [asc(schema.state.name)],
        where: () => eq(schema.state.country_id, countryId),
      });
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id: stateId } = input;
      await ctx.db.query.state.findFirst({
        where: () => eq(schema.state.id, stateId),
      });
    }),
  getByCountryId: publicProcedure
    .input(z.object({ countryId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { countryId } = input;
      await ctx.db.query.state.findFirst({
        where: () => eq(schema.state.country_id, countryId),
      });
    }),
});
