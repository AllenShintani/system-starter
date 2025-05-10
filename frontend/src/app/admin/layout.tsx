'use client'

import { useGetMyProfile } from '@/hooks/useGetMyProfile'
import Loading from '@/components/utils/Loading'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useGetMyProfile()

  // ローディング中の表示
  if (isLoading) {
    return <Loading />
  }

  // ユーザーが存在しない場合
  if (!user) {
    return <Loading />
  }

  // SUPER_ADMINユーザーのみコンテンツを表示
  if (user.role === 'SUPER_ADMIN') {
    return <>{children}</>
  } else {
    return (
      <div>
        <h2>権限エラー</h2>
        <p>このページにアクセスする権限がありません。</p>
      </div>
    )
  }
}
