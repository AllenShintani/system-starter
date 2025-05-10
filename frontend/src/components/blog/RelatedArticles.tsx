'use client'

import Link from 'next/link'
import styles from '@/styles/components/blog/RelatedArticles.module.css'

export default function RelatedArticles() {
  // 実際の実装では関連記事データをpropsとして受け取るか、APIで取得するなどの方法を使用
  const relatedArticles = [
    {
      id: 1,
      title: 'Related Article Title 1',
      excerpt:
        'A short excerpt from the related article to give readers a preview of the content...',
      slug: '#',
    },
    {
      id: 2,
      title: 'Related Article Title 2',
      excerpt:
        'A short excerpt from the related article to give readers a preview of the content...',
      slug: '#',
    },
    {
      id: 3,
      title: 'Related Article Title 3',
      excerpt:
        'A short excerpt from the related article to give readers a preview of the content...',
      slug: '#',
    },
  ]

  return (
    <aside className={styles.relatedArticles}>
      <h3 className={styles.relatedTitle}>Related Articles</h3>
      <div className={styles.relatedGrid}>
        {relatedArticles.map((article) => (
          <div
            key={article.id}
            className={styles.relatedCard}
          >
            <div className={styles.relatedImageContainer}>
              <div className={styles.relatedImagePlaceholder} />
            </div>
            <h4 className={styles.relatedCardTitle}>{article.title}</h4>
            <p className={styles.relatedCardExcerpt}>{article.excerpt}</p>
            <Link
              href={article.slug}
              className={styles.relatedCardLink}
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </aside>
  )
}
