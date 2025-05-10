import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import s3Client from '../s3Client'
import { S3_BUCKET_NAME } from '../../constants'

export const generateThumbnailUpload = async (
  fileName: string,
  fileType: string
): Promise<{ url: string; signedUrl: string }> => {
  const key = `thumbnails/${fileName}`

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
    ACL: 'public-read',
  })

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  })
  const url = `https://${S3_BUCKET_NAME}.s3.ap-northeast-1.amazonaws.com/${key}`

  return { url, signedUrl }
}

export const generateFileUpload = async (
  file: { fileName: string; fileType: string },
  sectionTitle: string,
  fileType: 'thumbnail'
): Promise<{ url: string; signedUrl: string }> => {
  try {
    const key = `sections/${sectionTitle}/${fileType}/${file.fileName}`

    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      ContentType: file.fileType,
      ACL: 'public-read',
    })

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    })
    const url = `https://${S3_BUCKET_NAME}.s3.ap-northeast-1.amazonaws.com/${key}`

    return { url, signedUrl }
  } catch (error) {
    console.error(error)
    throw new Error('ファイルアップロードに失敗しました')
  }
}
