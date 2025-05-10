import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '../../prisma/client'
import { t } from '../utils/createContext'
import { getAdminAuth } from '../lib/firebase/auth'
import { createHmac } from 'crypto'

interface FacebookSignedRequest {
  algorithm: string
  expires: number
  issued_at: number
  user_id: string
}

const base64UrlDecode = (input: string): Buffer => {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  return Buffer.from(base64, 'base64')
}

const verifySignedRequest = (signedRequest: string): FacebookSignedRequest => {
  const [encodedSig, payload] = signedRequest.split('.')

  if (!encodedSig || !payload) {
    throw new Error('Invalid signed request format')
  }

  const appSecret = process.env.FACEBOOK_APP_SECRET
  if (!appSecret) {
    throw new Error('Facebook app secret is not configured')
  }

  // シグネチャを検証
  const sig = base64UrlDecode(encodedSig)
  const expectedSig = createHmac('sha256', appSecret).update(payload).digest()

  if (!sig.equals(expectedSig)) {
    throw new Error('Invalid signature')
  }

  // ペイロードをデコード
  const data = JSON.parse(base64UrlDecode(payload).toString('utf8'))

  // 必須フィールドを検証
  if (!data.user_id || !data.algorithm || !data.issued_at) {
    throw new Error('Invalid payload structure')
  }

  // アルゴリズムを検証
  if (data.algorithm !== 'HMAC-SHA256') {
    throw new Error('Invalid algorithm')
  }

  // 有効期限を検証
  if (data.expires && data.expires < Math.floor(Date.now() / 1000)) {
    throw new Error('Request has expired')
  }

  return data as FacebookSignedRequest
}

export const userDataDeleteRouter = t.router({
  facebookDataDeletion: t.procedure
    .input(
      z.object({
        signed_request: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const decodedRequest = verifySignedRequest(input.signed_request)
        const adminAuth = getAdminAuth()

        // 削除リクエストの一意のID
        const deletionId = `fb_${decodedRequest.user_id}_${Date.now()}`

        try {
          const firebaseUser = await adminAuth.getUserByProviderUid(
            'facebook.com',
            decodedRequest.user_id
          )

          // Prismaからユーザーを検索
          const user = await prisma.user.findFirst({
            where: {
              firebaseUid: firebaseUser.uid,
            },
          })

          if (user) {
            // データベースからユーザーを削除
            await prisma.user.delete({
              where: {
                id: user.id,
              },
            })
          }

          // Firebaseユーザーを削除
          await adminAuth.deleteUser(firebaseUser.uid)
        } catch (error) {
          console.log('User not found or already deleted:', error)
        }

        const statusUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/data-deletion/confirmation?id=${deletionId}`

        return {
          url: statusUrl,
          confirmation_code: deletionId,
        }
      } catch (error) {
        console.error('Facebook data deletion error:', error)
        if (error instanceof TRPCError) {
          throw error
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred during data deletion',
        })
      }
    }),

  checkDeletionStatus: t.procedure
    .input(
      z.object({
        confirmation_code: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        // confirmation_codeからFacebook user_idを抽出
        const [prefix, fbUserId] = input.confirmation_code.split('_')

        if (prefix !== 'fb' || !fbUserId) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid confirmation code',
          })
        }

        const adminAuth = getAdminAuth()

        try {
          await adminAuth.getUserByProviderUid('facebook.com', fbUserId)
          return {
            status: 'pending',
            message: 'Data deletion is in progress',
          }
        } catch (error) {
          return {
            status: 'complete',
            message: 'Data has been successfully deleted',
          }
        }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error checking deletion status',
        })
      }
    }),
})
