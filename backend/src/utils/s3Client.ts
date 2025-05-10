import { S3Client } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-provider-env";

const credentials = fromEnv();

const s3Client = new S3Client({
  region: "ap-northeast-1",
  credentials,
});

export default s3Client;
