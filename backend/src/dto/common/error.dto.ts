import { z } from "zod";

/**
 * エラーレスポンスのDTO
 */
export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  code: z.string().optional(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

/**
 * OpenAPI用のエラーレスポンス定義
 */
export const errorResponseOpenApi = {
  description: "Error response",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Error type",
          },
          message: {
            type: "string",
            description: "Error message",
          },
          code: {
            type: "string",
            description: "Error code",
          },
        },
        required: ["error"],
      },
    },
  },
} as const;

