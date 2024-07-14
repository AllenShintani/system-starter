import { useRouter } from 'next/router'
import { useEffect, useState, useRef, useCallback } from 'react'

const useAuthCheck = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const isMountedRef = useRef(true)
  const isRedirectingRef = useRef(false)

  const publicRoutes = ['/signup', '/login']
  const isPublicRoute = publicRoutes.includes(router.pathname)

  const redirectTo = useCallback(
    async (path: string) => {
      if (isRedirectingRef.current) return

      isRedirectingRef.current = true
      await router.push(path)
      isRedirectingRef.current = false
    },
    [router],
  )

  const handleAuthError = useCallback(
    (error: unknown) => {
      console.error('Error checking authentication:', error)
      if (!isPublicRoute) redirectTo('/login')
    },
    [isPublicRoute, redirectTo],
  )

  const getAuthStatus = async () => {
    const response = await fetch('/api/checkAuth', {
      method: 'GET',
      credentials: 'include',
    })
    const data = await response.json()
    return response.ok && data.isAuthenticated
  }

  const checkAuth = useCallback(async () => {
    const isAuthenticated = await getAuthStatus().catch(handleAuthError)

    if (isAuthenticated === undefined) return

    if (!isAuthenticated && !isPublicRoute) {
      await redirectTo('/login')
    } else if (isAuthenticated && isPublicRoute) {
      await redirectTo('/workspace')
    }

    setLoading(false)
  }, [isPublicRoute, redirectTo, handleAuthError])

  useEffect(() => {
    isMountedRef.current = true
    checkAuth()

    return () => {
      isMountedRef.current = false
    }
  }, [checkAuth, router.pathname])

  return { loading }
}

export default useAuthCheck
