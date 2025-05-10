'use client'

import Link from 'next/link'
import styles from '@/styles/components/blog/CTAButton.module.css'
import { ArrowRight } from 'lucide-react'

interface CTAButtonProps {
  text: string
  url: string
  variant?: 'primary' | 'secondary' | 'accent'
  isFixed?: boolean // 固定表示用のフラグを追加
}

export default function CTAButton({
  text,
  url,
  variant = 'primary',
  isFixed = false,
}: CTAButtonProps) {
  const buttonClassName = `${styles.ctaButton} ${styles[variant]} ${
    isFixed ? styles.fixedButton : ''
  }`

  // If URL is internal (starts with /), use Link component
  if (url.startsWith('/')) {
    return (
      <div className={styles.ctaContainer}>
        <Link
          href={url}
          className={buttonClassName}
        >
          {text}
          {isFixed && (
            <ArrowRight
              className={styles.ctaIcon}
              size={18}
            />
          )}
        </Link>
      </div>
    )
  }

  // Otherwise use a regular anchor tag for external links
  return (
    <div className={styles.ctaContainer}>
      <a
        href={url}
        className={buttonClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
        {isFixed && (
          <ArrowRight
            className={styles.ctaIcon}
            size={18}
          />
        )}
      </a>
    </div>
  )
}
