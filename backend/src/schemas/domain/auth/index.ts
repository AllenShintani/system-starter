import { z } from "zod";

export const jwtPayloadSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  avatarUrl: z.string().nullable(),
  iat: z.number().optional(),
  exp: z.number().optional(),
});

export const signinInputSchema = z.object({
  clerkUserId: z.string().min(1),
});

export const signinResponseSchema = z.object({
  success: z.literal(true),
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    avatarUrl: z.string().nullable(),
  }),
  redirect: z.string(),
});

export const authStateSchema = z.object({
  authenticated: z.boolean(),
  user: z
    .object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      avatarUrl: z.string().nullable(),
    })
    .nullable(),
  redirect: z.string().nullable(),
});

export const logoutResponseSchema = z.object({
  success: z.literal(true),
  redirect: z.string(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;
export type SigninInput = z.infer<typeof signinInputSchema>;
export type SigninResponse = z.infer<typeof signinResponseSchema>;
export type AuthState = z.infer<typeof authStateSchema>;
export type LogoutResponse = z.infer<typeof logoutResponseSchema>;
