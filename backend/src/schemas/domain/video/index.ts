import { z } from "zod";

import { VideoSchema } from "../../../generated/zod";

export const videoBaseSchema = VideoSchema;

export const videoIdSchema = z.string().min(1, "video id is required");

export const videoEditableSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.number().int().positive(),
});

export type VideoBase = z.infer<typeof videoBaseSchema>;
export type VideoId = z.infer<typeof videoIdSchema>;
export type VideoEditable = z.infer<typeof videoEditableSchema>;
