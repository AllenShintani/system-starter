import { notFound } from 'next/navigation'
import styles from '@/styles/app/blog/BlogPost.module.css'
import AppBar from '@/components/admin/blog/AppBar'
import { getAllPosts, getPostBySlug } from '@/utils/blog'
import BlogContent from '@/components/blog/BlogContent'
import BlogHeader from '@/components/blog/BlogHeader'
import TableOfContents from '@/components/blog/TableOfContents'
import type { Metadata } from 'next'

// 動的ルートパラメータの型定義
interface BlogPostPageParams {
  params: {
    slug: string
  }
}

// 動的にメタデータを生成する関数
export async function generateMetadata({ params }: BlogPostPageParams): Promise<Metadata> {
  const { slug } = params
  const post = getPostBySlug(slug, 'ja')

  if (!post) {
    return {
      title: '記事が見つかりません',
      description: 'リクエストされたブログ記事が見つかりませんでした',
    }
  }

  return {
    title: `${post.title} | Hackers Guildブログ`,
    description: post.description || `Hackers Guildブログで「${post.title}」についてお読みください`,
    openGraph: {
      title: post.title,
      description:
        post.description || `Hackers Guildブログで「${post.title}」についてお読みください`,
      type: 'article',
      url: `https://info-plat.tech/blog/ja/${post.slug}`,
      images: [
        {
          url: post.thumbnail || 'https://info-plath/og-default.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description:
        post.description || `Hackers Guildブログで「${post.title}」についてお読みください`,
      images: [post.thumbnail || 'https://info-plath/og-default.jpg'],
    },
  }
}

// generateStaticParamsはApp Routerでのbuild時のpath生成に使用
export async function generateStaticParams() {
  // 日本語記事のみを対象にパスを生成
  const posts = getAllPosts('ja')

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// App RouterではgetStaticPropsの代わりにデフォルトエクスポートの非同期関数を使用
export default async function JapaneseBlogPostPage({ params }: BlogPostPageParams) {
  const { slug } = params
  // 日本語記事のみを取得
  const post = getPostBySlug(slug, 'ja')

  // 記事が見つからない場合は404を返す
  if (!post) {
    notFound()
  }

  return (
    <div className={`${styles.pageContainer} ${styles['text-effect-reset']}`}>
      <AppBar />
      <main className={styles.mainContent}>
        <div className={styles.blogLayout}>
          <article className={styles.container}>
            <BlogHeader post={post} />

            {post.thumbnail && (
              <div className={styles.thumbnailContainer}>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className={styles.thumbnail}
                />
              </div>
            )}

            <BlogContent
              content={post.content}
              lang="ja"
            />

            {/* <ArticleFooter /> */}
          </article>

          <aside className={styles.tocSidebar}>
            <TableOfContents
              contentSelector={`.${styles.content}`}
              lang="ja"
            />
          </aside>
        </div>
      </main>
    </div>
  )
}
