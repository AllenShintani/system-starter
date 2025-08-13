'use client'

import { trpc } from '@/utils/trpc'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const publicRoutes = ['/login', '/signup']

export function useAuth() {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const { data: authData, isLoading } = trpc.loginRouter.checkAuth.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  })

  const isPublicRoute = (path: string | null): boolean => {
    if (path === null) return false
    const trimmedPath = path.endsWith('/') ? path.slice(0, -1) : path
    return publicRoutes.some(
      (route) => trimmedPath === route || trimmedPath.startsWith(`${route}/`)
    )
  }

  useEffect(() => {
    if (isLoading || authData === undefined || !pathname) return

    const currentRouteIsPublic = isPublicRoute(pathname)

    if (authData.authenticated && currentRouteIsPublic) {
      router.push('/')
    } else if (!authData.authenticated && !currentRouteIsPublic) {
      router.push('/login')
    } else {
      setIsAuthorized(true)
    }
  }, [isLoading, authData, router, pathname])

  return { isLoading, authData, isAuthorized }
}
