import { initTRPC } from '@trpc/server'
import { signupRouter } from './signup'
import { signInRouter } from './signIn'
import { userRouter } from './user'
import { storageRouter } from './storage'
import { adminBlogRouter } from './admin/blog'
import { blogRouter } from './blog'

const t = initTRPC.create()

export const appRouter = t.router({
  blogRouter,
  signupRouter,
  signInRouter,
  storageRouter,
  userRouter,
  admin: t.router({
    blog: adminBlogRouter,
  }),
})
export type AppRouter = typeof appRouter
