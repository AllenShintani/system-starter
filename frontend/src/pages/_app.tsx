import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const publicRoutes = ['/login', '/signup']

function MyApp({ Component, pageProps }: AppProps) {
  const { isLoading, authData } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!isLoading && authData !== undefined) {
      const isPublicRoute = publicRoutes.includes(router.pathname)
      if (authData.authenticated && isPublicRoute) {
        router.push('/')
      } else if (!authData.authenticated && !isPublicRoute) {
        router.push('/login')
      } else {
        setIsAuthorized(true)
      }
    }
  }, [isLoading, authData, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthorized) {
    return null
  }

  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
