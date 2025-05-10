import Link from 'next/link'
import styles from '@/styles/components/blog/BlogPostCard.module.css'
import type { BlogPost } from '@/types/blog'

interface BlogPostCardProps {
  post: BlogPost
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const postUrl = post.language === 'ja' ? `/blog/ja/${post.slug}` : `/blog/${post.slug}`

  return (
    <div className={styles.card}>
      <Link href={postUrl}>
        <div className={styles.thumbnailContainer}>
          <img
            src={post.thumbnail}
            alt={post.title}
            className={styles.thumbnail}
          />
        </div>
        <div className={styles.content}>
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
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.excerpt}>{post.description}</p>
          <div className={styles.meta}>
            <span className={styles.date}>{post.date}</span>
            <span className={styles.author}>By {post.author}</span>
            <span className={styles.language}>{post.language === 'ja' ? '🇯🇵' : '🇺🇸'}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogPostCard
