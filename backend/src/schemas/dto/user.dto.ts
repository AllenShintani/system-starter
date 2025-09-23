import { z } from "zod";

import { userProfileUpdateSchema, userPublicSchema } from "../domain/user";
import { fileUploadRequestSchema, signedUploadSchema } from "../infrastructure/s3.schemas";

export const userUpdateInputSchema = userProfileUpdateSchema.extend({
  profilePicture: fileUploadRequestSchema.optional(),
});

export const userUpdateResponseSchema = z.object({
  success: z.boolean(),
  user: userPublicSchema,
  signedUrl: signedUploadSchema.shape.signedUrl.optional(),
  profilePictureUrl: signedUploadSchema.shape.url.optional(),
});

export type UserUpdateInput = z.infer<typeof userUpdateInputSchema>;
export type UserUpdateResponse = z.infer<typeof userUpdateResponseSchema>;
