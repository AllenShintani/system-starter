import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { JwtPayload } from "@/types/jwt";

import {
  userDtoSchema,
  getUserResponseSchema,
  updateUserRequestSchema,
  updateUserResponseSchema,
  type UpdateUserRequestDto,
} from "@/dto/user";
import { authenticate } from "@/middleware/auth.middleware";
import { prisma } from "@/prisma/client";
import s3Client from "@/utils/s3Client";
import { sendErrorResponse } from "@/utils/errorHandler";

/**
 * プロフィール画像のアップロードデータを生成
 */
const generateProfilePictureData = async (
  input: UpdateUserRequestDto,
  userId: string
): Promise<{ profilePictureUrl: string; signedUrl: string } | undefined> => {
  if (input.profilePicture && "fileName" in input.profilePicture && "fileType" in input.profilePicture) {
    const { fileName, fileType } = input.profilePicture;
    const key = `profile-pictures/${userId}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: "hackers-guild-bucket",
      Key: key,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    const profilePictureUrl = `https://hackers-guild-bucket.s3.ap-northeast-1.amazonaws.com/${key}`;

    return { profilePictureUrl, signedUrl };
  }
  return undefined;
};

/**
 * ユーザー情報取得ルート
 * GET /api/user
 */
const getUserHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const decoded = await authenticate(request, reply);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        userName: true,
        email: true,
        profilePicture: true,
      },
    });

    if (!user) {
      reply.code(404).send({
        error: "NOT_FOUND",
        message: "ユーザーが見つかりません",
      });
      return;
    }

    const response = getUserResponseSchema.parse(user);
    reply.code(200).send(response);
  } catch (error) {
    console.error(error);
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Invalid token")) {
      return; // authenticate が既にエラーレスポンスを送信済み
    }
    sendErrorResponse(reply, error instanceof Error ? error : new Error("ユーザー情報の取得に失敗しました"));
  }
};

/**
 * ユーザー情報更新ルート
 * PUT /api/user
 */
const updateUserHandler = async (
  request: FastifyRequest<{ Body: UpdateUserRequestDto }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const decoded = await authenticate(request, reply);

    const profilePictureData = await generateProfilePictureData(request.body, decoded.userId);

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        userName: request.body.userName,
        profilePicture: profilePictureData?.profilePictureUrl,
      },
    });

    const responseData: {
      success: boolean;
      user: {
        id: string;
        userName: string;
        email: string;
        profilePicture: string | null;
      };
      signedUrl?: string;
      profilePictureUrl?: string;
    } = {
      success: true,
      user: {
        id: updatedUser.id,
        userName: updatedUser.userName,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
      },
    };

    if (profilePictureData) {
      responseData.signedUrl = profilePictureData.signedUrl;
      responseData.profilePictureUrl = profilePictureData.profilePictureUrl;
    }

    const response = updateUserResponseSchema.parse(responseData);
    reply.code(200).send(response);
  } catch (error) {
    console.error(error);
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Invalid token")) {
      return; // authenticate が既にエラーレスポンスを送信済み
    }
    sendErrorResponse(reply, error instanceof Error ? error : new Error("ユーザー情報の更新に失敗しました"));
  }
};

/**
 * Userルートを登録
 */
export const registerUserRoutes = (server: FastifyInstance): void => {
  // GET /api/user
  server.get(
    "/api/user",
    {
      schema: {
        description: "認証済みユーザー情報を取得",
        tags: ["user"],
        response: {
          200: getUserResponseSchema,
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
    getUserHandler
  );

  // PUT /api/user
  server.put(
    "/api/user",
    {
      schema: {
        description: "ユーザー情報を更新",
        tags: ["user"],
        body: updateUserRequestSchema,
        response: {
          200: updateUserResponseSchema,
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
    updateUserHandler
  );
};

