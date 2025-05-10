'use client'

import Link from 'next/link'
import styles from '@/styles/components/blog/ArticleFooter.module.css'

export default function ArticleFooter() {
  // ソーシャルシェア用の関数
  const handleShare = (platform: string) => {
    // todo: 実際の実装ではウィンドウを開いてソーシャルメディアでシェアするロジックを追加
    console.info(`Sharing on ${platform}`)
  }

  return (
    <div className={styles.articleFooter}>
      <div className={styles.footerShare}>
        <span>Share this article:</span>
        <div className={styles.socialButtons}>
          <button
            className={`${styles.socialButton} ${styles.twitterButton}`}
            onClick={() => handleShare('Twitter')}
          >
            Twitter
          </button>
          <button
            className={`${styles.socialButton} ${styles.linkedinButton}`}
            onClick={() => handleShare('LinkedIn')}
          >
            LinkedIn
          </button>
          <button
            className={`${styles.socialButton} ${styles.facebookButton}`}
            onClick={() => handleShare('Facebook')}
          >
            Facebook
          </button>
        </div>
      </div>
      <div className={styles.footerNav}>
        <Link
          href="#"
          className={styles.footerNavLink}
        >
          ← Previous Article
        </Link>
        <Link
          href="#"
          className={styles.footerNavLink}
        >
          Next Article →
        </Link>
      </div>
    </div>
  )
}
