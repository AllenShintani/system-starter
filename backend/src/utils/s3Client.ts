import { S3Client } from "@aws-sdk/client-s3";
import { fromSSO } from "@aws-sdk/credential-provider-sso";

const s3Client = new S3Client({
  region: "ap-northeast-1",
  credentials: fromSSO({ profile: "hackers-guild-admin" }),
});

export default s3Client;
