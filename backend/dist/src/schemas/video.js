"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const fileSchema = zod_1.default.object({
    fileName: zod_1.default.string(),
    fileType: zod_1.default.string(),
});
exports.videoSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    duration: zod_1.default.number().int().positive(),
    videoFile: fileSchema.optional(),
    thumbnailFile: fileSchema.optional(),
    data: zod_1.default
        .object({
        videoUrl: zod_1.default.string().url(),
        thumbnailUrl: zod_1.default.string().url(),
        authorId: zod_1.default.string(),
    })
        .optional(),
});
//# sourceMappingURL=video.js.map