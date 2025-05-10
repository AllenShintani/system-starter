import { t } from "../utils/createContext";
import { z } from "zod";
import { verifyAuth } from "../utils/verifyAuth";
import { TRPCError } from "@trpc/server";
import { generateThumbnailUpload } from "../utils/s3/generateFileUpload";

export const storageRouter = t.router({
  getPresignedUrl: t.procedure
    .input(
      z.object({
        fileName: z.string(),
        fileType: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        verifyAuth(ctx);
        return await generateThumbnailUpload(input.fileName, input.fileType);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate presigned URL",
          cause: error,
        });
      }
    }),
});
