import sgMail from "@sendgrid/mail";
import constants from "../core/constants/constants";
import { env } from "~/env.js";

sgMail.setApiKey(env.SENDGRID_API_KEY);

interface mailMsgProp { to: string | string[]; subject: string, html: string; };

export function mailMsg({ to, subject, html }: mailMsgProp) {
  return {
    to,
    from: {
      name: constants.appName,
      email: env.SENDGRID_EMAIL,
    },
    subject,
    html,    
  };
}
