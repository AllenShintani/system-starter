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
exports.generateFileUpload = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3Client_1 = __importDefault(require("../s3Client"));
const generateFileUpload = (file, lessonId, fileType) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `lessons/${lessonId}/${fileType}/${file.fileName}`;
    const command = new client_s3_1.PutObjectCommand({
        Bucket: "hackers-guild-bucket",
        Key: key,
        ContentType: file.fileType,
    });
    const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client_1.default, command, {
        expiresIn: 3600,
    });
    const url = `https://hackers-guild-bucket.s3.ap-northeast-1.amazonaws.com/${key}`;
    return { url, signedUrl };
});
exports.generateFileUpload = generateFileUpload;
//# sourceMappingURL=generateFileUpload.js.map