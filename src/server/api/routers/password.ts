import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { headers } from "next/headers";
import sgMail from "@sendgrid/mail";
import { mailMsg } from "~/app/utils/sendgrid";
import mailTemplates from "~/app/core/constants/mail-templates";
import { TRPCClientError } from "@trpc/client";
import errorMessages from "~/app/core/constants/error-messages";
import { generateJwtToken, hashPassword } from "./auth";
import { env } from "~/env.js";
import links from "~/app/core/constants/links";
import { jwtVerify } from "jose";
import * as schema from "~/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';

export const passwordRouter = createTRPCRouter({
  sendResetPasswordLinkToEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      // ensure user with email exists
      const user = await ctx.db.query.user.findFirst({
        columns: { id: true },
        where: (table, { eq }) => eq(table.email, input.email),
      });
      if (!user) throw new TRPCClientError(errorMessages.emailNotRegistered);

      // generate reset password token
      const resetPasswordToken = await generateJwtToken({
        payload: { userId: user.id, resetPassword: true },
        jwtExpiration: "1h",
      });
      // append reset password token to reset-password url
      const resetPasswordLink = `${headers().get("host")}${
        links.resetPassword
      }?reset_password_token=${resetPasswordToken}`;

      // send to users email
      console.log(resetPasswordLink)
      await sgMail.send(
        mailMsg({
          to: input.email,
          subject: "Reset your password",
          html: mailTemplates.resetPasswordHtml({
            email: input.email,
            changePasswordLink: resetPasswordLink,
          }),
        }),
      );
      // successful
      return { msg: "success" };
    }),
  decodeResetPasswordToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      try {
        const {payload} = await jwtVerify(
          input.token,
          new TextEncoder().encode(env.SECRET_KEY),
        );
        return { ...(payload), userId: payload.userId as string, resetPassword: payload.resetPassword as boolean};
      } catch (error) {
        console.log(error);
        return;
      }
    }),
  resetPassword: publicProcedure.input(z.object({password: z.string(), userId: z.string()})).mutation(async ({ctx, input}) => {
    // ensure password is not the same with the current password
    const user = await ctx.db.query.user.findFirst({
      where: (table, {eq}) => eq(table.id, input.userId)
    });
    if (!user) throw new TRPCClientError(errorMessages.userDoesNotExist);
    
    const passwordMatches = await bcrypt.compare(input.password, user.password);
    if (passwordMatches)
    throw new TRPCClientError(errorMessages.passwordNewSameAsCurrent);
  
  // hashPassword
    const hashedPassword = await hashPassword(input.password);
    
    // update users password
    await ctx.db.update(schema.user).set({password: hashedPassword}).where(eq(schema.user.id, input.userId));

    return { email: user.email};
  }),
  // TODO: Implement this procedure
  changePassword: publicProcedure
    .input(z.object({ oldPassword: z.string(), newPassword: z.string() }))
    .mutation(({ ctx, input }) => {
      console.log(ctx, input);
      return { msg: "success" };
    }),
});
