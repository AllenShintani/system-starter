import { TRPCError } from "@trpc/server";
import { prisma } from "../../prisma/client";
import z from "zod";
import { videoSchema } from "../schemas/video";
import { t } from "../utils/createContext";
import { generateFileUpload } from "../utils/s3/generateFileUpload";
import { verifyAuth } from "../utils/verifyAuth";

export const videoRouter = t.router({
  getAllVideoes: t.procedure.query(async ({ ctx }) => {
    try {
      verifyAuth(ctx);
      const videoes = await prisma.video.findMany();
      return videoes;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "ビデオ一覧の取得に失敗しました",
      });
    }
  }),

  getVideo: t.procedure
    .input(z.string())
    .query(async ({ input: videoId, ctx }) => {
      try {
        verifyAuth(ctx);
        const video = await prisma.video.findUnique({
          where: { id: videoId },
        });
        return video;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "ビデオ情報の取得に失敗しました",
        });
      }
    }),

  putVideo: t.procedure
    .input(videoSchema.extend({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const decoded = verifyAuth(ctx);

        const videoUploadData = input.videoFile
          ? await generateFileUpload(input.videoFile, input.id, "video")
          : undefined;

        const thumbnailUploadData = input.thumbnailFile
          ? await generateFileUpload(input.thumbnailFile, input.id, "thumbnail")
          : undefined;

        const updatedVideo = await prisma.video.update({
          where: { id: input.id },
          data: {
            title: input.title,
            description: input.description,
            duration: input.duration,
            videoUrl: videoUploadData?.url,
            thumbnailUrl: thumbnailUploadData?.url,
            authorId: decoded.userId,
          },
        });

        return {
          success: true,
          video: updatedVideo,
          videoSignedUrl: videoUploadData?.signedUrl,
          thumbnailSignedUrl: thumbnailUploadData?.signedUrl,
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "ビデオ情報の更新に失敗しました",
        });
      }
    }),

  postVideo: t.procedure.input(videoSchema).mutation(async ({ input, ctx }) => {
    try {
      const decoded = verifyAuth(ctx);

      const newVideo = await prisma.video.create({
        data: {
          title: input.title,
          description: input.description,
          duration: input.duration,
          authorId: decoded.userId,
          videoUrl: "",
          thumbnailUrl: "",
        },
      });

      const videoUploadData = input.videoFile
        ? await generateFileUpload(input.videoFile, newVideo.id, "video")
        : undefined;

      const thumbnailUploadData = input.thumbnailFile
        ? await generateFileUpload(
            input.thumbnailFile,
            newVideo.id,
            "thumbnail"
          )
        : undefined;

      if (videoUploadData?.url || thumbnailUploadData?.url) {
        await prisma.video.update({
          where: { id: newVideo.id },
          data: {
            videoUrl: videoUploadData?.url ?? newVideo.videoUrl,
            thumbnailUrl: thumbnailUploadData?.url ?? newVideo.thumbnailUrl,
          },
        });
      }

      return {
        success: true,
        video: newVideo,
        videoSignedUrl: videoUploadData?.signedUrl,
        thumbnailSignedUrl: thumbnailUploadData?.signedUrl,
      };
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "ビデオの作成に失敗しました",
      });
    }
  }),
});
