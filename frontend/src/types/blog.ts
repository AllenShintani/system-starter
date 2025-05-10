export interface BlogPost {
  id: string | number
  slug: string
  title: string
  date: string
  author: string
  tags: string[]
  thumbnail: string
  description: string
  content: string
  language: 'ja' | 'en'
}
