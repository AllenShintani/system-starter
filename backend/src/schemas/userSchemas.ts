import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  userName: z.string(),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userUpdateSchema = z.object({
  userName: z.string().optional(),
  profilePicture: z
    .object({
      fileName: z.string(),
      fileType: z.string(),
    })
    .optional(),
});

export type SigninInput = z.infer<typeof signinSchema>;
