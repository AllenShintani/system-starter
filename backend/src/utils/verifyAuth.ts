import { TRPCError } from '@trpc/server'
import type { JwtPayload } from '../types/jwt'
import type {
  FastifyInstance,
  RawServerDefault,
  FastifyBaseLogger,
  FastifyTypeProviderDefault,
  FastifyRequest,
  RouteGenericInterface,
  FastifySchema,
  FastifyReply,
} from 'fastify'
import type { ResolveFastifyRequestType } from 'fastify/types/type-provider'
import type { IncomingMessage, ServerResponse } from 'http'
import { t } from './createContext'

export const verifyAuth = (ctx: {
  fastify: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProviderDefault
  >
  request: FastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    IncomingMessage,
    FastifySchema,
    FastifyTypeProviderDefault,
    unknown,
    FastifyBaseLogger,
    ResolveFastifyRequestType<FastifyTypeProviderDefault, FastifySchema, RouteGenericInterface>
  >
  reply: FastifyReply<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    RouteGenericInterface,
    unknown,
    FastifySchema,
    FastifyTypeProviderDefault,
    unknown
  >
}): JwtPayload => {
  const token = ctx.request.cookies.token
  if (!token) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    })
  }
  try {
    const decoded = ctx.fastify.jwt.verify(token)
    return decoded as JwtPayload
  } catch (error) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid token',
    })
  }
}

export const isClientUser = t.middleware(async ({ ctx, next }) => {
  const decoded = verifyAuth(ctx)
  if (decoded.role !== 'CLIENT_USER') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have permission to access this resource',
    })
  }
  return next({
    ctx: {
      ...ctx,
      user: decoded,
    },
  })
})

export const clientUserProcedure = t.procedure.use(isClientUser)

export const isAdmin = t.middleware(async ({ ctx, next }) => {
  const decoded = verifyAuth(ctx)
  if (decoded.role !== 'SUPER_ADMIN') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have permission to access this resource',
    })
  }
  return next({
    ctx: {
      ...ctx,
      user: decoded,
    },
  })
})

export const adminProcedure = t.procedure.use(isAdmin)
