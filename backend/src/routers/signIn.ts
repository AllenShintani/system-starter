import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { signInSchema } from '../schemas/userSchemas'
import { prisma } from '../../prisma/client'
import type { JwtPayload } from '../types/jwt'
import { t } from '../utils/createContext'
import { getAdminAuth } from '../lib/firebase/auth'

export const signInRouter = t.router({
  signIn: t.procedure
    .input(z.object({ signInData: signInSchema.req }))
    .mutation(async ({ input, ctx }) => {
      const { signInData } = input
      const { email, password, token } = signInData

      try {
        const adminAuth = getAdminAuth()

        if (!email || !password || !token) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Email, password and token are required',
          })
        }

        const decodedToken = await adminAuth.verifyIdToken(token)
        const firebaseUid = decodedToken.uid

        const searchedUser = await prisma.user.findUnique({
          where: { firebaseUid },
        })

        if (!searchedUser) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })
        }

        const jwtPayload: JwtPayload = {
          userId: searchedUser.id,
          role: searchedUser.role,
          userName: searchedUser.userName,
          profilePicture: searchedUser.profilePicture,
        }

        const jwtToken = ctx.fastify.jwt.sign(jwtPayload, {
          expiresIn: '7d',
          algorithm: 'HS256',
        })

        const domain =
          process.env.NODE_ENV === 'production' ? `${process.env.CUSTOM_DOMAIN}` : 'localhost'
        ctx.reply.setCookie('token', jwtToken, {
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
            id: searchedUser.id,
            role: searchedUser.role,
            email: searchedUser.email,
            userName: searchedUser.userName,
            profilePicture: searchedUser.profilePicture,
          },
          redirect: '/top',
        }
      } catch (error) {
        console.error(error)
        if (error instanceof TRPCError) throw error

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        })
      }
    }),

  googleSignIn: t.procedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { token } = input

      try {
        const adminAuth = getAdminAuth()
        const decodedToken = await adminAuth.verifyIdToken(token)
        const firebaseUid = decodedToken.uid

        let searchedUser = await prisma.user.findUnique({
          where: { firebaseUid },
        })

        // ユーザーが存在しない場合は新規作成
        if (!searchedUser) {
          const firebaseUser = await adminAuth.getUser(firebaseUid)
          searchedUser = await prisma.user.create({
            data: {
              email: firebaseUser.email!,
              userName:
                firebaseUser.displayName || `user_${Math.random().toString(36).slice(2, 11)}`,
              firebaseUid: firebaseUid,
            },
          })
        }

        const jwtPayload: JwtPayload = {
          userId: searchedUser.id,
          role: searchedUser.role,
          userName: searchedUser.userName,
          profilePicture: searchedUser.profilePicture,
        }

        const jwtToken = ctx.fastify.jwt.sign(jwtPayload, {
          expiresIn: '7d',
          algorithm: 'HS256',
        })

        const domain =
          process.env.NODE_ENV === 'production' ? `${process.env.CUSTOM_DOMAIN}` : 'localhost'
        ctx.reply.setCookie('token', jwtToken, {
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
            id: searchedUser.id,
            role: searchedUser.role,
            email: searchedUser.email,
            userName: searchedUser.userName,
            profilePicture: searchedUser.profilePicture,
          },
          redirect: '/top',
        }
      } catch (error) {
        console.error(error)
        if (error instanceof TRPCError) throw error

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        })
      }
    }),

  githubSignIn: t.procedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { token } = input

      try {
        const adminAuth = getAdminAuth()
        const decodedToken = await adminAuth.verifyIdToken(token)
        const firebaseUid = decodedToken.uid

        let searchedUser = await prisma.user.findUnique({
          where: { firebaseUid },
        })

        // ユーザーが存在しない場合は新規作成
        if (!searchedUser) {
          const firebaseUser = await adminAuth.getUser(firebaseUid)
          searchedUser = await prisma.user.create({
            data: {
              email: firebaseUser.email!,
              userName:
                firebaseUser.displayName || `user_${Math.random().toString(36).slice(2, 11)}`,
              firebaseUid: firebaseUid,
            },
          })
        }

        const jwtPayload: JwtPayload = {
          userId: searchedUser.id,
          role: searchedUser.role,
          userName: searchedUser.userName,
          profilePicture: searchedUser.profilePicture,
        }

        const jwtToken = ctx.fastify.jwt.sign(jwtPayload, {
          expiresIn: '7d',
          algorithm: 'HS256',
        })

        const domain =
          process.env.NODE_ENV === 'production' ? `${process.env.CUSTOM_DOMAIN}` : 'localhost'
        ctx.reply.setCookie('token', jwtToken, {
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
            id: searchedUser.id,
            role: searchedUser.role,
            email: searchedUser.email,
            userName: searchedUser.userName,
            profilePicture: searchedUser.profilePicture,
          },
          redirect: '/top',
        }
      } catch (error) {
        console.error(error)
        if (error instanceof TRPCError) throw error

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        })
      }
    }),

  facebookSignIn: t.procedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { token } = input

      try {
        const adminAuth = getAdminAuth()
        const decodedToken = await adminAuth.verifyIdToken(token)
        const firebaseUid = decodedToken.uid

        let searchedUser = await prisma.user.findUnique({
          where: { firebaseUid },
        })

        // ユーザーが存在しない場合は新規作成
        if (!searchedUser) {
          const firebaseUser = await adminAuth.getUser(firebaseUid)
          searchedUser = await prisma.user.create({
            data: {
              email: firebaseUser.email!,
              userName:
                firebaseUser.displayName || `user_${Math.random().toString(36).slice(2, 11)}`,
              firebaseUid: firebaseUid,
            },
          })
        }

        const jwtPayload: JwtPayload = {
          userId: searchedUser.id,
          role: searchedUser.role,
          userName: searchedUser.userName,
          profilePicture: searchedUser.profilePicture,
        }

        const jwtToken = ctx.fastify.jwt.sign(jwtPayload, {
          expiresIn: '7d',
          algorithm: 'HS256',
        })

        const domain =
          process.env.NODE_ENV === 'production' ? `${process.env.CUSTOM_DOMAIN}` : 'localhost'
        ctx.reply.setCookie('token', jwtToken, {
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
            id: searchedUser.id,
            role: searchedUser.role,
            email: searchedUser.email,
            userName: searchedUser.userName,
            profilePicture: searchedUser.profilePicture,
          },
          redirect: '/top',
        }
      } catch (error) {
        console.error(error)
        if (error instanceof TRPCError) throw error

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        })
      }
    }),

  logout: t.procedure.mutation(async ({ ctx }) => {
    ctx.reply.clearCookie('token', {
      path: '/',
      secure: true,
      sameSite: 'none',
    })
    return { success: true, redirect: '/signIn' }
  }),

  checkAuth: t.procedure.query(async ({ ctx }) => {
    try {
      const token = ctx.request.cookies.token
      if (!token) return { authenticated: false, redirect: '/signIn', user: null }

      const decoded = ctx.fastify.jwt.verify<JwtPayload>(token)
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      })
      if (!user) return { authenticated: false, redirect: '/signIn', user: null }

      return {
        authenticated: true,
        user: {
          id: user.id,
          role: user.role,
          email: user.email,
          userName: user.userName,
          profilePicture: user.profilePicture,
          isVerified: user.isVerified,
        },
        redirect: '/top',
      }
    } catch (error) {
      console.error(error)
      return { authenticated: false, redirect: '/signIn', user: null }
    }
  }),
})
