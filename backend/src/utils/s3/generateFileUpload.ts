import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../s3Client";

export const generateFileUpload = async (
  file: { fileName: string; fileType: string },
  lessonId: string,
  fileType: "video" | "thumbnail"
): Promise<{ url: string; signedUrl: string }> => {
  const key = `lessons/${lessonId}/${fileType}/${file.fileName}`;

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
