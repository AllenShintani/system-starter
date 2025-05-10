/* eslint-disable */
'use client'

import { trpc } from '@/utils/trpc'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { isPathWithSidebar, isPathWithBottomNav } from '@/constants/barPath'
import {
  PUBLIC_ROUTES,
  SIGNIN_ROUTES_FOR_HACKER_USER,
  SIGNIN_ROUTES_FOR_CLIENT_USER,
} from '@/constants/authPath'

export function useAuth() {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isInitialCheck, setIsInitialCheck] = useState(true)

  // isClientPathの判定をuseAuthに移動
  const isClientPath = useMemo(() => pathname?.startsWith('/client'), [pathname])

  // isPublicRouteForHackerの判定を移動
  const isPublicRouteForHacker = useMemo(
    () => PUBLIC_ROUTES.some((route) => pathname?.startsWith(route)),
    [pathname],
  )

  // isPublicRouteForClientの判定を移動
  const isPublicRouteForClient = useMemo(
    () => SIGNIN_ROUTES_FOR_CLIENT_USER.some((route) => pathname?.startsWith(route)),
    [pathname],
  )

  // shouldShowSidebarの判定を移動
  const shouldShowSidebar = useMemo(() => isPathWithSidebar(pathname), [pathname])

  // shouldShowBottomNavの判定を移動
  const shouldShowBottomNav = useMemo(() => isPathWithBottomNav(pathname), [pathname])

  const {
    data: authData,
    isLoading,
    refetch,
  } = trpc.signInRouter.checkAuth.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: 5 * 60 * 1000,
  })

  // パス判定のヘルパー関数
  const isHackerSignInRoute = useCallback((path: string | null): boolean => {
    if (!path) return false
    return SIGNIN_ROUTES_FOR_HACKER_USER.some((route) => path.startsWith(route))
  }, [])

  const isPublicRouteWithHP = useCallback((path: string | null): boolean => {
    if (!path) return false
    return PUBLIC_ROUTES.some((route) => path.includes(route))
  }, [])

  const isClientSignInRoute = useCallback((path: string | null): boolean => {
    if (!path) return false
    return SIGNIN_ROUTES_FOR_CLIENT_USER.some((route) => path.startsWith(route))
  }, [])

  const isClientPathHelper = useCallback((path: string | null): boolean => {
    if (!path) return false
    return path.startsWith('/client')
  }, [])

  // const isOsintPathHelper = useCallback((path: string | null): boolean => {
  //   if (!path) return false
  //   return path.startsWith('/osint')
  // }, [])

  // リダイレクト処理
  const handleRedirect = useCallback(
    (isAuthenticated: boolean, currentPath: string) => {
      const isCurrentRouteWithHackerSignIn = isHackerSignInRoute(currentPath)
      const isCurrentRouteWithClientSignIn = isClientSignInRoute(currentPath)
      const isClientPathCurrent = isClientPathHelper(currentPath)
      const currentRouteIsClientSignIn = isClientSignInRoute(currentPath)
      const isCurrentRouteWithPublicHP = isPublicRouteWithHP(currentPath)
      // console.log('path:', currentPath)

      // 認証状態とパスの組み合わせでケースを判断
      switch (true) {
        // ケース1: 未認証状態
        case !isAuthenticated:
          // サブケース: 公開ページの場合は何もリダイレクトしない
          if (isCurrentRouteWithPublicHP) {
            // console.log(4)
            break
          }

          // サブケース: OSINTERパス (clientパスでない) & サインイン系のページではない時
          if (!isClientPathCurrent && !isCurrentRouteWithHackerSignIn) {
            // console.log(0)
            router.replace('/signIn')
            break
          }

          // サブケース: Clientパス & 認証が必要なページ
          if (!isCurrentRouteWithClientSignIn && !currentRouteIsClientSignIn) {
            // console.log(1)
            router.replace('/client/signIn')
            break
          }
          break

        // ケース2: 認証済み状態
        case isAuthenticated:
          // console.log(true)
          // サブケース: OSINTERパスでログインページにいる場合
          if (!isClientPathCurrent && isCurrentRouteWithHackerSignIn) {
            // console.log(2)
            router.replace('/top')
            break
          }

          // サブケース: Clientのログインページか公開ページにいる場合
          if (currentRouteIsClientSignIn || isCurrentRouteWithClientSignIn) {
            // console.log(3)
            router.replace('/client/home')
            break
          }
          break
      }
    },

    [isHackerSignInRoute, isClientSignInRoute, isClientPathHelper, isPublicRouteWithHP, router],
  )

  useEffect(() => {
    if (!pathname || isLoading) return

    const handleAuthenticationCheck = async () => {
      try {
        const updatedAuthData = await refetch()
        const isAuthenticated = !!updatedAuthData.data?.authenticated

        setIsAuthorized(isAuthenticated)

        // 初回チェック時のみリダイレクトを実行
        if (isInitialCheck) {
          handleRedirect(isAuthenticated, pathname)
          setIsInitialCheck(false)
        }
      } catch (error) {
        console.error('Authentication check failed:', error)
        setIsAuthorized(false)
      }
    }

    handleAuthenticationCheck()
  }, [pathname, isLoading, refetch, handleRedirect, isInitialCheck])

  return {
    isLoading: isLoading || isInitialCheck,
    isAuthorized,
    user: authData?.user || null,
    refetchAuth: refetch,
    isClientPath,
    isPublicRouteForHacker,
    isPublicRouteForClient,
    shouldShowSidebar,
    shouldShowBottomNav,
    isPublicRouteWithHP,
  }
}
