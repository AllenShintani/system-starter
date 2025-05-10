import { TRPCError } from '@trpc/server'
import { prisma } from '../../../prisma/client'
import { t } from '../../utils/createContext'
import { adminProcedure } from '../../utils/verifyAuth'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import s3Client from '../../utils/s3Client'
import { v4 as uuidv4 } from 'uuid'

import { z } from 'zod'
import { createBlogPostSchema, getBlogPostSchema, getAllBlogPostsSchema } from '../../schemas/blog'
import { S3_BUCKET_NAME } from '../../constants'

export const adminBlogRouter = t.router({
  // 画像アップロード用のPresigned URL取得
  getPresignedUrl: adminProcedure
    .input(
      z.object({
        fileType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const uuid = uuidv4()
        const key = `blog/img/${uuid}`

        const command = new PutObjectCommand({
          Bucket: S3_BUCKET_NAME,
          Key: key,
          ContentType: input.fileType,
        })

        const presignedUrl = await getSignedUrl(s3Client, command, {
          expiresIn: 3600,
        })

        return {
          presignedUrl,
          key,
        }
      } catch (error) {
        console.error('Error generating presigned URL:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to generate presigned URL',
        })
      }
    }),

  // ブログ記事作成
  createPost: adminProcedure.input(createBlogPostSchema.req).mutation(async ({ input, ctx }) => {
    try {
      const thumbnailUrl = `https://${S3_BUCKET_NAME}.s3.ap-northeast-1.amazonaws.com/${input.imageKey}`

      await prisma.blogPost.create({
        data: {
          ...input,
          thumbnailUrl,
          authorId: ctx.user.userId,
          tags: {
            create: input.tags.map((tagName) => ({
              name: tagName,
            })),
          },
        },
      })

      return
    } catch (error) {
      console.error('Error in createBlogPost:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof TRPCError ? error.message : 'Failed to create blog post',
      })
    }
  }),

  // 単一のブログ記事取得
  getPost: t.procedure
    .input(getBlogPostSchema.req)
    .output(getBlogPostSchema.res)
    .query(async ({ input }) => {
      try {
        const post = await prisma.blogPost.findUnique({
          where: { id: input.id },
          include: {
            author: {
              select: {
                id: true,
                role: true,
                email: true,
                userName: true,
                profilePicture: true,
              },
            },
            tags: true,
          },
        })

        if (!post) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Blog post not found',
          })
        }

        return post
      } catch (error) {
        console.error('Error in getBlogPost:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof TRPCError ? error.message : 'Failed to get blog post',
        })
      }
    }),

  // ブログ記事一覧取得（ページネーション付き）
  getAllPosts: t.procedure
    .input(getAllBlogPostsSchema.req)
    .output(getAllBlogPostsSchema.res)
    .query(async ({ input }) => {
      const limit = input.limit ?? 10
      const cursor = input.cursor
      const tag = input.tag

      try {
        const posts = await prisma.blogPost.findMany({
          take: limit + 1,
          ...(cursor && {
            cursor: {
              id: cursor,
            },
          }),
          where: {
            isPublished: true,
            ...(tag && {
              tags: {
                some: {
                  name: tag,
                },
              },
            }),
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: {
              select: {
                id: true,
                role: true,
                email: true,
                userName: true,
                profilePicture: true,
              },
            },
            tags: true,
          },
        })

        let nextCursor: string | null = null
        if (posts.length > limit) {
          const nextItem = posts.pop()
          nextCursor = nextItem?.id ?? null
        }

        return {
          items: posts,
          nextCursor,
        }
      } catch (error) {
        console.error('Error in getAllBlogPosts:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get blog posts',
        })
      }
    }),
})
