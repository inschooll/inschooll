import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { school, user_school_role } from "~/server/db/schema";
import { randomUUID } from "crypto";
import roles from "~/app/core/constants/roles";
import { asc } from "drizzle-orm";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, s3Client } from "./aws";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCClientError } from "@trpc/client";
import errorMessages from "~/app/core/constants/error-messages";
import { SchoolSchema } from "~/lib/types";

const schoolOptionalType = {
  id: z.string(),
  name: z.string().optional(),
  about: z.string().optional(),
  motto: z.string().optional(),
  acronym: z.string().optional(),
  cover: z.string().optional(),
  logo: z.string().optional(),
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
};

const getAllTypes = {
  skip: z.number().optional(),
  limit: z.number().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
};

export const schoolRouter = createTRPCRouter({
  create: protectedProcedure
    .input(SchoolSchema)
    .mutation(async ({ ctx, input }) => {
      // get country and state id
      const country = await ctx.db.query.country.findFirst({
        where: (table, { eq }) => eq(table.name, input.country),
      });
      const state = await ctx.db.query.state.findFirst({
        where: (state, { eq }) => eq(state.name, input.state),
      });

      // ensure there are no country or state errors
      if (!country)
        throw new TRPCClientError(errorMessages.countryDoesNotExist);
      if (!state) throw new TRPCClientError(errorMessages.stateDoesNotExist);
      if (state.country_id !== country.id)
        throw new TRPCClientError(errorMessages.stateDoesNotBelongToCountry);

      // create school form data
      const data = {
        id: randomUUID(),
        ...input,
        cover: input.coverKey,
        logo: input.logoKey,
        websiteUrl: input.website,
        twitterUrl: input.twitter,
        instagramUrl: input.instagram,
        facebookUrl: input.facebook,

        country_id: country.id,
        state_id: state.id,
        // chancellor_id: ctx.session.user.id,
      };

      // create school
      const newSchool = await ctx.db.insert(school).values(data);
      const newSchoolData = await ctx.db.query.school.findFirst({
        where: (school, { eq }) => eq(school.name, input.name),
      });

      // TODO: Integrate roles: create user_school_role relationship
      // STEP 1: add roles via defaultDBValues script
      // const role = await ctx.db.query.role.findFirst({
      //   where: (role, { eq }) => eq(role.name, roles.chancellor),
      // });

      // if (!role) throw new Error(`The chancellor role was not found`);
      // const userSchoolRole = {
      //   user_id: ctx.session.user.id,
      //   school_id: newSchoolData?.id ?? "",
      //   role_id: role.id,
      // };

      await ctx.db.insert(user_school_role).values(userSchoolRole);

      // return new school
      return newSchool.insertId;
    }),
  getAll: protectedProcedure
    .input(z.object(getAllTypes))
    .query(async ({ ctx, input }) => {
      const schools = await ctx.db.query.school.findMany({
        limit: input.limit,
        offset: (input.skip ?? 0) * (input.limit ?? 1),
        orderBy: [asc(school.name)],
      });
      const newSchools: ({
        coverUrl: string;
        logoUrl: string;
      } & typeof school.$inferSelect)[] = [];
      console.log(schools);

      await Promise.all(
        schools.map(async (school) => {
          let coverUrl = "";
          let logoUrl = "";

          const setCoverAndLogo = async () => {
            if (school?.cover) {
              const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: school.cover,
              });
              coverUrl = await getSignedUrl(s3Client, command, {
                expiresIn: 60,
              });
            }
            if (school?.logo) {
              const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: school.logo,
              });
              logoUrl = await getSignedUrl(s3Client, command, {
                expiresIn: 60,
              });
            }
          };

          await setCoverAndLogo();
          newSchools.push({ coverUrl, logoUrl, ...school });
        }),
      );

      return newSchools;
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.school.findFirst({
        where: (school, { eq }) => eq(school.id, input.id),
      });
    }),
  // TODO: Not yet tested the presignedURL for cover and logo images if they work
  getByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      if (school) {
        let coverUrl = "";
        let logoUrl = "";

        const school = await ctx.db.query.school.findFirst({
          where: (school, { eq }) => eq(school.name, input.name),
        });

        const setCoverAndLogo = async () => {
          if (school?.cover) {
            const command = new GetObjectCommand({
              Bucket: bucketName,
              Key: school.cover,
            });
            coverUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
          }
          if (school?.logo) {
            const command = new GetObjectCommand({
              Bucket: bucketName,
              Key: school.logo,
            });
            logoUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
          }
        };

        await setCoverAndLogo();

        return { coverUrl: coverUrl, logoUrl: logoUrl, ...school };
      }

      return undefined;
    }),
  byNameExist: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(1);
      const school = await ctx.db.query.school.findFirst({
        columns: {id: true},
        where: (school, { eq }) => eq(school.name, input.name),
      });
      console.log(2);

      return { id: school?.id }
    }),

  // TODO: who exactly can update a schools information (chancellor, vice chancellor or those with specific permission)
  update: protectedProcedure
    .input(z.object(schoolOptionalType))
    .mutation(async ({ ctx, input }) => {
      const userSchoolRole = await ctx.db.query.user_school_role.findFirst({
        where: (usr, { eq }) => {
          return (
            eq(usr.user_id, ctx.session.user.id) && eq(usr.school_id, input.id)
          );
        },
        with: { user: true, role: true, school: true },
      });
      console.log(userSchoolRole);

      // TODO: ensure user is only able to delete a school if they are the chancellor

      // make changes

      // return school id
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // ensure user is authorized or permitted
      const userSchoolRole = await ctx.db.query.user_school_role.findFirst({
        where: (usr, { eq }) => {
          return (
            eq(usr.user_id, ctx.session.user.id) && eq(usr.school_id, input.id)
          );
        },
        with: { user: true, role: true, school: true },
      });
      console.log(userSchoolRole);

      // TODO: ensure user is only able to delete a school if they are the vice chancellor
      // if (userSchoolRole != undefined && userSchoolRole.role != roles.chancellor) throw new Error("You don't have the authority to delete this role");

      // TODO: done
      // delete
      // const deletedSchool = await ctx.db.delete(school).where(eq(school.id, input.id));
      // // return
      // return deletedSchool.insertId;
    }),
});
