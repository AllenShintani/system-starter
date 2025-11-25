import { z } from "zod";

/**
 * サインインリクエストのDTO
 */
export const signinRequestSchema = z.object({
  clerkUserId: z.string(),
});

export type SigninRequestDto = z.infer<typeof signinRequestSchema>;

/**
 * ユーザー情報のDTO
 */
export const userInfoSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  avatarUrl: z.string().nullable(),
});

export type UserInfoDto = z.infer<typeof userInfoSchema>;

/**
 * サインインレスポンスのDTO
 */
export const signinResponseSchema = z.object({
  success: z.boolean(),
  user: userInfoSchema,
  redirect: z.string(),
});

export type SigninResponseDto = z.infer<typeof signinResponseSchema>;

/**
 * ログアウトレスポンスのDTO
 */
export const logoutResponseSchema = z.object({
  success: z.boolean(),
  redirect: z.string(),
});

export type LogoutResponseDto = z.infer<typeof logoutResponseSchema>;

/**
 * 認証状態確認レスポンスのDTO
 */
export const checkAuthResponseSchema = z.object({
  authenticated: z.boolean(),
  user: userInfoSchema.nullable(),
  redirect: z.string().nullable(),
});

export type CheckAuthResponseDto = z.infer<typeof checkAuthResponseSchema>;

/**
 * OpenAPI用のスキーマ定義
 */
export const signinRequestOpenApi = {
  type: "object",
  properties: {
    clerkUserId: {
      type: "string",
      description: "Clerk user ID",
    },
  },
  required: ["clerkUserId"],
} as const;

export const userInfoOpenApi = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "User ID",
    },
    email: {
      type: "string",
      description: "User email",
    },
    name: {
      type: "string",
      description: "User name",
    },
    avatarUrl: {
      type: "string",
      nullable: true,
      description: "User avatar URL",
    },
  },
  required: ["id", "email", "name"],
} as const;

export const signinResponseOpenApi = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      description: "Success flag",
    },
    user: userInfoOpenApi,
    redirect: {
      type: "string",
      description: "Redirect URL",
    },
  },
  required: ["success", "user", "redirect"],
} as const;

export const logoutResponseOpenApi = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      description: "Success flag",
    },
    redirect: {
      type: "string",
      description: "Redirect URL",
    },
  },
  required: ["success", "redirect"],
} as const;

export const checkAuthResponseOpenApi = {
  type: "object",
  properties: {
    authenticated: {
      type: "boolean",
      description: "Authentication status",
    },
    user: {
      ...userInfoOpenApi,
      nullable: true,
    },
    redirect: {
      type: "string",
      nullable: true,
      description: "Redirect URL if not authenticated",
    },
  },
  required: ["authenticated"],
} as const;

