import { z } from "zod";

import { fileUploadSchema, type FileUploadDto } from "../common/file-upload.dto";

/**
 * ビデオ情報のDTO
 */
export const videoDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  videoUrl: z.string(),
  thumbnailUrl: z.string(),
  duration: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
  authorId: z.string(),
});

export type VideoDto = z.infer<typeof videoDtoSchema>;

/**
 * ビデオ一覧取得レスポンスのDTO
 */
export const getVideosResponseSchema = z.array(videoDtoSchema);

export type GetVideosResponseDto = z.infer<typeof getVideosResponseSchema>;

/**
 * ビデオ詳細取得レスポンスのDTO
 */
export const getVideoResponseSchema = videoDtoSchema;

export type GetVideoResponseDto = z.infer<typeof getVideoResponseSchema>;

/**
 * ビデオ作成/更新リクエストのDTO
 */
export const createVideoRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.number().int().positive(),
  videoFile: fileUploadSchema.optional(),
  thumbnailFile: fileUploadSchema.optional(),
});

export type CreateVideoRequestDto = z.infer<typeof createVideoRequestSchema>;

/**
 * ビデオ更新リクエストのDTO（IDを含む）
 */
export const updateVideoRequestSchema = createVideoRequestSchema.extend({
  id: z.string(),
});

export type UpdateVideoRequestDto = z.infer<typeof updateVideoRequestSchema>;

/**
 * ビデオ作成/更新レスポンスのDTO
 */
export const createVideoResponseSchema = z.object({
  success: z.boolean(),
  video: videoDtoSchema,
  videoSignedUrl: z.string().optional(),
  thumbnailSignedUrl: z.string().optional(),
});

export type CreateVideoResponseDto = z.infer<typeof createVideoResponseSchema>;

/**
 * ビデオ更新レスポンスのDTO
 */
export const updateVideoResponseSchema = createVideoResponseSchema;

export type UpdateVideoResponseDto = z.infer<typeof updateVideoResponseSchema>;

/**
 * OpenAPI用のスキーマ定義
 */
export const videoDtoOpenApi = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "Video ID",
    },
    title: {
      type: "string",
      description: "Video title",
    },
    description: {
      type: "string",
      description: "Video description",
    },
    videoUrl: {
      type: "string",
      description: "Video file URL",
    },
    thumbnailUrl: {
      type: "string",
      description: "Thumbnail image URL",
    },
    duration: {
      type: "integer",
      minimum: 1,
      description: "Video duration in minutes",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "Creation timestamp",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      description: "Last update timestamp",
    },
    authorId: {
      type: "string",
      description: "Author user ID",
    },
  },
  required: ["id", "title", "description", "videoUrl", "thumbnailUrl", "duration", "authorId"],
} as const;

export const createVideoRequestOpenApi = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Video title",
    },
    description: {
      type: "string",
      description: "Video description",
    },
    duration: {
      type: "integer",
      minimum: 1,
      description: "Video duration in minutes",
    },
    videoFile: {
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
      description: "Video file upload information",
    },
    thumbnailFile: {
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
      description: "Thumbnail file upload information",
    },
  },
  required: ["title", "description", "duration"],
} as const;

export const updateVideoRequestOpenApi = {
  ...createVideoRequestOpenApi,
  properties: {
    ...createVideoRequestOpenApi.properties,
    id: {
      type: "string",
      description: "Video ID",
    },
  },
  required: [...createVideoRequestOpenApi.required, "id"],
} as const;

export const createVideoResponseOpenApi = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      description: "Success flag",
    },
    video: videoDtoOpenApi,
    videoSignedUrl: {
      type: "string",
      description: "S3 signed URL for video file upload",
    },
    thumbnailSignedUrl: {
      type: "string",
      description: "S3 signed URL for thumbnail file upload",
    },
  },
  required: ["success", "video"],
} as const;

export const updateVideoResponseOpenApi = createVideoResponseOpenApi;

