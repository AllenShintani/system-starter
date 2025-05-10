import { AWS_S3_BUCKET_NAME, AWS_REGION } from '../../constants'

export const generateS3Url = (key: string): string => {
  return `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`
}
