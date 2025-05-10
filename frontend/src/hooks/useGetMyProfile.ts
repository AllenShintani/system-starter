import type { User } from '@/types/user'
import { trpc } from '@/utils/trpc'
import { useState, useEffect } from 'react'

export const useGetMyProfile = () => {
  const [user, setUser] = useState<User | null>(null)

  // 最初に認証チェック
  const {
    data: authData,
    isLoading: authLoading,
    isError: authIsError,
    error: authError,
  } = trpc.signInRouter.checkAuth.useQuery()

  // 認証されている場合、完全なユーザーデータを取得
  const {
    data: userData,
    isLoading: userLoading,
    isError: userIsError,
    error: userError,
  } = trpc.userRouter.getUser.useQuery(undefined, {
    // 認証されている場合のみクエリを実行
    enabled: !!authData?.authenticated,
  })

  // 両方のクエリの状態を組み合わせる
  const isLoading = authLoading || (authData?.authenticated && userLoading)
  const isError = authIsError || userIsError
  const error = authError || userError

  useEffect(() => {
    // 認証されていない場合、ユーザーはnull
    if (!authData?.authenticated) {
      setUser(null)
      return
    }

    // 完全なユーザーデータが取得できたら使用
    if (userData) {
      setUser(userData)
    }
  }, [authData, userData])

  return { user, isLoading, isError, error }
}
