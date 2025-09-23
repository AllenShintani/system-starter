import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3Client from "../s3Client";

import type { FileUploadRequest, SignedUpload } from "../../schemas/infrastructure/s3.schemas";

export const generateFileUpload = async (
  file: FileUploadRequest,
  videoId: string,
  fileType: "video" | "thumbnail"
): Promise<SignedUpload> => {
  const key = `lessons/${videoId}/${fileType}/${file.fileName}`;

  const command = new PutObjectCommand({
    Bucket: "hackers-guild-bucket",
    Key: key,
    ContentType: file.fileType,
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
  const url = `https://hackers-guild-bucket.s3.ap-northeast-1.amazonaws.com/${key}`;

  return { url, signedUrl };
};
