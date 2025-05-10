'use client'
import { useAuth } from '@/hooks/useAuth'
import Loading from '@/components/utils/Loading'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { PUBLIC_ROUTES, SIGNIN_ROUTES_FOR_HACKER_USER } from '@/constants/authPath'

interface AuthProtectionProps {
  children: ReactNode
}

export function AuthProtection({ children }: AuthProtectionProps) {
  const { isLoading: authLoading, isAuthorized } = useAuth()
  const pathname = usePathname()

  const isAuthRoute = useMemo(() => {
    if (!pathname) return false
    return SIGNIN_ROUTES_FOR_HACKER_USER.includes(pathname)
  }, [pathname])

  const isPublicRoute = useMemo(() => {
    if (!pathname) return false
    return PUBLIC_ROUTES.includes(pathname)
  }, [pathname])

  // 認証チェック中は常にローディング
  if (authLoading) {
    return <Loading />
  }

  // 認証済みユーザーが認証ルート(/signIn, /signup)にアクセスした場合は
  // リダイレクトされるまでローディングを表示
  if (isAuthorized && isAuthRoute) {
    return <Loading />
  }

  // 認証済みの場合はコンテンツを表示
  if (isAuthorized) {
    return <>{children}</>
  }

  // 非認証状態でもパブリックルートor認証ルートの場合はコンテンツを表示
  if (!isAuthorized && (isPublicRoute || isAuthRoute)) {
    return <>{children}</>
  }

  // それ以外の場合はなにも表示しない
  return null
}
