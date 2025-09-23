import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";

import { prisma } from "../../prisma/client";
import { userUpdateInputSchema, userUpdateResponseSchema } from "../schemas";
import { getUserProfile, updateUserProfile } from "../features/user/domain/usecases/profile";
import type { UserPorts, UserUpdateData } from "../features/user/domain/ports/user";
import { t } from "../utils/createContext";
import { verifyAuth } from "../utils/verifyAuth";
import s3Client from "../utils/s3Client";

import type { FileUploadRequest } from "../schemas";

const userPorts: UserPorts = {
  findById: (id) =>
    prisma.user.findUnique({
      where: { id },
    }),
  update: (id, data) =>
    prisma.user.update({
      where: { id },
      data,
    }),
};

const generateProfilePictureData = async (
  profilePicture: FileUploadRequest | undefined,
  userId: string
): Promise<{ profilePictureUrl: string; signedUrl: string } | undefined> => {
  if (!profilePicture) return undefined;

  const { fileName, fileType } = profilePicture;
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
};

export const userRouter = t.router({
  getUser: t.procedure.query(async ({ ctx }) => {
    try {
      const { userId } = verifyAuth(ctx);
      const user = await getUserProfile(userPorts, userId);
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
  update: t.procedure.input(userUpdateInputSchema).mutation(async ({ input, ctx }) => {
    try {
      const { userId } = verifyAuth(ctx);
      const profilePictureData = await generateProfilePictureData(input.profilePicture, userId);

      const patch: UserUpdateData = {};
      if (typeof input.userName !== "undefined") {
        patch.userName = input.userName;
      }
      if (profilePictureData) {
        patch.profilePicture = profilePictureData.profilePictureUrl;
      }

      const updatedUser = await updateUserProfile(userPorts, userId, patch);

      return userUpdateResponseSchema.parse({
        success: true,
        user: updatedUser,
        signedUrl: profilePictureData?.signedUrl,
        profilePictureUrl: profilePictureData?.profilePictureUrl,
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "ユーザー情報の更新に失敗しました",
      });
    }
  }),
});
