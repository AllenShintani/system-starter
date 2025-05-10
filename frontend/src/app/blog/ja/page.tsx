import styles from '@/styles/app/blog/Blog.module.css'
import AppBar from '@/components/admin/blog/AppBar'
import BlogPostCard from '@/components/blog/BlogPostCard'
import { getAllPosts } from '@/utils/blog'
import type { Metadata } from 'next'

// メタデータを設定
export const metadata: Metadata = {
  title: 'ブログ | Your Service X',
  description:
    'Hackers Guildによるサイバーセキュリティ、OSINT、その他の洞察やコンテンツをご覧ください。',
  openGraph: {
    title: 'ブログ | Your Service X',
    description:
      'Hackers Guildによるサイバーセキュリティ、OSINT、その他の洞察やコンテンツをご覧ください。',
    url: 'https://info-plat.tech/blog/ja',
    siteName: 'Your Service X',
    images: [
      {
        url: 'https://info-plat.tech/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Service X ブログ',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ブログ | Your Service X',
    description:
      'Hackers Guildによるサイバーセキュリティ、OSINT、その他の洞察やコンテンツをご覧ください。',
    images: ['https://info-plat.tech/og-default.jpg'],
  },
}

// App RouterではgetStaticPropsの代わりにデフォルトエクスポートの非同期関数を使用
export default async function JapaneseBlogPage() {
  // サーバーコンポーネント内で日本語記事のみ取得
  const posts = getAllPosts('ja')

  return (
    <div className={styles.pageContainer}>
      <AppBar />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>ブログ</h1>

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
              <p>記事が見つかりませんでした。</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
