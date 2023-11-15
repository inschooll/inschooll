import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { school, user_school_role } from "~/server/db/schema";
import { randomUUID } from "crypto";
import roles from "~/app/core/constants/roles";
import { eq } from "drizzle-orm";

const schoolType = {
  name: z.string(),
  about: z.string(),
  motto: z.string(),
  acronym: z.string(),
  coverUrl: z.string(),
  logoUrl: z.string(),

  country: z.string(),
  state: z.string(),
  address: z.string(),

  email: z.string(),
  phone1: z.string(),
  phone2: z.string(),
  phone3: z.string(),

  websiteUrl: z.string(),
  twitterUrl: z.string(),
  instagramUrl: z.string(),
  facebookUrl: z.string(),
}

const schoolOptionalType = {
  id: z.string(),
  name: z.string().optional(),
  about: z.string().optional(),
  motto: z.string().optional(),
  acronym: z.string().optional(),
  coverUrl: z.string().optional(),
  logoUrl: z.string().optional(),
  address: z.string().optional(),
  phone1: z.string().optional(),
  phone2: z.string().optional(),
  phone3: z.string().optional(),
  websiteUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
}

export const schoolRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object(schoolType))
    .mutation( async ({ctx, input}) => {
      // get country and state id
      const country = await ctx.db.query.country.findFirst({where: (country, { eq }) => eq(country.name, input.country)})
      const state = await ctx.db.query.state.findFirst({where: (state, { eq }) => eq(state.name, input.state)})

      // ensure there are no country or state errors
      if (!country) throw new Error(`The country ${input.country} does not exist`); 
      if (!state) throw new Error(`The state ${input.state} does not exist`); 
      if (state.country_id !== country.id) throw new Error(`The selected ${input.state.toUpperCase()}state is not a valid state of the country ${input.country.toUpperCase()}`);

      // create school form data
      const data = {
        id: randomUUID(),
        name: input.name,
        about: input.about,
        motto: input.motto,
        acronym: input.acronym,
        coverUrl: input.coverUrl,
        logoUrl: input.logoUrl,
        address: input.address,
        phone1: input.phone1,
        phone2: input.phone2,
        phone3: input.phone3,
        websiteUrl: input.websiteUrl,
        twitterUrl: input.twitterUrl,
        instagramUrl: input.instagramUrl,
        facebookUrl: input.facebookUrl,
        
        country_id: country.id,
        state_id: state.id,
        chancellor_id: ctx.session.user.id,
      };

      // create school
      const newSchool = await ctx.db.insert(school).values(data);
      console.log('school: created successfully! ✅ ... step1');
      // fetch school that was just created
      const newSchoolData = await ctx.db.query.school.findFirst({
        where: (school, { eq }) => eq(school.name, input.name)
      })

      // create chancellor user_role for current user
      // - get chancellor role from db
      const role = await ctx.db.query.role.findFirst({
        where: (role, { eq }) => eq(role.name, roles.chancellor)
      });
      
      // ensure the role was fetched
      if (!role) throw new Error(`The chancellor role was not found`);
      console.log(`User: ${ctx.session.user.id}`);
      console.log(`School: ${newSchoolData?.id}`);
      console.log(`Role: ${role?.id}`);

      const data2 = {
        user_id: ctx.session.user.id,
        school_id: newSchoolData?.id ?? '',
        role_id: role.id,
      };

      // - create user_school_role relationship
      const userSchoolRole = await ctx.db.insert(user_school_role).values(data2);
      console.log('user_school_role: created successfully! ✅ ...step2 (done)');

      // return new school
      return newSchool.insertId;
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string()}))
    .query( async ({ ctx, input }) => {
      return await ctx.db.query.school.findFirst({where: (school, { eq }) => eq(school.id, input.id)});
    }),
  getByName: protectedProcedure
    .input(z.object({ name: z.string()}))
    .query( async ({ ctx, input }) => {
      return await ctx.db.query.school.findFirst({where: (school, { eq }) => eq(school.name, input.name)});
    }),
    // TODO: who exactly can update a schools information (chancellor, vice chancellor or those with specific permission)
  update: protectedProcedure
    .input(z.object(schoolOptionalType))
    .mutation(async ({ ctx, input }) => {
      // ensure user is authorized or permitted
      const userSchoolRole = await ctx.db.query.user_school_role.findFirst({
        where: (usr, { eq }) => {
          return eq(usr.user_id, ctx.session.user.id) && eq(usr.school_id, input.id);
        },
        with: {user: true, role: true, school: true}
      });
      console.log(userSchoolRole);
      
      // TODO: ensure user is only able to delete a school if they are the vice chancellor
      
      // make changes

      // return school id
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string()}))
    .mutation( async ({ ctx, input }) => {
      // ensure user is authorized or permitted
      const userSchoolRole = await ctx.db.query.user_school_role.findFirst({
        where: (usr, { eq }) => {
          return eq(usr.user_id, ctx.session.user.id) && eq(usr.school_id, input.id);
        },
        with: {user: true, role: true, school: true}
      });
      console.log(userSchoolRole);

      // TODO: ensure user is only able to delete a school if they are the vice chancellor
      // if (userSchoolRole != undefined && userSchoolRole.role != roles.chancellor) throw new Error("You don't have the authority to delete this role");

      // TODO: done
      // delete
      // const deletedSchool = await ctx.db.delete(school).where(eq(school.id, input.id));
      // // return
      // return deletedSchool.insertId;
    })
})