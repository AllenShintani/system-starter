// frontend/src/utils/trpc.ts
import { createTRPCNext } from '@trpc/next'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@your_service_name/backend/routers'

const API_HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : `${process.env.NEXT_PUBLIC_API_HOST}`

// 明示的な型定義
type TRPCNextClient = ReturnType<typeof createTRPCNext<AppRouter>>

// createTRPCNextの戻り値の型を明示的に指定
export const trpc: TRPCNextClient = createTRPCNext<AppRouter>({
  config: () => ({
    links: [
      httpBatchLink({
        url: `${API_HOST}/trpc`,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: 'include',
          })
        },
      }),
    ],
  }),
  ssr: false,
})
