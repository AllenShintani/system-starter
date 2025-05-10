'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { MULTILINGUAL_ORGANIZATION_DATA } from '@/constants/multilingual-organization'

const EnhancedJsonLd = () => {
  const pathname = usePathname()
  const isJapanese = pathname?.includes('/ja') || false
  const lang = isJapanese ? 'ja' : 'en'

  const organizationData = MULTILINGUAL_ORGANIZATION_DATA

  // 組織情報の構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${organizationData.url}#organization`,
    'name': organizationData.name,
    'url': organizationData.url,
    'logo': {
      '@type': 'ImageObject',
      'url': organizationData.logo,
    },
    'description': organizationData.description[lang],
    'alternateName': organizationData.alternateName[lang],
    'legalName': organizationData.legalName[lang],
    'sameAs': organizationData.sameAs,
    'foundingDate': organizationData.foundingDate,
    'founder': [
      {
        '@type': 'Person',
        'name': organizationData.founder[0].name[lang],
      },
    ],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': organizationData.address.streetAddress[lang],
      'addressLocality': organizationData.address.addressLocality[lang],
      'addressRegion': organizationData.address.addressRegion[lang],
      'addressCountry': organizationData.address.addressCountry,
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': organizationData.contactPoint.contactType[lang],
      'email': organizationData.contactPoint.email,
      'availableLanguage': organizationData.contactPoint.availableLanguage,
    },
  }

  // ウェブサイト情報の構造化データ
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${organizationData.url}#website`,
    'name': organizationData.name,
    'url': organizationData.url,
    'description': organizationData.description[lang],
    'publisher': {
      '@id': `${organizationData.url}#organization`,
    },
    'inLanguage': lang,
  }

  return (
    <>
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="website-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  )
}

export default EnhancedJsonLd
