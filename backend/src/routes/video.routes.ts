import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { JwtPayload } from "@/types/jwt";

import {
  videoDtoSchema,
  getVideosResponseSchema,
  getVideoResponseSchema,
  createVideoRequestSchema,
  createVideoResponseSchema,
  updateVideoRequestSchema,
  updateVideoResponseSchema,
  type CreateVideoRequestDto,
  type UpdateVideoRequestDto,
} from "@/dto/video";
import { authenticate } from "@/middleware/auth.middleware";
import { prisma } from "@/prisma/client";
import { generateFileUpload } from "@/utils/s3/generateFileUpload";
import { sendErrorResponse } from "@/utils/errorHandler";
import { zodToFastifySchema } from "@/utils/zod-to-json-schema";

/**
 * ビデオ一覧取得ルート
 * GET /api/videos
 */
const getVideosHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    await authenticate(request, reply);

    const videos = await prisma.video.findMany();
    const response = getVideosResponseSchema.parse(videos);
    reply.code(200).send(response);
  } catch (error) {
    console.error(error);
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Invalid token")) {
      return; // authenticate が既にエラーレスポンスを送信済み
    }
    sendErrorResponse(reply, error instanceof Error ? error : new Error("ビデオ一覧の取得に失敗しました"));
  }
};

/**
 * ビデオ詳細取得ルート
 * GET /api/videos/:id
 */
const getVideoHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    await authenticate(request, reply);

    const { id } = request.params;
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      reply.code(404).send({
        error: "NOT_FOUND",
        message: "ビデオが見つかりません",
      });
      return;
    }

    const response = getVideoResponseSchema.parse(video);
    reply.code(200).send(response);
  } catch (error) {
    console.error(error);
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Invalid token")) {
      return; // authenticate が既にエラーレスポンスを送信済み
    }
    sendErrorResponse(reply, error instanceof Error ? error : new Error("ビデオ情報の取得に失敗しました"));
  }
};

/**
 * ビデオ作成ルート
 * POST /api/videos
 */
const createVideoHandler = async (
  request: FastifyRequest<{ Body: CreateVideoRequestDto }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const decoded = await authenticate(request, reply);

    const newVideo = await prisma.video.create({
      data: {
        title: request.body.title,
        description: request.body.description,
        duration: request.body.duration,
        authorId: decoded.userId,
        videoUrl: "",
        thumbnailUrl: "",
      },
    });

    const videoUploadData = request.body.videoFile
      ? await generateFileUpload(request.body.videoFile, newVideo.id, "video")
      : undefined;

    const thumbnailUploadData = request.body.thumbnailFile
      ? await generateFileUpload(request.body.thumbnailFile, newVideo.id, "thumbnail")
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

    // 更新後のビデオ情報を取得
    const updatedVideo = await prisma.video.findUnique({
      where: { id: newVideo.id },
    });

    if (!updatedVideo) {
      reply.code(500).send({
        error: "INTERNAL_SERVER_ERROR",
        message: "ビデオの作成に失敗しました",
      });
      return;
    }

    const responseData: {
      success: boolean;
      video: typeof updatedVideo;
      videoSignedUrl?: string;
      thumbnailSignedUrl?: string;
    } = {
      success: true,
      video: updatedVideo,
    };

    if (videoUploadData) {
      responseData.videoSignedUrl = videoUploadData.signedUrl;
    }
    if (thumbnailUploadData) {
      responseData.thumbnailSignedUrl = thumbnailUploadData.signedUrl;
    }

    const response = createVideoResponseSchema.parse(responseData);
    reply.code(201).send(response);
  } catch (error) {
    console.error(error);
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Invalid token")) {
      return; // authenticate が既にエラーレスポンスを送信済み
    }
    sendErrorResponse(reply, error instanceof Error ? error : new Error("ビデオの作成に失敗しました"));
  }
};

/**
 * ビデオ更新ルート
 * PUT /api/videos/:id
 */
const updateVideoHandler = async (
  request: FastifyRequest<{ Params: { id: string }; Body: Omit<UpdateVideoRequestDto, "id"> }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const decoded = await authenticate(request, reply);
    const { id } = request.params;

    const videoUploadData = request.body.videoFile
      ? await generateFileUpload(request.body.videoFile, id, "video")
      : undefined;

    const thumbnailUploadData = request.body.thumbnailFile
      ? await generateFileUpload(request.body.thumbnailFile, id, "thumbnail")
      : undefined;

    const updatedVideo = await prisma.video.update({
      where: { id },
      data: {
        title: request.body.title,
        description: request.body.description,
        duration: request.body.duration,
        videoUrl: videoUploadData?.url,
        thumbnailUrl: thumbnailUploadData?.url,
        authorId: decoded.userId,
      },
    });

    const responseData: {
      success: boolean;
      video: typeof updatedVideo;
      videoSignedUrl?: string;
      thumbnailSignedUrl?: string;
    } = {
      success: true,
      video: updatedVideo,
    };

    if (videoUploadData) {
      responseData.videoSignedUrl = videoUploadData.signedUrl;
    }
    if (thumbnailUploadData) {
      responseData.thumbnailSignedUrl = thumbnailUploadData.signedUrl;
    }

    const response = updateVideoResponseSchema.parse(responseData);
    reply.code(200).send(response);
  } catch (error) {
    console.error(error);
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Invalid token")) {
      return; // authenticate が既にエラーレスポンスを送信済み
    }
    sendErrorResponse(reply, error instanceof Error ? error : new Error("ビデオ情報の更新に失敗しました"));
  }
};

/**
 * Videoルートを登録
 */
export const registerVideoRoutes = (server: FastifyInstance): void => {
  // GET /api/videos
  server.get(
    "/api/videos",
    {
      schema: {
        operationId: "getVideos",
        description: "ビデオ一覧を取得",
        tags: ["video"],
        response: {
          200: zodToFastifySchema(getVideosResponseSchema),
          401: {
            type: "object",
            properties: {
              error: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    getVideosHandler
  );

  // GET /api/videos/:id
  server.get(
    "/api/videos/:id",
    {
      schema: {
        operationId: "getVideoById",
        description: "ビデオ詳細を取得",
        tags: ["video"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Video ID",
            },
          },
          required: ["id"],
        },
        response: {
          200: zodToFastifySchema(getVideoResponseSchema),
          401: {
            type: "object",
            properties: {
              error: { type: "string" },
              message: { type: "string" },
            },
          },
          404: {
            type: "object",
            properties: {
              error: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    getVideoHandler
  );

  // POST /api/videos
  server.post(
    "/api/videos",
    {
      schema: {
        operationId: "postVideo",
        description: "ビデオを作成",
        tags: ["video"],
        body: zodToFastifySchema(createVideoRequestSchema),
        response: {
          201: zodToFastifySchema(createVideoResponseSchema),
          401: {
            type: "object",
            properties: {
              error: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    createVideoHandler
  );

  // PUT /api/videos/:id
  server.put(
    "/api/videos/:id",
    {
      schema: {
        operationId: "putVideoById",
        description: "ビデオを更新",
        tags: ["video"],
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Video ID",
            },
          },
          required: ["id"],
        },
        body: zodToFastifySchema(createVideoRequestSchema), // updateVideoRequestSchemaからidを除いたもの
        response: {
          200: zodToFastifySchema(updateVideoResponseSchema),
          401: {
            type: "object",
            properties: {
              error: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    updateVideoHandler
  );
};

