import sharp from 'sharp'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import s3Client from '../s3Client'
import { v4 as uuidv4 } from 'uuid'

// サイズ定義
const IMAGE_SIZES = {
  small: { width: 300, height: 200 },   // サムネイル用
  medium: { width: 800, height: 600 },  // 一般表示用
  large: { width: 1200, height: 900 }   // 高解像度表示用
}

/**
 * 画像をリサイズして複数サイズでS3にアップロードする
 * @param fileType ファイルタイプ（例: image/webp）
 * @param base64Data base64エンコードされた画像データ
 * @param baseKey S3のベースキー（パス）
 * @returns アップロードされた各サイズの画像URL
 */
export const resizeAndUploadImage = async (
  fileType: string,
  base64Data: string,
  baseKey: string
): Promise<{
  smallUrl: string
  mediumUrl: string
  largeUrl: string
}> => {
  const uuid = uuidv4()
  const keyBase = `${baseKey}${uuid}`
  const buffer = Buffer.from(base64Data.split(',')[1], 'base64')
  
  const urls = {
    smallUrl: '',
    mediumUrl: '',
    largeUrl: '',
  }
  
  try {
    // 各サイズの画像リサイズとアップロード
    const resizePromises = Object.entries(IMAGE_SIZES).map(async ([size, dimensions]) => {
      // リサイズ処理
      const resizedBuffer = await sharp(buffer)
        .resize(dimensions.width, dimensions.height, {
          fit: 'cover',
          position: 'centre'
        })
        .toBuffer()
      
      // S3へアップロード
      const key = `${keyBase}_${size}`
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: resizedBuffer,
        ContentType: fileType,
        ACL: 'public-read'
      }))
      
      // S3のURLを既存の環境変数から構築
      urls[`${size}Url` as keyof typeof urls] = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    })
    
    await Promise.all(resizePromises)
    return urls
  } catch (error) {
    console.error('Error resizing and uploading images:', error)
    throw new Error('Failed to resize and upload images')
  }
}