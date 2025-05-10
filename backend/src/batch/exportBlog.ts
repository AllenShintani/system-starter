#!/usr/bin/env node
/**
 * ブログ記事をマークダウンとして出力するバッチスクリプト
 *
 * 使用方法:
 * npm run export-blog
 *
 * 出力先:
 * ./../frontend/public/blog-content ディレクトリ
 */

import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import dotenv from 'dotenv'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { pipeline } from 'stream/promises'
import { Readable } from 'stream'

// プリズマの型をインポート
import { BlogPost } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { S3_BUCKET_NAME } from '../constants'
import s3Client from '../utils/s3Client'

// 環境変数読み込み
dotenv.config()

// 出力先ディレクトリを public/blog-content に変更
const EXPORT_DIR = path.join(process.cwd(), './../frontend/public/blog-content')
const IMAGES_DIR = path.join(EXPORT_DIR, 'images')
const MARKDOWN_DIR = path.join(process.cwd(), './../frontend/src/blog-markdown')

// ブログタグの型を定義
interface BlogTag {
  id: string
  name: string
  postId: string
}

// ブログ記事の拡張型を定義
interface BlogPostWithRelations extends BlogPost {
  author: {
    id: string
    userName: string | null
    profilePicture: string | null
  }
  tags: BlogTag[]
}

/**
 * メイン実行関数
 */
async function main(): Promise<void> {
  try {
    console.log('ブログ記事のエクスポートを開始します...')

    // エクスポート先ディレクトリの準備
    await prepareDirectories()

    // すべてのブログ記事を取得
    const blogPosts = await fetchAllBlogPosts()
    console.log(`${blogPosts.length}件のブログ記事を取得しました`)

    // 記事ごとにマークダウンを作成
    for (const post of blogPosts) {
      await exportBlogPostToMarkdown(post)
    }

    // インデックスページを作成
    await createIndexPage(blogPosts)

    console.log('\nエクスポートが完了しました!')
    console.log(`public出力先: ${EXPORT_DIR}`)
    console.log(`マークダウン出力先: ${MARKDOWN_DIR}`)
  } catch (error) {
    console.error('エクスポート中にエラーが発生しました:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * ディレクトリの準備
 */
async function prepareDirectories(): Promise<void> {
  console.log('エクスポート先ディレクトリを準備しています...')

  // public出力先ディレクトリ
  if (!fs.existsSync(EXPORT_DIR)) {
    fs.mkdirSync(EXPORT_DIR, { recursive: true })
  }

  // マークダウン出力先ディレクトリも作成
  if (!fs.existsSync(MARKDOWN_DIR)) {
    fs.mkdirSync(MARKDOWN_DIR, { recursive: true })
  }

  // 記事ディレクトリ（マークダウン用）
  const postsDir = path.join(MARKDOWN_DIR, 'posts')
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }

  // 画像ディレクトリ (public用)
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true })
  }

  // サムネイルディレクトリ
  const thumbnailsDir = path.join(IMAGES_DIR, 'thumbnails')
  if (!fs.existsSync(thumbnailsDir)) {
    fs.mkdirSync(thumbnailsDir, { recursive: true })
  }
}

/**
 * すべてのブログ記事を取得
 */
async function fetchAllBlogPosts(): Promise<BlogPostWithRelations[]> {
  // Prismaのクエリ結果を適切な型にキャスト
  const posts = (await prisma.blogPost.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: {
        select: {
          id: true,
          userName: true,
          profilePicture: true,
        },
      },
      tags: true,
    },
  })) as unknown as BlogPostWithRelations[]

  return posts
}

/**
 * ブログ記事をマークダウンとして出力
 */
async function exportBlogPostToMarkdown(post: BlogPostWithRelations): Promise<void> {
  console.log(`\n"${post.title}" をエクスポートしています...`)

  // フロントマターを作成
  const frontMatter = createFrontMatter(post)

  // 画像URLを処理
  const processedContent = await processImages(post.content, post.id)

  // マークダウンファイルの作成
  const fileName = createSlug(post.title)
  const filePath = path.join(MARKDOWN_DIR, 'posts', `${fileName}.md`)

  // マークダウンファイルに書き込み
  const markdown = `${frontMatter}\n\n${processedContent}`
  fs.writeFileSync(filePath, markdown, 'utf8')

  // サムネイル画像をダウンロード
  if (post.thumbnailUrl) {
    await downloadThumbnail(post.thumbnailUrl, post.id)
  }

  console.log(`"${post.title}" のエクスポートが完了しました`)
}

/**
 * フロントマターを作成
 */
function createFrontMatter(post: BlogPostWithRelations): string {
  const createdAt = format(new Date(post.createdAt), 'yyyy-MM-dd', { locale: ja })
  const tags = post.tags.map((tag) => `"${tag.name}"`).join(', ')
  const authorName = post.author.userName || 'Unknown'

  // サムネイルパスを /blog-content/images/thumbnails/ に変更
  return `---
title: "${post.title}"
date: "${createdAt}"
author: "${authorName}"
tags: [${tags}]
thumbnail: "/blog-content/images/thumbnails/${post.id}.jpg"
description: "${post.title.substring(0, 100)}"
---`
}

/**
 * コンテンツ内の画像を処理する
 */
async function processImages(content: string, postId: string): Promise<string> {
  // 画像マークダウン ![alt](url) パターンの検索
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g
  let match: RegExpExecArray | null
  let processedContent = content
  const imagePromises: Promise<void>[] = []
  const imageMap: Map<string, string> = new Map() // 元のURLと新しいURLのマッピング

  console.log(`  コンテンツ内の画像を検索しています...`)

  // すべての画像参照を処理
  while ((match = imageRegex.exec(content)) !== null) {
    const [fullMatch, altText, imageUrl] = match
    console.log(`  画像を検出しました: ${imageUrl} (alt: ${altText})`)

    // ローカルホストURLや既にS3に存在するURLをチェック
    if (
      imageUrl.startsWith('http://localhost') ||
      imageUrl.startsWith('blob:') ||
      imageUrl.includes('s3.amazonaws.com')
    ) {
      // 新しい画像パスを作成
      const imageId = `${postId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`
      const newImagePath = `/blog-content/images/${imageId}.jpg` // パスを変更

      // マッピングを保存
      imageMap.set(imageUrl, newImagePath)

      // 画像のダウンロードを予約
      imagePromises.push(downloadImage(imageUrl, imageId))
    }
  }

  // すべての画像ダウンロードを並行実行
  await Promise.all(imagePromises)

  // 画像パスを置き換え
  for (const [oldUrl, newUrl] of imageMap.entries()) {
    const regex = new RegExp(`!\\[(.*?)\\]\\(${escapeRegExp(oldUrl)}\\)`, 'g')
    processedContent = processedContent.replace(regex, (match, alt) => {
      return `![${alt}](${newUrl})`
    })
    console.log(`  画像パスを置き換えました: ${oldUrl} -> ${newUrl}`)
  }

  return processedContent
}

// 正規表現のエスケープ用ヘルパー関数
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * 画像をダウンロードして保存
 */
async function downloadImage(imageUrl: string, imageId: string): Promise<void> {
  try {
    console.log(`  画像のダウンロードを開始します: ${imageUrl}`)
    const outputPath = path.join(IMAGES_DIR, `${imageId}.jpg`)

    // S3 URL の場合
    if (imageUrl.includes('s3.amazonaws.com')) {
      const key = imageUrl.split(`${S3_BUCKET_NAME}.s3.ap-northeast-1.amazonaws.com/`)[1]

      if (!key) {
        console.error(`  画像URLからS3キーを抽出できませんでした: ${imageUrl}`)
        createPlaceholderImage(outputPath, `Failed to extract S3 key from URL: ${imageUrl}`)
        return
      }

      const command = new GetObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
      })

      try {
        const response = await s3Client.send(command)
        const writeStream = fs.createWriteStream(outputPath)

        if (response.Body instanceof Readable) {
          await pipeline(response.Body, writeStream)
        } else if (response.Body) {
          // ReadableStreamではない場合の処理
          const bodyContents = await response.Body.transformToByteArray()
          fs.writeFileSync(outputPath, Buffer.from(bodyContents))
        } else {
          throw new Error('S3レスポンスが空です')
        }
      } catch (error: any) {
        console.error(`  S3からの画像取得に失敗しました: ${error}`)
        createPlaceholderImage(
          outputPath,
          `Failed to get image from S3: ${error.message || 'Unknown error'}`
        )
        return
      }
    }
    // 他のURLの場合
    else {
      // Blob URLの場合はプレースホルダー画像を作成
      if (imageUrl.startsWith('blob:')) {
        console.log(`  Blob URL はプレースホルダー画像を作成します: ${imageUrl}`)
        createPlaceholderImage(outputPath, `Blob URL cannot be accessed: ${imageUrl}`)
        return
      }

      try {
        const response = await fetch(imageUrl)
        if (!response.ok) {
          throw new Error(`画像の取得に失敗しました: ${response.status} ${response.statusText}`)
        }

        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        fs.writeFileSync(outputPath, buffer)
      } catch (error: any) {
        console.error(`  画像の取得に失敗しました: ${error}`)
        createPlaceholderImage(
          outputPath,
          `Failed to fetch image: ${error.message || 'Unknown error'}`
        )
        return
      }
    }

    console.log(`  画像をダウンロードしました: ${imageId}.jpg`)
  } catch (error: any) {
    console.error(`  画像のダウンロード中にエラーが発生しました: ${imageUrl}`, error)
    const outputPath = path.join(IMAGES_DIR, `${imageId}.jpg`)
    createPlaceholderImage(
      outputPath,
      `Error downloading image: ${error.message || 'Unknown error'}`
    )
  }
}

/**
 * プレースホルダー画像を作成
 */
function createPlaceholderImage(outputPath: string, _errorMessage: string): void {
  console.log(`  プレースホルダー画像を作成します: ${outputPath}`)

  // 1x1ピクセルの透明なJPEG画像（最小限のJPEGファイル）
  const minimalJpeg = Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48,
    0x00, 0x48, 0x00, 0x00, 0xff, 0xdb, 0x00, 0x43, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xc0, 0x00, 0x0b, 0x08, 0x00, 0x01, 0x00,
    0x01, 0x01, 0x01, 0x11, 0x00, 0xff, 0xc4, 0x00, 0x14, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xc4, 0x00, 0x14, 0x10,
    0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0xff, 0xda, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3f, 0x00, 0x7f, 0x00, 0xff, 0xd9,
  ])

  fs.writeFileSync(outputPath, minimalJpeg)
  console.log(`  プレースホルダー画像を作成しました: ${outputPath}`)
}

/**
 * サムネイル画像をダウンロード
 */
async function downloadThumbnail(thumbnailUrl: string, postId: string): Promise<void> {
  try {
    const thumbnailsDir = path.join(IMAGES_DIR, 'thumbnails')
    if (!fs.existsSync(thumbnailsDir)) {
      fs.mkdirSync(thumbnailsDir, { recursive: true })
    }

    const outputPath = path.join(thumbnailsDir, `${postId}.jpg`)

    // S3 URL の場合
    if (thumbnailUrl.includes('s3.amazonaws.com')) {
      const key = thumbnailUrl.split(`${S3_BUCKET_NAME}.s3.ap-northeast-1.amazonaws.com/`)[1]

      if (!key) {
        console.error(`  サムネイルURLからS3キーを抽出できませんでした: ${thumbnailUrl}`)
        return
      }

      const command = new GetObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
      })

      const response = await s3Client.send(command)
      const writeStream = fs.createWriteStream(outputPath)

      if (response.Body instanceof Readable) {
        await pipeline(response.Body, writeStream)
      } else if (response.Body) {
        // ReadableStreamではない場合の処理
        const bodyContents = await response.Body.transformToByteArray()
        fs.writeFileSync(outputPath, Buffer.from(bodyContents))
      } else {
        throw new Error('S3レスポンスが空です')
      }
    }
    // 他のURLの場合
    else {
      const response = await fetch(thumbnailUrl)
      if (!response.ok) {
        throw new Error(`サムネイルの取得に失敗しました: ${response.status} ${response.statusText}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      fs.writeFileSync(outputPath, buffer)
    }

    console.log(`  サムネイルをダウンロードしました: ${postId}.jpg`)
  } catch (error) {
    console.error(`  サムネイルのダウンロード中にエラーが発生しました: ${thumbnailUrl}`, error)
  }
}

/**
 * タイトルからスラグを作成
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9ぁ-んァ-ン一-龠々]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * インデックスページを作成
 */
async function createIndexPage(posts: BlogPostWithRelations[]): Promise<void> {
  console.log('\nインデックスページを作成しています...')

  let content = `# ブログ記事一覧\n\n`

  posts.forEach((post, index) => {
    const slug = createSlug(post.title)
    const date = format(new Date(post.createdAt), 'yyyy-MM-dd', { locale: ja })
    const tags = post.tags.map((tag) => `\`${tag.name}\``).join(' ')

    // 連番を使用したリンク
    const numericId = (index + 1).toString()
    content += `- [${post.title}](./posts/${slug}.md) (${date}) ${tags} [連番リンク: ${numericId}]\n`
  })

  const indexPath = path.join(MARKDOWN_DIR, 'README.md')
  fs.writeFileSync(indexPath, content, 'utf8')

  console.log('インデックスページを作成しました')
}

// メイン実行
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('予期しないエラーが発生しました:', error)
    process.exit(1)
  })
