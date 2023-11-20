import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { profile } from "~/server/db/schema";
import { randomUUID } from "crypto";

const profileFormData = { 
  firstName: z.string(), 
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  gender: z.string(),
  month: z.string(),
  day: z.string(),
  year: z.string(),
};

export const profileRouter = createTRPCRouter({
  getProfileByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userProfile = await ctx.db.query.profile.findFirst({
        where: (profile, { eq }) => eq(profile.userId, input.userId),
      });
      
      return userProfile;
    }),
  getProfileByUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.profile.findFirst({
        where: (profile, { eq }) => eq(profile.username, input.username),
      });
    }),
  createProfile: protectedProcedure
    .input(z.object(profileFormData))
    .mutation(async ({ ctx, input }) => {
      // ensure profile doesn't exist already
      const existingProfile = await ctx.db.query.profile.findFirst({
        where: (profile, { eq }) => eq(profile.userId, ctx.session.user.id)
      });
      console.log(input.day);
      console.log(existingProfile);
      if (existingProfile) return;

      // create profile and then
      await ctx.db
        .insert(profile)
        .values({
          id: randomUUID(),
          userId: ctx.session.user.id,
          firstName: input.firstName,
          lastName: input.lastName,
          username: input.username,
          password: input.password,
          phone1: input.phone,
          gender: input.gender.toLowerCase() === "male" ? "male" : "female",
          dateOfBirth: new Date(`${input.year}-${input.month}-${parseInt(input.day) + 1}`),
        });
      // return profile
      const newProfile = await ctx.db.query.profile.findFirst({
        where: (profile, { eq }) => eq(profile.userId, ctx.session.user.id)
      });
      console.log(newProfile);
      return newProfile;
    }),
});