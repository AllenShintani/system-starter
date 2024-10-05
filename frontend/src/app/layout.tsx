'use client'

import '../styles/globals.css'
import type { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '../utils/trpc'
import Loading from '@/components/Loading'
import React from 'react'

function RootLayout({ children }: { children: ReactNode }) {
  const { isLoading, isAuthorized } = useAuth()

  if (isLoading) {
    return (
      <html lang="ja">
        <body>
          <Loading />
        </body>
      </html>
    )
  }

  return (
    <html lang="ja">
      <body>{isAuthorized ? children : <Loading />}</body>
    </html>
  )
}

export default trpc.withTRPC(RootLayout)
