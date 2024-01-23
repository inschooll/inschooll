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


export const SchoolSchema = z.object({
  coverKey: z.string().optional(), 
  logoKey: z.string().optional(),
  name: z.string().min(1, 'name is required'),
  acronym: z.string().min(1, 'acronym is required'),
  motto: z.string().min(1, 'motto is required'),
  about: z.string().min(1, 'about is required'),
  country: z.string().min(1, 'country is required'),
  state: z.string().min(1, 'state is required'),
  address: z.string().min(1, 'address is required'),
  email: z.string().min(1, 'email is required'),
  phone1: z.string().min(1, 'phone1 is required'),
  phone2: z.string().optional(),
  phone3: z.string().optional(),
  website: z.string().min(1, 'website is required'),
  facebook: z.string().min(1, 'facebook is required'),
  twitter: z.string().min(1, 'twitter is required'),
  instagram: z.string().min(1, 'instagram is required'),
});
export type TSchoolSchema = z.infer<typeof SchoolSchema>