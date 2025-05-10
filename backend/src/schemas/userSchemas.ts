import { z } from 'zod'

const baseUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  userName: z
    .string()
    .min(1, 'Username is required')
    .max(20, 'Username must be less than 20 characters')
    .optional(),
})

export const userSchema = {
  req: baseUserSchema,
}

// フロントエンドからバックエンドに送信するデータ用のスキーマ
const signupBaseSchema = z.object({
  email: z.string().email('Invalid email address'),
  userName: z
    .string()
    .min(1, 'Username is required')
    .max(20, 'Username must be less than 20 characters')
    .optional(),
  firebaseUid: z.string().min(1, 'Firebase UID is required'),
})

export const signupInputSchema = {
  req: signupBaseSchema,
}

export const createUserSchema = {
  req: z.object({
    token: z.string().min(1, 'Token is required'),
    userData: z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      userName: z
        .string()
        .min(1, 'Username is required')
        .max(20, 'Username must be less than 20 characters')
        .optional(),
    }),
  }),
}

export const signInSchema = {
  req: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    token: z.string().min(1, 'Token is required'),
  }),
}

export const googleUserSchema = {
  req: z.object({
    email: z.string().email('Invalid email address'),
    userName: z.string().min(1, 'Username is required'),
    firebaseToken: z.string().min(1, 'Firebase token is required'),
  }),
}

export const updateUserSchema = {
  req: z.object({
    userName: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    address: z.string().optional(),
    dateOfBirth: z.string().optional(),
    profilePicture: z
      .object({
        fileName: z.string(),
        fileType: z.string(),
      })
      .optional(),
  }),
}

export const userResponseSchema = {
  res: z.object({
    id: z.string().uuid(),
    role: z.string(),
    email: z.string().email().nullable(),
    userName: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    profilePicture: z.string().nullable(),
    address: z.string().nullable(),
    dateOfBirth: z.string().nullable(),
    isVerified: z.boolean(),
  }),
}

export const updateResponseSchema = z.object({
  success: z.boolean(),
  user: userResponseSchema.res,
  signedUrl: z.string().optional(),
  profilePictureUrl: z.string().optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema.req>
export type UpdateUserInput = z.infer<typeof updateUserSchema.req>
export type SignInInput = z.infer<typeof signInSchema.req>
export type GoogleUserInput = z.infer<typeof googleUserSchema.req>
export type UserInput = z.infer<typeof userSchema.req>
export type SignupInput = z.infer<typeof signupInputSchema.req>

export type UserResponse = z.infer<typeof userResponseSchema.res>
export type UpdateResponse = z.infer<typeof updateResponseSchema>
