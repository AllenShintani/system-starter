'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/app/blog/TableOfContents.module.css'
import { generateSafeId } from '@/utils/headingUtils'

interface TOCItem {
  id: string
  text: string
  index: number
}

interface TableOfContentsProps {
  contentSelector: string
  lang?: 'ja' | 'en'
}

export default function TableOfContents({ contentSelector, lang = 'en' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])

  useEffect(() => {
    // DOMが読み込まれた後に見出しを取得
    const contentElement = document.querySelector(contentSelector)
    if (!contentElement) return

    // 本文の見出しを取得（メインの見出しだけを目次に含める）
    const headingElements = contentElement.querySelectorAll('h2')

    const items: TOCItem[] = []
    headingElements.forEach((heading) => {
      // 安全なIDを生成（BlogContentと同じ方法で）
      const headingText = heading.textContent || ''

      // 「目次」という見出しは目次に含めない
      if (headingText.trim() === '目次' || headingText.trim() === 'Table of Contents') {
        return
      }

      // 共通の関数を使用して安全なIDを生成
      const safeId = generateSafeId(headingText)

      // IDが無い場合は設定する
      if (!heading.id) {
        heading.id = safeId
      }

      items.push({
        id: heading.id || safeId,
        text: headingText,
        index: items.length + 1, // フィルタリング後の実際の位置に基づいて番号付け
      })
    })

    setHeadings(items)
  }, [contentSelector])

  // 言語に応じたテキスト設定
  const tocTitle = lang === 'ja' ? '目次' : 'Table of Contents'

  if (headings.length === 0) {
    return null
  }

  return (
    <div className={styles.tableOfContents}>
      <h2 className={styles.tocTitle}>{tocTitle}</h2>
      <nav>
        <div className={styles.tocList}>
          {headings.map((heading) => (
            <div
              key={`${heading.id}-${heading.index}`}
              className={styles.tocItem}
            >
              <a
                href={`#${heading.id}`}
                className={styles.tocLink}
              >
                <span className={styles.tocNumber}>{heading.index}.</span>
                <span className={styles.tocText}>{heading.text}</span>
              </a>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}
