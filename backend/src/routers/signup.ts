import { TRPCError } from '@trpc/server'
import { googleUserSchema } from '../schemas/userSchemas'
import { z } from 'zod'
import { prisma } from '../../prisma/client'
import type { JwtPayload } from '../types/jwt'
import { t } from '../utils/createContext'
import { getAdminAuth } from '../lib/firebase/auth'

export const signupRouter = t.router({
  completeSignup: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        userName: z.string(),
        firebaseUid: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { email, userName, firebaseUid } = input
        const adminAuth = getAdminAuth()

        const userRecord = await adminAuth.getUser(firebaseUid)
        if (!userRecord.emailVerified) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Email not verified',
          })
        }

        const createUser = await prisma.user.create({
          data: {
            email,
            firebaseUid,
            userName,
          },
        })

        const jwtPayload: JwtPayload = {
          userId: createUser.id,
          role: createUser.role,
          userName: createUser.userName,
          profilePicture: createUser.profilePicture,
        }

        const token = ctx.fastify.jwt.sign(jwtPayload, {
          expiresIn: '7d',
          algorithm: 'HS256',
        })

        const domain =
          process.env.NODE_ENV === 'production' ? `${process.env.CUSTOM_DOMAIN}` : 'localhost'

        ctx.reply.setCookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          domain: domain,
        })

        return {
          success: true,
          user: {
            id: createUser.id,
            role: createUser.role,
            email: createUser.email,
            name: createUser.userName,
            profilePicture: createUser.profilePicture,
          },
        }
      } catch (error) {
        console.error(error)
        if (error instanceof TRPCError) {
          throw error
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        })
      }
    }),

  googleSignup: t.procedure
    .input(
      z.object({
        userData: googleUserSchema.req,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { userData } = input

      try {
        const parsed = googleUserSchema.req.safeParse(userData)
        if (!parsed.success) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: parsed.error.errors[0].message,
          })
        }

        const { email, firebaseToken, userName } = parsed.data
        const adminAuth = getAdminAuth()
        const decodedToken = await adminAuth.verifyIdToken(firebaseToken)
        const firebaseUid = decodedToken.uid

        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ email: email }, { firebaseUid: firebaseUid }],
          },
        })

        if (existingUser) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User already exists',
          })
        }

        const createUser = await prisma.user.create({
          data: {
            email,
            firebaseUid,
            userName,
          },
        })

        const jwtPayload: JwtPayload = {
          userId: createUser.id,
          role: createUser.role,
          userName: createUser.userName,
          profilePicture: createUser.profilePicture,
        }

        const token = ctx.fastify.jwt.sign(jwtPayload, {
          expiresIn: '7d',
          algorithm: 'HS256',
        })

        const domain =
          process.env.NODE_ENV === 'production' ? `${process.env.CUSTOM_DOMAIN}` : 'localhost'
        ctx.reply.setCookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          domain: domain,
        })

        return {
          success: true,
          user: {
            id: createUser.id,
            role: createUser.role,
            email: createUser.email,
            name: createUser.userName,
            profilePicture: createUser.profilePicture,
          },
          redirect: '/top',
        }
      } catch (error) {
        console.error(error)
        if (error instanceof TRPCError) {
          throw error
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        })
      }
    }),

  facebookSignup: t.procedure
    .input(
      z.object({
        userData: googleUserSchema.req,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { userData } = input

      try {
        const parsed = googleUserSchema.req.safeParse(userData)
        if (!parsed.success) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: parsed.error.errors[0].message,
          })
        }

        const { email, firebaseToken, userName } = parsed.data
        const adminAuth = getAdminAuth()
        const decodedToken = await adminAuth.verifyIdToken(firebaseToken)
        const firebaseUid = decodedToken.uid

        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ email: email }, { firebaseUid: firebaseUid }],
          },
        })

        if (existingUser) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User already exists',
          })
        }

        const createUser = await prisma.user.create({
          data: {
            email,
            firebaseUid,
            userName,
          },
        })

        const jwtPayload: JwtPayload = {
          userId: createUser.id,
          role: createUser.role,
          userName: createUser.userName,
          profilePicture: createUser.profilePicture,
        }

        const token = ctx.fastify.jwt.sign(jwtPayload, {
          expiresIn: '7d',
          algorithm: 'HS256',
        })

        const domain =
          process.env.NODE_ENV === 'production' ? `${process.env.CUSTOM_DOMAIN}` : 'localhost'
        ctx.reply.setCookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          domain: domain,
        })

        return {
          success: true,
          user: {
            id: createUser.id,
            role: createUser.role,
            email: createUser.email,
            name: createUser.userName,
            profilePicture: createUser.profilePicture,
          },
          redirect: '/top',
        }
      } catch (error) {
        console.error(error)
        if (error instanceof TRPCError) {
          throw error
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        })
      }
    }),

  getAuthToken: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        oobCode: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { email } = input

      try {
        const adminAuth = getAdminAuth()

        // メールアドレスでユーザーを検索
        const userRecord = await adminAuth.getUserByEmail(email)

        // カスタムトークンを生成
        const customToken = await adminAuth.createCustomToken(userRecord.uid)

        return {
          token: customToken,
        }
      } catch (error) {
        console.error('Error creating custom token:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create authentication token',
        })
      }
    }),
  checkEmailVerification: t.procedure
    .input(z.object({ firebaseUid: z.string() }))
    .query(async ({ input }) => {
      const adminAuth = getAdminAuth()
      try {
        const userRecord = await adminAuth.getUser(input.firebaseUid)
        return {
          isVerified: userRecord.emailVerified,
        }
      } catch (error) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }
    }),
})
