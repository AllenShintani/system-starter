import { TRPCError } from '@trpc/server'
import { t } from '../utils/createContext'
import { prisma } from '../../prisma/client'
import type { JwtPayload } from '../types/jwt'

// 認証済みユーザー用のミドルウェア
export const authedProcedure = t.procedure.use(async ({ ctx, next }) => {
  try {
    const token = ctx.request.cookies.token
    if (!token) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'ログインが必要です',
      })
    }

    const decoded = ctx.fastify.jwt.verify<JwtPayload>(token)
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'ユーザーが見つかりません',
      })
    }

    return next({
      ctx: {
        ...ctx,
        user: {
          id: user.id,
          role: user.role,
          email: user.email,
        },
      },
    })
  } catch (error) {
    if (error instanceof TRPCError) throw error

    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'セッションの有効期限が切れました',
    })
  }
})

// 特定のロールを持つユーザーのみアクセス可能なミドルウェア
export const roleProtectedProcedure = (allowedRoles: string[]) => {
  return authedProcedure.use(async ({ ctx, next }) => {
    if (!allowedRoles.includes(ctx.user.role)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'このアクションの権限がありません',
      })
    }
    return next({ ctx })
  })
}
