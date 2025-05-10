'use client'
import type { ReactNode } from 'react'
import '../input.css'
import { trpc } from '../utils/trpc'
import Loading from '@/components/utils/Loading'
import Head from '@/components/Head'
import Analytics from '@/components/Analytics'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

function RootLayout({ children }: { children: ReactNode }) {
  const { isAuthorized, isPublicRouteWithHP, isPublicRouteForHacker, isPublicRouteForClient } =
    useAuth()

  // Check if we're loading auth state
  const isLoading =
    !isAuthorized && !isPublicRouteForHacker && !isPublicRouteForClient && !isPublicRouteWithHP

  const renderContent = () => {
    if (isLoading) {
      return <Loading />
    }

    return (
      <main className="min-h-screen flex flex-col bg-white">
        {/* Simple header for navigation */}
        <header className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-bold text-cyan-500"
            >
              Your Service X
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-cyan-500"
              >
                ダッシュボード
              </Link>
              <Link
                href="/marketplace"
                className="text-gray-600 hover:text-cyan-500"
              >
                マーケットプレイス
              </Link>
              {isAuthorized ? (
                <Link
                  href="/signout"
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                >
                  ログアウト
                </Link>
              ) : (
                <Link
                  href="/signIn"
                  className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
                >
                  ログイン
                </Link>
              )}
            </nav>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-grow">{children}</div>

        {/* Simple footer */}
        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-600 text-sm">
                  &copy; {new Date().getFullYear()} Your Service X. All rights reserved.
                </p>
              </div>
              <div className="flex gap-6">
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-cyan-500 text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/data-deletion"
                  className="text-gray-600 hover:text-cyan-500 text-sm"
                >
                  Data Deletion
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    )
  }

  return (
    <html lang="ja">
      <Head />
      <body className="overflow-x-hidden w-full relative">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WXVMQ6MQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Analytics />
        {renderContent()}
      </body>
    </html>
  )
}

export default trpc.withTRPC(RootLayout)
