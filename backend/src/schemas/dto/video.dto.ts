import { z } from "zod";

import { videoBaseSchema, videoEditableSchema, videoIdSchema } from "../domain/video";
import { fileUploadRequestSchema, signedUploadSchema } from "../infrastructure/s3.schemas";

const uploadPayloadSchema = z.object({
  videoFile: fileUploadRequestSchema.optional(),
  thumbnailFile: fileUploadRequestSchema.optional(),
});

export const videoCreateInputSchema = videoEditableSchema.merge(uploadPayloadSchema);

export const videoUpdateInputSchema = videoEditableSchema.merge(uploadPayloadSchema).extend({
  id: videoIdSchema,
});

export const videoMutationResponseSchema = z.object({
  success: z.literal(true),
  video: videoBaseSchema,
  videoSignedUrl: signedUploadSchema.shape.signedUrl.optional(),
  thumbnailSignedUrl: signedUploadSchema.shape.signedUrl.optional(),
});

export const videoListResponseSchema = z.array(videoBaseSchema);

export type VideoCreateInput = z.infer<typeof videoCreateInputSchema>;
export type VideoUpdateInput = z.infer<typeof videoUpdateInputSchema>;
export type VideoMutationResponse = z.infer<typeof videoMutationResponseSchema>;
