import { z } from "zod";

import { fileUploadSchema, type FileUploadDto } from "../common/file-upload.dto";

/**
 * ユーザー情報のDTO
 */
export const userDtoSchema = z.object({
  id: z.string(),
  userName: z.string(),
  email: z.string(),
  profilePicture: z.string().nullable(),
});

export type UserDto = z.infer<typeof userDtoSchema>;

/**
 * ユーザー情報取得レスポンスのDTO
 */
export const getUserResponseSchema = userDtoSchema;

export type GetUserResponseDto = z.infer<typeof getUserResponseSchema>;

/**
 * ユーザー情報更新リクエストのDTO
 */
export const updateUserRequestSchema = z.object({
  userName: z.string().optional(),
  profilePicture: fileUploadSchema.optional(),
});

export type UpdateUserRequestDto = z.infer<typeof updateUserRequestSchema>;

/**
 * ユーザー情報更新レスポンスのDTO
 */
export const updateUserResponseSchema = z.object({
  success: z.boolean(),
  user: userDtoSchema,
  signedUrl: z.string().optional(),
  profilePictureUrl: z.string().optional(),
});

export type UpdateUserResponseDto = z.infer<typeof updateUserResponseSchema>;

/**
 * OpenAPI用のスキーマ定義
 */
export const userDtoOpenApi = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "User ID",
    },
    userName: {
      type: "string",
      description: "User name",
    },
    email: {
      type: "string",
      description: "User email",
    },
    profilePicture: {
      type: "string",
      nullable: true,
      description: "Profile picture URL",
    },
  },
  required: ["id", "userName", "email"],
} as const;

export const updateUserRequestOpenApi = {
  type: "object",
  properties: {
    userName: {
      type: "string",
      description: "User name",
    },
    profilePicture: {
      type: "object",
      properties: {
        fileName: {
          type: "string",
          description: "File name",
        },
        fileType: {
          type: "string",
          description: "MIME type of the file",
        },
      },
      required: ["fileName", "fileType"],
      description: "Profile picture file upload information",
    },
  },
} as const;

export const updateUserResponseOpenApi = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      description: "Success flag",
    },
    user: userDtoOpenApi,
    signedUrl: {
      type: "string",
      description: "S3 signed URL for file upload",
    },
    profilePictureUrl: {
      type: "string",
      description: "Profile picture URL after upload",
    },
  },
  required: ["success", "user"],
} as const;

