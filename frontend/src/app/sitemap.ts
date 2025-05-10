// app/sitemap.ts
import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_FRONT_HOST

// メインサイトマップ
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // 静的ページのリスト
  return [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE_URL}`,
          ja: `${BASE_URL}/ja`,
        },
      },
    },
    {
      url: `${BASE_URL}/ja`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE_URL}`,
          ja: `${BASE_URL}/ja`,
        },
      },
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/blog`,
          ja: `${BASE_URL}/blog/ja`,
        },
      },
    },
    {
      url: `${BASE_URL}/blog/ja`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/blog`,
          ja: `${BASE_URL}/blog/ja`,
        },
      },
    },
  ]
}
