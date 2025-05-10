import { TRPCError } from '@trpc/server'

import { prisma } from '../../prisma/client'
import { t } from '../utils/createContext'
import { getBlogPostSchema, getAllBlogPostsSchema } from '../schemas/blog'

export const blogRouter = t.router({
  get: t.procedure
    .input(getBlogPostSchema.req)
    .output(getBlogPostSchema.res)
    .query(async ({ input }) => {
      try {
        const post = await prisma.blogPost.findUnique({
          where: {
            id: input.id,
            isPublished: true, // 公開済みの記事のみ取得可能
          },
          include: {
            author: {
              select: {
                id: true,
                role: true,
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
  getAll: t.procedure
    .input(getAllBlogPostsSchema.req)
    .output(getAllBlogPostsSchema.res)
    .query(async ({ input }) => {
      const limit = input.limit ?? 10
      const cursor = input.cursor
      const tag = input.tag

      try {
        const posts = await prisma.blogPost.findMany({
          take: limit + 1, // 次のページがあるかチェックするため1つ多く取得
          ...(cursor && {
            cursor: {
              id: cursor,
            },
          }),
          where: {
            isPublished: true, // 公開済みの記事のみ取得
            ...(tag && {
              tags: {
                some: {
                  name: tag,
                },
              },
            }),
          },
          orderBy: {
            createdAt: 'desc', // 新しい記事から表示
          },
          include: {
            author: {
              select: {
                id: true,
                role: true,
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
