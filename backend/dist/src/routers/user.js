"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const server_1 = require("@trpc/server");
const client_1 = require("../../prisma/client");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3Client_1 = __importDefault(require("../utils/s3Client"));
const userSchemas_1 = require("../schemas/userSchemas");
const createContext_1 = require("../utils/createContext");
const generateProfilePictureData = (input, userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      input.profilePicture &&
      "fileName" in input.profilePicture &&
      "fileType" in input.profilePicture
    ) {
      const { fileName, fileType } = input.profilePicture;
      const key = `profile-pictures/${userId}/${fileName}`;
      const command = new client_s3_1.PutObjectCommand({
        Bucket: "hackers-guild-bucket",
        Key: key,
        ContentType: fileType,
      });
      const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(
        s3Client_1.default,
        command,
        {
          expiresIn: 3600,
        }
      );
      const profilePictureUrl = `https://hackers-guild-bucket.s3.ap-northeast-1.amazonaws.com/${key}`;
      return { profilePictureUrl, signedUrl };
    }
    return undefined;
  });
exports.userRouter = createContext_1.t.router({
  getUser: createContext_1.t.procedure.query((_a) =>
    __awaiter(void 0, [_a], void 0, function* ({ ctx }) {
      try {
        const token = ctx.request.cookies.token;
        if (!token) {
          throw new server_1.TRPCError({
            code: "UNAUTHORIZED",
            message: "認証されていません",
          });
        }
        const decoded = ctx.fastify.jwt.verify(token);
        const user = yield client_1.prisma.user.findUnique({
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
          throw new server_1.TRPCError({
            code: "NOT_FOUND",
            message: "ユーザーが見つかりません",
          });
        }
        return user;
      } catch (error) {
        console.error(error);
        throw new server_1.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "ユーザー情報の取得に失敗しました",
        });
      }
    })
  ),
  update: createContext_1.t.procedure
    .input(userSchemas_1.userUpdateSchema)
    .mutation((_a) =>
      __awaiter(void 0, [_a], void 0, function* ({ input, ctx }) {
        try {
          const token = ctx.request.cookies.token;
          if (!token) {
            throw new server_1.TRPCError({
              code: "UNAUTHORIZED",
              message: "認証されていません",
            });
          }
          const decoded = ctx.fastify.jwt.verify(token);
          const profilePictureData = yield generateProfilePictureData(
            input,
            decoded.userId
          );
          const updatedUser = yield client_1.prisma.user.update({
            where: { id: decoded.userId },
            data: {
              firstName: input.firstName,
              lastName: input.lastName,
              profilePicture:
                profilePictureData === null || profilePictureData === void 0
                  ? void 0
                  : profilePictureData.profilePictureUrl,
            },
          });
          const response = {
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
          throw new server_1.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "ユーザー情報の更新に失敗しました",
          });
        }
      })
    ),
});
//# sourceMappingURL=user.js.map
