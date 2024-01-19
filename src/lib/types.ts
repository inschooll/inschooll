import z from 'zod';

export const LoginSchema = z.object({
  emailOrUsername: z.string().min(1, "Please enter a valid email or username"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});
export type TLoginSchema = z.infer<typeof LoginSchema>;