import { z } from "zod";

export const fileUploadRequestSchema = z.object({
  fileName: z.string().min(1, "fileName is required"),
  fileType: z.string().min(1, "fileType is required"),
});

export const signedUploadSchema = z.object({
  url: z.string().url(),
  signedUrl: z.string().url(),
});

export type FileUploadRequest = z.infer<typeof fileUploadRequestSchema>;
export type SignedUpload = z.infer<typeof signedUploadSchema>;
