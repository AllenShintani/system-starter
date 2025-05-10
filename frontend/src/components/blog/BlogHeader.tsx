'use client'

import { Clock, User, Calendar } from 'lucide-react'
import styles from '@/styles/components/blog/BlogHeader.module.css'
import { useReadingTime } from '@/hooks/useMarkdownProcessor'

interface BlogPost {
  title: string
  date: string
  author: string
  tags: string[]
  content: string
}

interface BlogHeaderProps {
  post: BlogPost
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  const readingTime = useReadingTime(post.content)

  return (
    <div className={styles.postHeader}>
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className={styles.tag}
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <Calendar size={16} />
          <span className={styles.date}>{post.date}</span>
        </div>
        <div className={styles.metaItem}>
          <User size={16} />
          <span className={styles.author}>By {post.author}</span>
        </div>
        <div className={styles.metaItem}>
          <Clock size={16} />
          <span className={styles.readTime}>{readingTime} min read</span>
        </div>
      </div>
    </div>
  )
}
