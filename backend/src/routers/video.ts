import { TRPCError } from "@trpc/server";

import { prisma } from "../../prisma/client";
import {
  videoCreateInputSchema,
  videoIdSchema,
  videoListResponseSchema,
  videoMutationResponseSchema,
  videoUpdateInputSchema,
} from "../schemas";
import { t } from "../utils/createContext";
import { generateFileUpload } from "../utils/s3/generateFileUpload";
import { verifyAuth } from "../utils/verifyAuth";
import {
  createVideo as createVideoUsecase,
  getVideoById as getVideoByIdUsecase,
  listVideos as listVideosUsecase,
  updateVideo as updateVideoUsecase,
} from "../features/video/domain/usecases/video";
import type { VideoPorts, VideoStoragePorts } from "../features/video/domain/ports/video";

const videoPorts: VideoPorts = {
  list: () => prisma.video.findMany(),
  findById: (id) =>
    prisma.video.findUnique({
      where: { id },
    }),
  create: (data) =>
    prisma.video.create({
      data,
    }),
  update: (id, data) =>
    prisma.video.update({
      where: { id },
      data,
    }),
};

const videoStoragePorts: VideoStoragePorts = {
  createUpload: (file, videoId, target) => generateFileUpload(file, videoId, target),
};

export const videoRouter = t.router({
  getAllVideoes: t.procedure.query(async ({ ctx }) => {
    try {
      verifyAuth(ctx);
      const videos = await listVideosUsecase(videoPorts);
      return videoListResponseSchema.parse(videos);
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "ビデオ一覧の取得に失敗しました",
      });
    }
  }),

  getVideo: t.procedure.input(videoIdSchema).query(async ({ input: videoId, ctx }) => {
    try {
      verifyAuth(ctx);
      const video = await getVideoByIdUsecase(videoPorts, videoId);
      if (!video) return null;
      return videoMutationResponseSchema.shape.video.parse(video);
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "ビデオ情報の取得に失敗しました",
      });
    }
  }),

  putVideo: t.procedure.input(videoUpdateInputSchema).mutation(async ({ input, ctx }) => {
    try {
      const { userId } = verifyAuth(ctx);
      const result = await updateVideoUsecase(videoPorts, videoStoragePorts, userId, input);
      return videoMutationResponseSchema.parse({
        success: true,
        video: result.video,
        videoSignedUrl: result.videoUpload?.signedUrl,
        thumbnailSignedUrl: result.thumbnailUpload?.signedUrl,
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "ビデオ情報の更新に失敗しました",
      });
    }
  }),

  postVideo: t.procedure.input(videoCreateInputSchema).mutation(async ({ input, ctx }) => {
    try {
      const { userId } = verifyAuth(ctx);
      const result = await createVideoUsecase(videoPorts, videoStoragePorts, userId, input);
      return videoMutationResponseSchema.parse({
        success: true,
        video: result.video,
        videoSignedUrl: result.videoUpload?.signedUrl,
        thumbnailSignedUrl: result.thumbnailUpload?.signedUrl,
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "ビデオの作成に失敗しました",
      });
    }
  }),
});
