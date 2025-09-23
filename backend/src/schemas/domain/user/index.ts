import { z } from "zod";

import { UserSchema } from "../../../generated/zod";

export const userBaseSchema = UserSchema;

export const userPublicSchema = userBaseSchema.pick({
  id: true,
  userName: true,
  email: true,
  profilePicture: true,
});

export const userProfileUpdateSchema = z.object({
  userName: z.string().optional(),
});

export type UserBase = z.infer<typeof userBaseSchema>;
export type UserPublic = z.infer<typeof userPublicSchema>;
export type UserProfileUpdate = z.infer<typeof userProfileUpdateSchema>;
