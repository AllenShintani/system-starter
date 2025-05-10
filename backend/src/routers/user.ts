import { TRPCError } from '@trpc/server'
import { prisma } from '../../prisma/client'
import type { JwtPayload } from '../types/jwt'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type z from 'zod'
import s3Client from '../utils/s3Client'
import { updateResponseSchema, updateUserSchema, userResponseSchema } from '../schemas/userSchemas'
import { t } from '../utils/createContext'
import { S3_BUCKET_NAME } from '../constants'

const userSelect = {
  id: true,
  role: true,
  email: true,
  userName: true,
  firstName: true,
  lastName: true,
  profilePicture: true,
  address: true,
  dateOfBirth: true,
  isVerified: true,
}

const generateProfilePictureData = async (
  input: z.infer<typeof updateUserSchema.req>,
  userId: string
): Promise<{ profilePictureUrl: string; signedUrl: string } | undefined> => {
  if (
    input.profilePicture &&
    'fileName' in input.profilePicture &&
    'fileType' in input.profilePicture
  ) {
    const { fileName, fileType } = input.profilePicture
    const key = `profile-pictures/${userId}/${fileName}`

    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    })

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    })
    const profilePictureUrl = `https://${S3_BUCKET_NAME}.s3.ap-northeast-1.amazonaws.com/${key}`

    return { profilePictureUrl, signedUrl }
  }
  return undefined
}

export const userRouter = t.router({
  getUser: t.procedure.output(userResponseSchema.res).query(async ({ ctx }) => {
    try {
      const token = ctx.request.cookies.token
      if (!token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        })
      }

      const decoded = ctx.fastify.jwt.verify<JwtPayload>(token)

      // Force refresh from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: userSelect,
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      return {
        ...user,
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.toISOString() : null,
      }
    } catch (error) {
      console.error('Error in getUser:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch user information',
      })
    }
  }),

  update: t.procedure
    .input(updateUserSchema.req)
    .output(updateResponseSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const token = ctx.request.cookies.token
        if (!token) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Not authenticated',
          })
        }
        const decoded = ctx.fastify.jwt.verify<JwtPayload>(token)

        const profilePictureData = await generateProfilePictureData(input, decoded.userId)

        const updatedUser = await prisma.user.update({
          where: { id: decoded.userId },
          data: {
            ...input,
            dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : undefined,
            profilePicture: profilePictureData?.profilePictureUrl,
          },
          select: userSelect,
        })

        const response = {
          success: true as const,
          user: {
            ...updatedUser,
            dateOfBirth: updatedUser.dateOfBirth ? updatedUser.dateOfBirth.toISOString() : null,
          },
          ...(profilePictureData && {
            signedUrl: profilePictureData.signedUrl,
            profilePictureUrl: profilePictureData.profilePictureUrl,
          }),
        }

        return response
      } catch (error) {
        console.error('Error in update:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update user information',
        })
      }
    }),
})
