import z from 'zod';
import constants from '~/app/core/constants/constants';

export const LoginSchema = z.object({
  emailOrUsername: z.string().min(1, "Please enter a valid email or username"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});
export type TLoginSchema = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  firstName: z.string().min(1, 'Please enter your first name'),
  lastName: z.string().min(1, 'Please enter your last name'),
  username: z.string().min(1, 'Please enter your username').max(30, 'Username is too long'),
  email: z.string().email('Please enter your email address'),
  nationality: z.string().min(1, 'Please enter your nationality'),
  stateOfOrigin: z.string().min(1, 'Please enter your state of origin'),   // if set to 'all' it means there is no state for the country
  password: z.string().min(6, 'Please enter a password minimum of 6 characters long'),
  confirmPassword: z.string(),
  phoneNumber: z.string().min(1, 'Please enter your phone number'),
  gender: z.string(),
  dob_day: z.number(),
  dob_month: z.enum(constants.months), // as monthsType
  dob_year: z.number(),
}).refine(schema => schema.password === schema.confirmPassword, {
  message: "Passwords must match",
  path: ['confirmPassword'],
});
export type TSignupSchema = z.infer<typeof SignupSchema>;
