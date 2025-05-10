/* eslint-disable */
// app/blog/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/utils/blog'

// 1サイトマップあたりの記事数
const POSTS_PER_SITEMAP = 1000
const BASE_URL = process.env.NEXT_PUBLIC_FRONT_HOST

// サイトマップ生成関数
export async function generateSitemaps() {
  // すべての記事を取得
  const allPosts = getAllPosts()

  // 記事の総数からサイトマップの数を計算
  const sitemapCount = Math.ceil(allPosts.length / POSTS_PER_SITEMAP)

  // サイトマップIDの配列を返す
  return Array.from({ length: sitemapCount }, (_, i) => ({ id: i }))
}

// 個別のサイトマップ生成
export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // すべての記事を取得
  const allPosts = getAllPosts()

  // 現在のサイトマップに含める記事の範囲を計算
  const start = id * POSTS_PER_SITEMAP
  const end = Math.min(start + POSTS_PER_SITEMAP, allPosts.length)

  // 現在のサイトマップに含める記事のスライスを取得
  const postsForThisSitemap = allPosts.slice(start, end)

  // サイトマップエントリを作成
  return postsForThisSitemap.map((post) => {
    // 記事の言語に基づいてURLを決定
    const url =
      post.language === 'ja' ? `${BASE_URL}/blog/ja/${post.slug}` : `${BASE_URL}/blog/${post.slug}`

    // 日付文字列を正しい Date オブジェクトに変換
    let lastModified: Date
    try {
      // post.date が有効な日付文字列であることを確認
      lastModified = new Date(post.date)
      // 無効な日付の場合（NaN）は現在の日付を使用
      if (isNaN(lastModified.getTime())) {
        lastModified = new Date()
      }
    } catch (e) {
      // エラーが発生した場合は現在の日付を使用
      lastModified = new Date()
    }

    return {
      url,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  })
}
