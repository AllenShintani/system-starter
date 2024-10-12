import { trpc } from '@/utils/trpc'
import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
}

export const useGetMyProfile = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const {
    data,
    isLoading,
    isError: trpcIsError,
    error: trpcError,
  } = trpc.loginRouter.checkAuth.useQuery()

  useEffect(() => {
    data?.authenticated ? setUser(data.user) : setUser(null)
  }, [data, trpcIsError, trpcError])

  return { user, isLoading, isError, error }
}
