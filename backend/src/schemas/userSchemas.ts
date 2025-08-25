import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  fullName: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profilePicture: z
    .object({
      fileName: z.string(),
      fileType: z.string(),
    })
    .optional(),
});

export type SigninInput = z.infer<typeof signinSchema>;
