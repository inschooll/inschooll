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
  name: z.string().min(1, 'Name is required'),
  acronym: z.string().min(1, 'Acronym is required'),
  motto: z.string().min(1, 'Motto is required'),
  about: z.string().min(1, 'About is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  address: z.string().min(1, 'Address is required'),
  email: z.string().min(1, 'Email is required'),
  phone1: z.string().min(1, 'Phone1 is required'),
  phone2: z.string().optional(),
  phone3: z.string().optional(),
  website: z.string().min(1, 'Website is required'),
  facebook: z.string().min(1, 'Facebook is required'),
  twitter: z.string().min(1, 'Twitter is required'),
  instagram: z.string().min(1, 'Instagram is required'),
});
export type TSchoolSchema = z.infer<typeof SchoolSchema>

export const FacultySchema = z.object({
  name: z.string().min(1, "Faculty name is required"),
  code: z.string().optional(),
  dean: z.string().min(1, "Dean is required"),
  establishedAt: z.string().min(1, "Established at date is required"),
  location: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  website: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  isAccredited: z.boolean().default(false),
  lastAccreditation: z.string().optional(),
});
export type TFacultySchema = z.infer<typeof FacultySchema>;

export const DepartmentSchema = z.object({
  name: z.string().min(1, "Faculty name is required"),
  code: z.string().optional(),
  hod: z.string().optional(),
  faculty: z.string().min(1, "Faculty is required"),
  establishedAt: z.string().min(1, "Established at date is required"),
  building: z.string().min(1, "Building is required"),
  description: z.string().min(1, "Description is required"),
  website: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  isAccredited: z.boolean().default(false),
  lastAccredited: z.string().optional(),
});
export type TDepartmentSchema = z.infer<typeof DepartmentSchema>;