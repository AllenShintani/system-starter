import styles from '@/styles/app/blog/Blog.module.css'
import AppBar from '@/components/admin/blog/AppBar'
import BlogPostCard from '@/components/blog/BlogPostCard'
import { getAllPosts } from '@/utils/blog'
import type { Metadata } from 'next'

// メタデータを設定
export const metadata: Metadata = {
  title: 'Blog | Your Service X',
  description: 'Articles and insights from Your Service X on cybersecurity, OSINT, and more.',
  openGraph: {
    title: 'Blog | Your Service X',
    description: 'Articles and insights from Your Service X on cybersecurity, OSINT, and more.',
    url: 'https://info-plat.tech/blog',
    siteName: 'Your Service X',
    images: [
      {
        url: 'https://info-plat.tech/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Service X Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Your Service X',
    description: 'Articles and insights from Your Service X on cybersecurity, OSINT, and more.',
    images: ['https://info-plat.tech/og-default.jpg'],
  },
}

// App RouterではgetStaticPropsの代わりにデフォルトエクスポートの非同期関数を使用
export default async function BlogPage() {
  // サーバーコンポーネント内で英語記事のみ取得
  const posts = getAllPosts('en')

  return (
    <div className={styles.pageContainer}>
      <AppBar />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Blog</h1>

          {posts.length > 0 ? (
            <div className={styles.postsGrid}>
              {posts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No English blog posts found.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
