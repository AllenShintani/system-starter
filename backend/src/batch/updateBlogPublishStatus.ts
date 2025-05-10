#!/usr/bin/env node
/**
 * ブログ記事の公開ステータスを更新するバッチスクリプト
 *
 * 使用方法:
 * npx vite-node src/batch/updateBlogPublishStatus.ts
 */

import dotenv from 'dotenv'
import { prisma } from '../../prisma/client'

// 環境変数読み込み
dotenv.config()

/**
 * メイン実行関数
 */
async function main(): Promise<void> {
  try {
    console.log('ブログ記事の公開ステータス更新を開始します...')

    // すべてのブログ記事を取得
    const blogPosts = await prisma.blogPost.findMany()
    console.log(`${blogPosts.length}件のブログ記事を取得しました`)

    // 各ブログ記事の情報を表示
    for (const post of blogPosts) {
      console.log(`ID: ${post.id}`)
      console.log(`タイトル: ${post.title}`)
      console.log(`公開ステータス: ${post.isPublished ? '公開中' : '非公開'}`)
      console.log('---')
    }

    // すべてのブログ記事を公開状態に更新
    const updateResult = await prisma.blogPost.updateMany({
      data: {
        isPublished: true,
      },
    })

    console.log(`${updateResult.count}件のブログ記事を公開状態に更新しました`)
    console.log('\n更新が完了しました!')
  } catch (error) {
    console.error('更新中にエラーが発生しました:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// メイン実行
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('予期しないエラーが発生しました:', error)
    process.exit(1)
  })
