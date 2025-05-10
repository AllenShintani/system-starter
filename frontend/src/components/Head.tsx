'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import type { MetaConfig } from '@/constants/meta'
import { META_CONFIG } from '@/constants/meta'
import EnhancedJsonLd from './EnhancedJsonLd'

const Head = () => {
  const pathname = usePathname()

  // パスに基づいてメタ情報を取得
  const metaInfo = useMemo(() => {
    // 完全一致するパスを確認
    if (pathname && META_CONFIG[pathname]) {
      return META_CONFIG[pathname]
    }

    // ブログ記事ページか判定する関数
    const isBlogPostPage = (path: string | null): boolean => {
      if (!path) return false

      // 英語のブログ記事: /blog/{slug}
      if (/^\/blog\/[^/]+$/.test(path) && !path.includes('/ja/')) return true

      // 日本語のブログ記事: /blog/ja/{slug}
      if (/^\/blog\/ja\/[^/]+$/.test(path)) return true

      return false
    }

    // ブログ記事ページの場合は動的メタ情報を設定
    if (pathname && isBlogPostPage(pathname)) {
      // このクライアントコンポーネントでは記事の実際の内容は取得できないため
      // ブログ記事用の汎用的なメタ情報を設定
      return {
        title: 'Blog Post | Your Service X',
        description: 'Read our latest insights and articles on Your Service X Blog.',
        ogTitle: 'Blog Post | Your Service X',
        ogDescription: 'Read our latest insights and articles on Your Service X Blog.',
        ogImage: 'https://info-plat.tech/og-default.jpg',
        ogType: 'article',
      }
    }

    // パスパターンを判定する関数
    const getMetaConfig = (path: string | null): MetaConfig => {
      if (path?.startsWith('/client')) return META_CONFIG['/client']
      if (path?.startsWith('/contact')) return META_CONFIG['/contact']
      if (path?.startsWith('/osint')) return META_CONFIG['/osint']
      if (path?.startsWith('/blog/ja') && !isBlogPostPage(path)) return META_CONFIG['/blog/ja']
      if (path?.startsWith('/blog') && !isBlogPostPage(path)) return META_CONFIG['/blog']
      if (path === '/') return META_CONFIG['/']
      return META_CONFIG['default']
    }

    // 前方一致で確認 (サブパスへの対応)
    const metaConfig = getMetaConfig(pathname)

    return metaConfig
  }, [pathname])

  return (
    <>
      <title>{metaInfo.title}</title>
      {/* デフォルトのメタタグ（全ページ共通） */}
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta
        name="description"
        content={metaInfo.description}
      />

      {/* 多言語対応構造化データ */}
      <EnhancedJsonLd />

      {/* OGP（Open Graph Protocol）タグ */}
      <meta
        property="og:title"
        content={metaInfo.ogTitle}
      />
      <meta
        property="og:description"
        content={metaInfo.ogDescription}
      />
      <meta
        property="og:url"
        content={`https://info-plat.tech${pathname || ''}`}
      />
      <meta
        property="og:image"
        content={metaInfo.ogImage}
      />
      <meta
        property="og:image:width"
        content="1200"
      />
      <meta
        property="og:image:height"
        content="630"
      />
      <meta
        property="og:type"
        content={metaInfo.ogType}
      />
      <meta
        property="og:site_name"
        content="Your Service X"
      />

      {/* Twitter Card タグ */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:title"
        content={metaInfo.ogTitle}
      />
      <meta
        name="twitter:description"
        content={metaInfo.ogDescription}
      />
      <meta
        name="twitter:image"
        content={metaInfo.ogImage}
      />

      <Script
        id="google-tag-manager"
        strategy="lazyOnload"
      >
        {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WXVMQ6MQ');
          `}
      </Script>
    </>
  )
}

export default Head
