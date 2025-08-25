import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";

import { prisma } from "../../prisma/client";
import { userUpdateSchema } from "../schemas/userSchemas";
import { t } from "../utils/createContext";
import s3Client from "../utils/s3Client";

import type { JwtPayload } from "../types/jwt";
import type z from "zod";

const generateProfilePictureData = async (
  input: z.infer<typeof userUpdateSchema>,
  userId: string
): Promise<{ profilePictureUrl: string; signedUrl: string } | undefined> => {
  if (
    input.profilePicture &&
    "fileName" in input.profilePicture &&
    "fileType" in input.profilePicture
  ) {
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

type UpdateResponse = {
  success: boolean;
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    profilePicture: string | null;
  };
  signedUrl?: string;
  profilePictureUrl?: string;
};

export const userRouter = t.router({
  getUser: t.procedure.query(async ({ ctx }) => {
    try {
      const token = ctx.request.cookies.token;
      if (!token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "認証されていません",
        });
      }
      const decoded = ctx.fastify.jwt.verify<JwtPayload>(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          profilePicture: true,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "ユーザーが見つかりません",
        });
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "ユーザー情報の取得に失敗しました",
      });
    }
  }),
  update: t.procedure
    .input(userUpdateSchema)
    .mutation(async ({ input, ctx }): Promise<UpdateResponse> => {
      try {
        const token = ctx.request.cookies.token;
        if (!token) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "認証されていません",
          });
        }
        const decoded = ctx.fastify.jwt.verify<JwtPayload>(token);

        const profilePictureData = await generateProfilePictureData(input, decoded.userId);

        const updatedUser = await prisma.user.update({
          where: { id: decoded.userId },
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            profilePicture: profilePictureData?.profilePictureUrl,
          },
        });

        const response: UpdateResponse = {
          success: true,
          user: {
            id: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            profilePicture: updatedUser.profilePicture,
          },
        };

        if (profilePictureData) {
          response.signedUrl = profilePictureData.signedUrl;
          response.profilePictureUrl = profilePictureData.profilePictureUrl;
        }

        return response;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "ユーザー情報の更新に失敗しました",
        });
      }
    }),
});
