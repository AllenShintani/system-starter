import { z } from "zod";

export const userUpdateSchema = z.object({
  userName: z.string().optional(),
  profilePicture: z
    .object({
      fileName: z.string(),
      fileType: z.string(),
    })
    .optional(),
});
