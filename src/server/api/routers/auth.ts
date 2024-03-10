import { TRPCClientError } from "@trpc/client";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { z } from "zod";
import constants from "~/lib/constants/constants";
import errorMessages from "~/lib/constants/error-messages";
import { env } from "~/env.js";
import * as schema from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export async function generateJwtToken({
  payload,
  jwtExpiration,
}: {
  payload: { userId: string } & Record<string, string | boolean>;
  jwtExpiration?: number | string;
}) {
  const authToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(jwtExpiration ?? "24h")
    .setIssuedAt()
    .setJti(nanoid())
    .sign(new TextEncoder().encode(env.SECRET_KEY));

  if (!authToken) throw new Error();

  return authToken;
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt: string = await bcrypt.genSalt();
  const hashedPassword: string = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        username: z.string().optional(),
        email: z.string().optional(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { username, email, password } = input;
      if (!username && !email)
        throw new TRPCClientError(errorMessages.usernameOrEmailRequired);

      let user: typeof schema.user.$inferSelect | undefined;

      if (username) {
        user = await ctx.db.query.user.findFirst({
          where: (table, { eq }) => eq(table.username, username),
        });
      } else {
        user = await ctx.db.query.user.findFirst({
          where: (table, { eq }) => eq(table.email, email!),
        });
      }

      if (!user) {
        throw new TRPCClientError(
          email
            ? errorMessages.emailNotRegistered
            : errorMessages.usernameDoesNotExist,
        );
      }

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches)
        throw new TRPCClientError(errorMessages.incorrectPassword);

      const authToken = await generateJwtToken({
        payload: { userId: user.id },
      });

      return { authToken };
    }),
  signup: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        email: z.string(),
        nationality: z.string(),
        stateOfOrigin: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
        phoneNumber: z.string(),
        gender: z.string(),
        dob_day: z.number(),
        dob_month: z.string(),
        dob_year: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // hash password
      const hashedPassword = await hashPassword(input.password);
      console.log(
        `Nationality: ${input.nationality}\nState of Origin: ${input.stateOfOrigin}`,
      );

      const country = await ctx.db.query.country.findFirst({
        columns: { id: true },
        where: (table, {}) => eq(table.name, input.nationality),
      });
      console.log(`country found: ${country?.id}`);
      if (!country)
        throw new TRPCClientError(`Country ${errorMessages.notFound}`);

      let state: { id: string } | undefined;

      // get state
      if (input.stateOfOrigin.toLowerCase() !== "all") {
        state = await ctx.db.query.state.findFirst({
          columns: { id: true },
          where: (table, { eq, and }) =>
            and(
              eq(table.country_id, country.id),
              eq(table.name, input.stateOfOrigin),
            ),
        });
        if (!state)
          throw new TRPCClientError(`State ${errorMessages.notFound}`);
      }

      console.log(`Found State: ${state?.id} | Found country: ${country.id}`);

      // prepare form data;
      const userId = randomUUID();
      const body: typeof schema.user.$inferInsert = {
        id: userId,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        username: input.username,
        password: hashedPassword,
        gender: input.gender.toLowerCase() === "male" ? "male" : "female",
        dateOfBirth: `${constants.months.indexOf(input.dob_month) + 1}-${
          input.dob_day
        }-${input.dob_year}`,
        phone1: input.phoneNumber,
        country_id: country?.id,
        state_id: state?.id,
      };

      // create user
      console.log("Insert into db users table ... 🔃");
      await ctx.db.insert(schema.user).values(body);
      console.log("Insertion completed ... 🔃✅");

      // generate jwt token as response
      const authToken = await generateJwtToken({ payload: { userId } });
      console.log(`authToken: ${authToken}`);

      // return token
      return { authToken };
    }),
});
