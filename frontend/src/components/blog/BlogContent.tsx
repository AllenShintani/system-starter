'use client'

import { Fragment, useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import styles from '@/styles/app/blog/BlogPost.module.css'
import CTAButton from './CTAButton'
import { generateSafeId } from '@/utils/headingUtils'

interface BlogContentProps {
  content: string
  imageMap?: Record<string, string>
  lang?: 'ja' | 'en' // 言語情報を追加
}

// CTAボタン用の正規表現
const CTA_REGEX = /^:::cta{text="([^"]+)" url="([^"]+)"( variant="([^"]+)")?}$/

export default function BlogContent({ content, imageMap = {}, lang = 'en' }: BlogContentProps) {
  // バナーの表示状態を管理するステート
  const [showBanner, setShowBanner] = useState(true)

  // マークダウン内の目次リンクを修正するためのハンドラー
  useEffect(() => {
    // まず、すべての見出し要素を取得し、IDのマッピングを作成
    const headingElements = document.querySelectorAll('h1, h2, h3')
    const headingMap = new Map()

    headingElements.forEach((heading) => {
      const text = heading.textContent || ''
      const id = heading.id
      if (id) {
        // 見出しのテキストからIDへのマッピングを作成
        headingMap.set(text.trim(), id)
      }
    })

    // 次に、本文内のすべてのリンクを取得
    const internalLinks = document.querySelectorAll('a[href^="#"]')

    // 各リンクを修正
    internalLinks.forEach((link) => {
      const href = link.getAttribute('href')
      if (href && href.startsWith('#')) {
        // リンクテキストを取得
        const linkText = link.textContent || ''

        // リンク先の実際のIDを見つける（即時実行関数でconstを使用）
        const targetId = (() => {
          // すべての見出しを確認して、リンクが指している見出しを見つける
          for (const heading of headingElements) {
            const headingText = heading.textContent || ''
            if (headingText.includes(linkText) || linkText.includes(headingText)) {
              return heading.id
            }
          }
          return null
        })()

        // 見出しが見つかった場合、リンクを修正
        if (targetId) {
          link.setAttribute('href', `#${targetId}`)
        }
      }
    })
  }, [content]) // contentが変わったらリンクを再処理

  // 画像マップの適用
  const processImageSrc = (src: string): string => {
    // まず画像の代替テキストに基づいて画像マップから検索
    for (const [alt, mappedSrc] of Object.entries(imageMap)) {
      if (src.includes(alt)) {
        return mappedSrc
      }
    }

    // マップに見つからず、有効なURLなら現在のsrcを使用
    if (src && !src.startsWith('blob:')) {
      return src
    }

    return ''
  }

  // コンテンツを解析して、テキストブロックとCTAボタンに分割
  const contentBlocks = content.split('\n\n').map((block, index) => {
    // CTAボタンの構文をチェック
    const match = block.trim().match(CTA_REGEX)

    if (match) {
      const text = match[1]
      const url = match[2]
      const variant = (match[4] || 'primary') as 'primary' | 'secondary' | 'accent'

      return {
        type: 'cta' as const,
        id: `cta-${index}`,
        text,
        url,
        variant,
      }
    }

    return {
      type: 'markdown' as const,
      id: `md-${index}`,
      content: block,
    }
  })

  // 言語に応じたCTAコンテンツを設定
  const ctaText =
    lang === 'ja'
      ? '探偵、士業向けOSINT専門調査の協業募集！'
      : 'Contact us for OSINT investigation services!'

  const CTA_URL = 'https://app.spirinc.com/t/Ufauf-yQPo1CYQ0Jkp8lQ/as/E9bC6E-CX2os8j-goGmD3/confirm'

  return (
    <div className={styles.content}>
      {/* 記事本文の表示 */}
      {contentBlocks.map((block) => {
        if (block.type === 'cta') {
          return (
            <CTAButton
              key={block.id}
              text={block.text}
              url={block.url}
              variant={block.variant}
            />
          )
        }

        return (
          <Fragment key={block.id}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: (props) => {
                  // 安全なIDを生成（共通関数を使用）
                  const safeId = generateSafeId(String(props.children))

                  return (
                    <h1
                      className={styles.heading1}
                      id={safeId}
                      {...props}
                    />
                  )
                },
                h2: (props) => {
                  // 安全なIDを生成（共通関数を使用）
                  const safeId = generateSafeId(String(props.children))

                  return (
                    <h2
                      className={styles.heading2}
                      id={safeId}
                      {...props}
                    />
                  )
                },
                h3: (props) => {
                  // 安全なIDを生成（共通関数を使用）
                  const safeId = generateSafeId(String(props.children))

                  return (
                    <h3
                      className={styles.heading3}
                      id={safeId}
                      {...props}
                    />
                  )
                },
                a: (props) => {
                  // そのままのhrefで返す（useEffectでDOM操作により修正）
                  return (
                    <a
                      className={styles.contentLink}
                      {...props}
                    />
                  )
                },

                blockquote: (props) => (
                  <blockquote
                    className={styles.blockquote}
                    {...props}
                  />
                ),
                hr: () => <hr className={styles.horizontalRule} />,
                ol: (props) => (
                  <ol
                    className={styles.contentOrderedList}
                    {...props}
                  />
                ),
                ul: (props) => (
                  <ul
                    className={styles.customList}
                    {...props}
                  />
                ),
                li: (props) => (
                  <li
                    className={styles.unorderedListItem}
                    {...props}
                  />
                ),
                table: (props) => (
                  <div className={styles.tableContainer}>
                    <table
                      className={styles.contentTable}
                      {...props}
                    />
                  </div>
                ),
                img: (props) => {
                  const src = processImageSrc(props.src || '')
                  if (!src) {
                    return <span className={styles.missingImage}>[画像: {props.alt}]</span>
                  }

                  return (
                    <figure className={styles.imageContainer}>
                      <img
                        src={src}
                        alt={props.alt || ''}
                        className={styles.contentImage}
                      />
                      {props.alt && (
                        <figcaption className={styles.imageCaption}>{props.alt}</figcaption>
                      )}
                    </figure>
                  )
                },
                p: (props) => (
                  <p
                    className={styles.paragraph}
                    {...props}
                  />
                ),
              }}
            >
              {block.content}
            </ReactMarkdown>
          </Fragment>
        )
      })}

      {/* 固定表示するバナー画像CTA - showBannerステートで表示制御 */}
      {showBanner && (
        <div className={styles.bottomCta}>
          <button
            className={styles.closeButton}
            onClick={() => setShowBanner(false)}
            aria-label="バナーを閉じる"
          >
            ×
          </button>
          <Link
            href={CTA_URL}
            className={styles.bannerLink}
          >
            <img
              src="/blog/banar1456px_180px.png"
              alt={ctaText}
              className={styles.ctaBanner}
            />
          </Link>
        </div>
      )}
    </div>
  )
}
