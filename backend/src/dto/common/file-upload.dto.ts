import { z } from "zod";

/**
 * ファイルアップロード用のDTO
 */
export const fileUploadSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
});

export type FileUploadDto = z.infer<typeof fileUploadSchema>;

/**
 * OpenAPI用のファイルアップロード定義
 */
export const fileUploadOpenApi = {
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
} as const;

