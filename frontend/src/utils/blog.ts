import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/types/blog'

// マークダウンファイルの場所を特定する関数
function findBlogMarkdownDirectory() {
  // 可能性のあるパスの配列
  const possiblePaths = [
    path.join(process.cwd(), 'src/blog-markdown/posts'),
    path.join(process.cwd(), 'blog-markdown/posts'),
  ]

  // 存在するパスを探す
  for (const dirPath of possiblePaths) {
    if (fs.existsSync(dirPath)) return dirPath
  }

  // 見つからない場合はデフォルトパスを返す
  console.warn('ブログマークダウンディレクトリが見つかりませんでした。デフォルトパスを使用します。')
  return path.join(process.cwd(), 'src/blog-markdown/posts')
}

// マークダウンファイルのパス
const postsDirectory = findBlogMarkdownDirectory()

/**
 * すべてのブログ記事を取得する関数
 * @param language 言語フィルター（指定しない場合はすべての記事を返す）
 */
export function getAllPosts(language?: 'ja' | 'en'): BlogPost[] {
  try {
    // ディレクトリが存在するか確認
    if (!fs.existsSync(postsDirectory)) {
      console.error(`ブログ記事のディレクトリが存在しません: ${postsDirectory}`)
      return []
    }

    // マークダウンファイル名を取得
    const fileNames = fs.readdirSync(postsDirectory)

    // マークダウンファイルを処理
    const allPosts = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName, index) => {
        try {
          // 連番をIDとスラグとして使用
          const numericId = (index + 1).toString()

          // マークダウンファイルの内容を読み込む
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, 'utf8')

          // gray-matterでフロントマターとコンテンツを分離
          const matterResult = matter(fileContents)

          // フロントマターからデータを取得
          const title = matterResult.data.title || ''
          const date = matterResult.data.date || ''
          const author = matterResult.data.author || ''
          const tags = Array.isArray(matterResult.data.tags) ? matterResult.data.tags : []
          const thumbnail = matterResult.data.thumbnail || ''
          const description = matterResult.data.description || ''
          // フロントマターから言語を取得（指定がない場合はデフォルトで日本語）
          const blogLanguage = matterResult.data.language || 'ja'

          // BlogPostオブジェクトを作成
          const post: BlogPost = {
            id: numericId,
            slug: numericId,
            title,
            date,
            author,
            tags,
            thumbnail,
            description,
            content: matterResult.content,
            language: blogLanguage as 'ja' | 'en',
          }

          return post
        } catch (error) {
          console.error(`ファイル ${fileName} の処理中にエラーが発生しました:`, error)
          return null
        }
      })
      .filter(Boolean) as BlogPost[]

    // 言語でフィルタリング（指定がある場合）
    const filteredPosts = language
      ? allPosts.filter((post) => post.language === language)
      : allPosts

    // 日付でソート（新しい順）
    return filteredPosts.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('ブログ記事の取得中にエラーが発生しました:', error)
    return []
  }
}

/**
 * 特定のスラグのブログ記事を取得する関数
 * @param slug 記事のスラグ
 * @param language 言語フィルター（指定しない場合はすべての言語から探す）
 */
export function getPostBySlug(slug: string, language?: 'ja' | 'en'): BlogPost | null {
  try {
    // 言語指定がある場合はフィルター付きで記事を取得
    const allPosts = language ? getAllPosts(language) : getAllPosts()

    // 連番に一致する記事を探す
    const post = allPosts.find((post) => post.slug === slug)

    return post || null
  } catch (error) {
    console.error(`ブログ記事 ${slug} の取得中にエラーが発生しました:`, error)
    return null
  }
}

/**
 * マークダウンをHTMLに変換する関数
 */
export function processMarkdown(content: string): string {
  // 各変換処理を関数化して、letを使わずにチェーンで処理する
  const processHeadings = (text: string): string => {
    return text
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
  }

  const processParagraphs = (text: string): string => {
    return text.replace(/^(?!<h[1-6]>)(.*?)$/gm, (match) => {
      if (match.trim() === '') return match
      return `<p>${match}</p>`
    })
  }

  const processFormatting = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
  }

  const processImages = (text: string): string => {
    return text.replace(/!\[(.*?)\]\((.*?)\)/g, (_match, alt, url) => {
      const trimmedAlt = alt.trim()
      return `<img src="${url}" alt="${trimmedAlt}" class="content-image" />`
    })
  }

  // 各処理を順番に適用する
  return processImages(processFormatting(processParagraphs(processHeadings(content))))
}
