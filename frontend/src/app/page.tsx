'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { LogIn, Twitter, GlobeIcon, ShieldCheckIcon, HandHeartIcon } from 'lucide-react'
import FeatureCard from '@/components/top/FeatureCard'

const Mission = dynamic(() => import('@/components/top/about/Mission'), {
  ssr: true,
  loading: () => (
    <div className="w-full h-[150px] bg-black/30 rounded-lg flex items-center justify-center text-cyan-400/70 font-mono">
      Loading...
    </div>
  ),
})

const Founders = dynamic(() => import('@/components/top/about/Founder'), {
  ssr: true,
  loading: () => (
    <div className="w-full h-[150px] bg-black/30 rounded-lg flex items-center justify-center text-cyan-400/70 font-mono">
      Loading...
    </div>
  ),
})

const Contact = dynamic(() => import('@/components/top/about/Contact'), {
  ssr: true,
  loading: () => (
    <div className="w-full h-[150px] bg-black/30 rounded-lg flex items-center justify-center text-cyan-400/70 font-mono">
      Loading...
    </div>
  ),
})

const features = [
  {
    icon: (
      <HandHeartIcon
        size={40}
        className="text-cyan-400"
      />
    ),
    title: 'Personal Data Ownership',
    description:
      '自分の行動データを自分で管理し、価値化できます。GAFAに吸い取られていた個人のデータを、個人が自らの資産として扱います。',
  },
  {
    icon: (
      <GlobeIcon
        size={40}
        className="text-cyan-400"
      />
    ),
    title: 'Human Investment',
    description:
      'データ販売を超えた、人間そのものへの投資という新しい信用構造を実現します。個人の価値と将来性に投資できます。',
  },
  {
    icon: (
      <ShieldCheckIcon
        size={40}
        className="text-cyan-400"
      />
    ),
    title: 'Secure Value Exchange',
    description:
      'YouTube視聴履歴などの行動ログをトークン化し、安全に価値交換できるシステムを提供します。情報の価値を可視化します。',
  },
]

// メインページコンポーネント
const TopPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      <Script
        id="video-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            'name': 'Your Service X - 人間の価値を可視化するプラットフォーム',
            'description':
              '自分の行動ログから価値を生み出し、トークンとして流通させるプラットフォーム',
            'thumbnailUrl': 'https://i.ytimg.com/vi/_QBnHsqvPFc/mqdefault.jpg',
            'uploadDate': '2025-01-01T08:00:00+08:00',
            'contentUrl': 'https://www.youtube.com/watch?v=_QBnHsqvPFc',
            'embedUrl':
              'https://www.youtube.com/embed/_QBnHsqvPFc?si=ZyU5qt4TIPr1KZlE&rel=0&modestbranding=1',
            'duration': 'PT0M30S',
            'author': {
              '@type': 'Organization',
              'name': 'Your Service X',
            },
          }),
        }}
      />

      {/* ヘッダーナビゲーション */}
      <div className="fixed top-8 right-8 flex flex-row items-center gap-4 z-50 md:top-8 md:right-8 md:gap-4 sm:top-4 sm:right-4 sm:gap-2">
        <Link
          href="/signIn"
          className="inline-flex items-center gap-2 py-3 px-6 bg-[rgba(0,24,24,0.7)] border border-cyan-400/20 rounded-full text-cyan-400 no-underline font-mono text-base transition-all duration-300 whitespace-nowrap will-change-[background-color,border-color] hover:bg-[rgba(0,40,40,0.8)] hover:border-cyan-400/40 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,255,255,0.3)] sm:py-2 sm:px-4 sm:text-sm"
        >
          <LogIn className="w-5 h-5 sm:w-4 sm:h-4" />
          <span>Sign in</span>
        </Link>
        <Link
          href="https://x.com/HackersGui1d"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center p-3 bg-[rgba(0,24,24,0.7)] border border-cyan-400/20 rounded-full text-cyan-400 no-underline transition-all duration-300 whitespace-nowrap will-change-[background-color,border-color] hover:bg-[rgba(0,40,40,0.8)] hover:border-cyan-400/40 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)] sm:p-2"
          aria-label="Your Service X Twitter"
        >
          <Twitter className="w-5 h-5 sm:w-4 sm:h-4" />
        </Link>
      </div>

      {/* メインコンテンツ */}
      <main className="relative z-10 flex-grow flex items-center justify-center min-h-screen pt-32 pb-32 mt-8 max-w-screen overflow-x-hidden">
        <div className="flex flex-col items-center text-center relative w-full max-w-7xl mx-auto px-8 opacity-100 animate-[fadeIn_1.2s_ease-out_forwards] will-change-[opacity,transform]">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent tracking-widest uppercase font-mono relative will-change-[transform,opacity] before:content-[''] before:absolute before:-top-5 before:-left-5 before:-right-5 before:-bottom-5 before:border-2 before:border-cyan-400/10 before:rounded-md before:animate-[pulse_3s_infinite]">
            Your Service X
          </h1>
          <h2 className="text-lg md:text-2xl text-white/80 max-w-3xl px-4 tracking-wider leading-relaxed mb-12 font-mono relative after:content-[''] after:absolute after:-bottom-5 after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-1 after:bg-gradient-to-r after:from-transparent after:via-cyan-400 after:to-transparent">
            人間の価値を可視化するプラットフォーム
          </h2>
          <Link
            href="/signup"
            className="inline-block py-4 px-10 text-xl text-black bg-gradient-to-r from-cyan-400 to-cyan-300 border-none rounded-full cursor-pointer font-mono font-bold no-underline transition-all duration-300 relative overflow-hidden mb-16 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-[0.5s] hover:before:left-[100%] sm:py-3 sm:px-8 sm:text-base sm:mb-12"
          >
            Sign up Now!
          </Link>

          <Suspense
            fallback={
              <div className="w-full h-[150px] bg-black/30 rounded-lg flex items-center justify-center text-cyan-400/70 font-mono">
                Loading...
              </div>
            }
          >
            <Mission />
          </Suspense>

          <div className="w-full my-16 rounded-[20px] overflow-hidden relative">
            <picture>
              <source
                srcSet="/home/platform.avif"
                type="image/avif"
              />
              <source
                srcSet="/home/platform.webp"
                type="image/webp"
              />
              <Image
                src="/home/platform.jpg"
                alt="Service explanation"
                className="w-full h-auto max-h-[600px] object-cover rounded-[20px] shadow-[0_0_20px_rgba(0,255,255,0.2)] will-change-transform group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]"
                width={1200}
                height={700}
                priority={false}
                loading="lazy"
              />
            </picture>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-8 mb-16">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <Suspense
            fallback={
              <div className="w-full h-[150px] bg-black/30 rounded-lg flex items-center justify-center text-cyan-400/70 font-mono">
                Loading...
              </div>
            }
          >
            <Founders />
          </Suspense>

          <Suspense
            fallback={
              <div className="w-full h-[150px] bg-black/30 rounded-lg flex items-center justify-center text-cyan-400/70 font-mono">
                Loading...
              </div>
            }
          >
            <Contact />
          </Suspense>
        </div>
      </main>

      <footer className="bg-black/80 backdrop-blur-sm border-t border-cyan-400/10 py-12 px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <p className="text-white/70 font-mono text-sm">
              &copy; {new Date().getFullYear()} Your Service X. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-cyan-400/80 hover:text-cyan-400 transition-colors duration-300 font-mono text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/data-deletion"
              className="text-cyan-400/80 hover:text-cyan-400 transition-colors duration-300 font-mono text-sm"
            >
              Data Deletion
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TopPage
