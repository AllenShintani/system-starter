import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { AppRouter } from '@project_name/backend/routers'

const API_HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : `${process.env.NEXT_PUBLIC_API_HOST}`

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
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
    }
  },
  ssr: false,
})
