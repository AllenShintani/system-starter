import { TRPCError } from '@trpc/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import s3Client from '../../utils/s3Client'
import { v4 as uuidv4 } from 'uuid'
import { AWS_S3_BUCKET_NAME } from '../../constants'

export const sendRequestImgToS3 = async (
  fileType: string,
  base64Data: string,
  key: string
): Promise<string> => {
  try {
    const uuid = uuidv4()
    const keyWithId = `${key}${uuid}`
    const buffer = Buffer.from(base64Data.split(',')[1], 'base64')

    await s3Client.send(
      new PutObjectCommand({
        Bucket: AWS_S3_BUCKET_NAME,
        Key: keyWithId,
        Body: buffer,
        ContentType: fileType,
      })
    )

    return keyWithId
  } catch (error) {
    console.error('Error uploading to S3:', error)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to upload image',
    })
  }
}
