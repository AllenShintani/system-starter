import z from 'zod'

const authorResponseSchema = z.object({
  id: z.string().uuid(),
  role: z.string(),
  userName: z.string().nullable(),
  profilePicture: z.string().nullable(),
})

const blogTagSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

const baseBlogPostSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  content: z.string().min(1, '本文は必須です'),
  imageKey: z.string().min(1, 'サムネイル画像は必須です'),
  isPublished: z.boolean().default(false),
  tags: z
    .array(z.string(), {
      required_error: 'タグは必須です',
      invalid_type_error: 'タグは文字列の配列である必要があります',
    })
    .min(1, '最低1つのタグを設定してください'),
})

const blogPostResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  imageKey: z.string(),
  isPublished: z.boolean(),
  authorId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  thumbnailUrl: z.string(),
  author: authorResponseSchema,
  tags: z.array(blogTagSchema),
})

export const createBlogPostSchema = {
  req: baseBlogPostSchema,
}

export const getBlogPostSchema = {
  req: z.object({
    id: z.string().uuid('有効なIDを入力してください'),
  }),
  res: blogPostResponseSchema,
}

export const getAllBlogPostsSchema = {
  req: z.object({
    limit: z.number().optional(),
    cursor: z.string().optional(),
    tag: z.string().optional(),
  }),
  res: z.object({
    items: z.array(blogPostResponseSchema),
    nextCursor: z.string().nullable(),
  }),
}

// Input types
export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema.req>
export type GetBlogPostInput = z.infer<typeof getBlogPostSchema.req>
export type GetAllBlogPostsInput = z.infer<typeof getAllBlogPostsSchema.req>

// Response types
export type GetBlogPostResponse = z.infer<typeof getBlogPostSchema.res>
export type GetAllBlogPostsResponse = z.infer<typeof getAllBlogPostsSchema.res>

// Utility types
export type BlogTag = z.infer<typeof blogTagSchema>
