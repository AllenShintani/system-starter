import z from "zod";

const fileSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
});

export const videoSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.number().int().positive(),
  videoFile: fileSchema.optional(),
  thumbnailFile: fileSchema.optional(),
  data: z
    .object({
      videoUrl: z.string().url(),
      thumbnailUrl: z.string().url(),
      authorId: z.string(),
    })
    .optional(),
});
