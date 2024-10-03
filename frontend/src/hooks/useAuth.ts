import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { trpc } from '@/utils/trpc'

const publicRoutes = ['/login', '/signup']

export function useAuth() {
  const router = useRouter()
  const {
    data: authData,
    error,
    isLoading,
  } = trpc.checkAuth.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!isLoading && authData !== undefined) {
      const isPublicRoute = publicRoutes.includes(router.pathname)
      if (authData.authenticated && isPublicRoute) {
        router.push('/')
      } else if (!authData.authenticated && !isPublicRoute) {
        router.push('/login')
      }
    }
  }, [isLoading, authData, router])

  return { isLoading, authData }
}
