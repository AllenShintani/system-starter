import type { AppRouter } from '@your_service_name/backend/routers'
import type { inferRouterOutputs } from '@trpc/server'

export type RouterOutput = inferRouterOutputs<AppRouter>
export type User = RouterOutput['userRouter']['getUser']
