'use client'

import Script from 'next/script'

interface ArticleJsonLdProps {
  articleData: {
    headline: string
    description: string
    image: string
    datePublished: string
    dateModified?: string
    authorName: string
    publisherName: string
    publisherLogo: string
    url: string
  }
}

const ArticleJsonLd = ({ articleData }: ArticleJsonLdProps) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': articleData.headline,
    'description': articleData.description,
    'image': articleData.image,
    'datePublished': articleData.datePublished,
    'dateModified': articleData.dateModified || articleData.datePublished,
    'author': {
      '@type': 'Person',
      'name': articleData.authorName,
    },
    'publisher': {
      '@type': 'Organization',
      'name': articleData.publisherName,
      'logo': {
        '@type': 'ImageObject',
        'url': articleData.publisherLogo,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': articleData.url,
    },
  }

  return (
    <Script
      id="article-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default ArticleJsonLd
