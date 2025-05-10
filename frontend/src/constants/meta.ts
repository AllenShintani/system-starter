// META_CONFIG.ts
export interface MetaConfig {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogType: string
}

export const META_CONFIG: Record<string, MetaConfig> = {
  // Osinter向けトップページ
  '/': {
    title: 'Your Service X: OSINT Bounty Platform',
    description: 'Turn your OSINT skills into rewards by helping others. Register Now!',
    ogTitle: 'Your Service X: OSINT Bounty Platform',
    ogDescription: 'Turn your OSINT skills into rewards by helping others. Register Now!',
    ogImage: 'https://info-plat.tech/og-image.jpg',
    ogType: 'website',
  },
  // Osinter向けトップページ
  '/osint': {
    title: 'Your Service X: OSINT Bounty Platform',
    description: 'Turn your OSINT skills into rewards by helping others. Register Now!',
    ogTitle: 'Your Service X: OSINT Bounty Platform',
    ogDescription: 'Turn your OSINT skills into rewards by helping others. Register Now!',
    ogImage: 'https://info-plat.tech/og-image.jpg',
    ogType: 'website',
  },
  // ブログ一覧ページ（英語）
  '/blog': {
    title: 'Blog | Your Service X',
    description: 'Articles and insights from Your Service X on cybersecurity, OSINT, and more.',
    ogTitle: 'Blog | Your Service X',
    ogDescription: 'Articles and insights from Your Service X on cybersecurity, OSINT, and more.',
    ogImage: 'https://info-plat.tech/og-default.jpg',
    ogType: 'website',
  },
  // ブログ一覧ページ（日本語）
  '/blog/ja': {
    title: 'ブログ | Your Service X',
    description:
      'Hackers Guildによるサイバーセキュリティ、OSINT、その他の洞察やコンテンツをご覧ください。',
    ogTitle: 'ブログ | Your Service X',
    ogDescription:
      'Hackers Guildによるサイバーセキュリティ、OSINT、その他の洞察やコンテンツをご覧ください。',
    ogImage: 'https://info-plat.tech/og-default.jpg',
    ogType: 'website',
  },
  // 問い合わせページ
  '/contact': {
    title: 'Contact | Your Service X',
    description: 'Contact Your Service X',
    ogTitle: 'Contact | Your Service X',
    ogDescription: 'Get in touch with the Your Service X team for any questions or support needs.',
    ogImage: 'https://info-plat.tech/og-image.jpg',
    ogType: 'website',
  },
  // クライアント向けページの例
  '/client': {
    title: 'Client Page | Your Service X',
    description:
      'Want to entrust your information needs to professional cyber detectives? Your Service X has numerous cybersecurity investigation professionals registered and ready to help.',
    ogTitle: 'Client Dashboard | Your Service X',
    ogDescription:
      'Want to entrust your information needs to professional cyber detectives? Your Service X has numerous cybersecurity investigation professionals registered and ready to help.',
    ogImage: 'https://info-plat.tech/og-client.jpg',
    ogType: 'website',
  },
  // デフォルト設定（他のページで個別設定がない場合に使用）
  'default': {
    title: 'Your Service X - OSINT Bounty Platform',
    description:
      'Your Service X - Connect with developers sharing the strategies and revenue numbers behind their companies and side projects.',
    ogTitle: 'Your Service X',
    ogDescription: 'Turn your OSINT skills into rewards by helping others. Register Now!',
    ogImage: 'https://info-plat.tech/og-default.jpg',
    ogType: 'website',
  },
}
