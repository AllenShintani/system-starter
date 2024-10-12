"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const server_1 = require("@trpc/server");
const client_1 = require("../../prisma/client");
const zod_1 = __importDefault(require("zod"));
const video_1 = require("../schemas/video");
const createContext_1 = require("../utils/createContext");
const generateFileUpload_1 = require("../utils/s3/generateFileUpload");
const verifyAuth_1 = require("../utils/verifyAuth");
exports.videoRouter = createContext_1.t.router({
    getAllVideoes: createContext_1.t.procedure.query((_a) => __awaiter(void 0, [_a], void 0, function* ({ ctx }) {
        try {
            (0, verifyAuth_1.verifyAuth)(ctx);
            const videoes = yield client_1.prisma.video.findMany();
            return videoes;
        }
        catch (error) {
            console.error(error);
            throw new server_1.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "ビデオ一覧の取得に失敗しました",
            });
        }
    })),
    getVideo: createContext_1.t.procedure
        .input(zod_1.default.string())
        .query((_a) => __awaiter(void 0, [_a], void 0, function* ({ input: videoId, ctx }) {
        try {
            (0, verifyAuth_1.verifyAuth)(ctx);
            const video = yield client_1.prisma.video.findUnique({
                where: { id: videoId },
            });
            return video;
        }
        catch (error) {
            console.error(error);
            throw new server_1.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "ビデオ情報の取得に失敗しました",
            });
        }
    })),
    putVideo: createContext_1.t.procedure
        .input(video_1.videoSchema.extend({ id: zod_1.default.string() }))
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input, ctx }) {
        try {
            const decoded = (0, verifyAuth_1.verifyAuth)(ctx);
            const videoUploadData = input.videoFile
                ? yield (0, generateFileUpload_1.generateFileUpload)(input.videoFile, input.id, "video")
                : undefined;
            const thumbnailUploadData = input.thumbnailFile
                ? yield (0, generateFileUpload_1.generateFileUpload)(input.thumbnailFile, input.id, "thumbnail")
                : undefined;
            const updatedVideo = yield client_1.prisma.video.update({
                where: { id: input.id },
                data: {
                    title: input.title,
                    description: input.description,
                    duration: input.duration,
                    videoUrl: videoUploadData === null || videoUploadData === void 0 ? void 0 : videoUploadData.url,
                    thumbnailUrl: thumbnailUploadData === null || thumbnailUploadData === void 0 ? void 0 : thumbnailUploadData.url,
                    authorId: decoded.userId,
                },
            });
            return {
                success: true,
                video: updatedVideo,
                videoSignedUrl: videoUploadData === null || videoUploadData === void 0 ? void 0 : videoUploadData.signedUrl,
                thumbnailSignedUrl: thumbnailUploadData === null || thumbnailUploadData === void 0 ? void 0 : thumbnailUploadData.signedUrl,
            };
        }
        catch (error) {
            console.error(error);
            throw new server_1.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "ビデオ情報の更新に失敗しました",
            });
        }
    })),
    postVideo: createContext_1.t.procedure.input(video_1.videoSchema).mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input, ctx }) {
        var _b, _c;
        try {
            const decoded = (0, verifyAuth_1.verifyAuth)(ctx);
            const newVideo = yield client_1.prisma.video.create({
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
                ? yield (0, generateFileUpload_1.generateFileUpload)(input.videoFile, newVideo.id, "video")
                : undefined;
            const thumbnailUploadData = input.thumbnailFile
                ? yield (0, generateFileUpload_1.generateFileUpload)(input.thumbnailFile, newVideo.id, "thumbnail")
                : undefined;
            if ((videoUploadData === null || videoUploadData === void 0 ? void 0 : videoUploadData.url) || (thumbnailUploadData === null || thumbnailUploadData === void 0 ? void 0 : thumbnailUploadData.url)) {
                yield client_1.prisma.video.update({
                    where: { id: newVideo.id },
                    data: {
                        videoUrl: (_b = videoUploadData === null || videoUploadData === void 0 ? void 0 : videoUploadData.url) !== null && _b !== void 0 ? _b : newVideo.videoUrl,
                        thumbnailUrl: (_c = thumbnailUploadData === null || thumbnailUploadData === void 0 ? void 0 : thumbnailUploadData.url) !== null && _c !== void 0 ? _c : newVideo.thumbnailUrl,
                    },
                });
            }
            return {
                success: true,
                video: newVideo,
                videoSignedUrl: videoUploadData === null || videoUploadData === void 0 ? void 0 : videoUploadData.signedUrl,
                thumbnailSignedUrl: thumbnailUploadData === null || thumbnailUploadData === void 0 ? void 0 : thumbnailUploadData.signedUrl,
            };
        }
        catch (error) {
            console.error(error);
            throw new server_1.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "ビデオの作成に失敗しました",
            });
        }
    })),
});
//# sourceMappingURL=video.js.map