import dotenv from 'dotenv'

dotenv.config()

export const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME

export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
export const AWS_REGION = process.env.AWS_REGION
