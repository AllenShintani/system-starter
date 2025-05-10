import { useState, useRef, useCallback, useEffect } from 'react'
import { trpc } from '@/utils/trpc'
import { MAX_FILE_SIZE } from '@/constants/quest'

interface MarkdownShortcut {
  key: string
  value: string
  startOffset: number
  endOffset: number
}

export interface UploadedImage {
  id: string
  url: string
  alt: string
  s3Key?: string // S3キーを追加
}

const MARKDOWN_SHORTCUTS: { [key: string]: MarkdownShortcut } = {
  'Ctrl-b': { key: 'bold', value: '**text**', startOffset: 2, endOffset: 2 },
  'Ctrl-i': { key: 'italic', value: '*text*', startOffset: 1, endOffset: 1 },
  'Ctrl-`': { key: 'code', value: '`code`', startOffset: 1, endOffset: 1 },
  'Ctrl-1': { key: 'h1', value: '# ', startOffset: 2, endOffset: 0 },
  'Ctrl-2': { key: 'h2', value: '## ', startOffset: 3, endOffset: 0 },
  'Ctrl-3': { key: 'h3', value: '### ', startOffset: 4, endOffset: 0 },
}

export const useMarkdownEditor = (initialValue = '') => {
  const [content, setContent] = useState(initialValue)
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const [isComposing, setIsComposing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])

  const getPresignedUrl = trpc.admin.blog.getPresignedUrl.useMutation()

  const insertText = useCallback((text: string, startOffset: number) => {
    const textarea = editorRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(end)

    const textToInsert = text.replace(/text/g, selectedText || 'text')
    const newContent = beforeText + textToInsert + afterText
    setContent(newContent)

    // カーソル位置を更新
    const newCursorPos = selectedText ? start + textToInsert.length : start + startOffset

    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(
        newCursorPos,
        newCursorPos + (selectedText ? 0 : 4) // "text"の長さ
      )
    })
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (isComposing) return

      const isMac = navigator.platform.toLowerCase().includes('mac')
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey
      const key = `${ctrlKey ? 'Ctrl-' : ''}${e.key}`

      const shortcut = MARKDOWN_SHORTCUTS[key]
      if (shortcut && ctrlKey) {
        e.preventDefault()
        insertText(shortcut.value, shortcut.startOffset)
      }
    },
    [insertText, isComposing]
  )

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }, [])

  const validateImageFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds 5MB limit'
    }

    if (!file.type.startsWith('image/')) {
      return 'Please upload an image file'
    }

    return null
  }

  const uploadToS3 = async (file: File): Promise<{ url: string; key: string }> => {
    try {
      // S3プリサインドURLを取得
      const response = await getPresignedUrl.mutateAsync({
        fileType: file.type,
      })

      const { presignedUrl, key } = response

      // S3へアップロード
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to S3')
      }

      // S3のURLを構築
      const imageUrl = `https://${
        presignedUrl.split('.s3.')[0].split('//')[1]
      }.s3.ap-northeast-1.amazonaws.com/${key}`

      return { url: imageUrl, key }
    } catch (error) {
      console.error('Error uploading to S3:', error)
      throw error
    }
  }

  // 画像をS3にアップロードし、マークダウンを更新
  const handleImageUpload = async (file: File): Promise<void> => {
    const error = validateImageFile(file)
    if (error) {
      alert(error)
      return
    }

    try {
      setIsUploading(true)

      // 一時的なローカルプレビュー用にblobURLを作成
      const blobUrl = URL.createObjectURL(file)

      // 仮マークダウンをエディタに挿入（ユーザーがすぐに見れるように）
      const tempId = `temp-${Date.now()}`
      const tempMarkdown = `![${file.name}](${blobUrl})`
      insertText(tempMarkdown, tempMarkdown.length)

      // ローカルのアップロード済み画像リストに追加
      const tempImage: UploadedImage = {
        id: tempId,
        url: blobUrl,
        alt: file.name,
      }
      setUploadedImages((prev) => [...prev, tempImage])

      // S3への実際のアップロード
      const { url: s3Url, key: s3Key } = await uploadToS3(file)

      // エディタのコンテンツでblobURLをS3URLに置き換える
      const updatedContent = editorRef.current?.value.replace(
        new RegExp(
          `!\\[${file.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]\\(${blobUrl.replace(
            /[.*+?^${}()|[\]\\]/g,
            '\\$&'
          )}\\)`,
          'g'
        ),
        `![${file.name}](${s3Url})`
      )

      if (updatedContent) {
        setContent(updatedContent)
      }

      // アップロード済み画像リストを更新
      setUploadedImages((prev) =>
        prev.map((img) => (img.id === tempId ? { ...img, url: s3Url, s3Key } : img))
      )
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  // コンテンツからブログマークダウン画像構文を抽出
  useEffect(() => {
    const imageRegex = /!\[(.*?)\]\((.*?)\)/g
    const matches = Array.from(content.matchAll(imageRegex))

    const images: UploadedImage[] = matches.map((match) => {
      const [, alt, url] = match
      const id = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      return { id, alt, url }
    })

    // すでに追跡されている画像のS3キー情報を保持
    const updatedImages = images.map((newImg) => {
      const existingImg = uploadedImages.find((img) => img.url === newImg.url)
      if (existingImg && existingImg.s3Key) {
        return { ...newImg, s3Key: existingImg.s3Key }
      }
      return newImg
    })

    setUploadedImages(updatedImages)
  }, [content, uploadedImages])

  // 編集完了時に最終的なマークダウンを取得（すべての画像がS3アップロード済み）
  const getFinalContent = useCallback(() => {
    // blob URLを含むマークダウンをチェック
    const blobRegex = /!\[(.*?)\]\((blob:http:\/\/localhost:[0-9]+\/[a-zA-Z0-9-]+)\)/g
    if (blobRegex.test(content)) {
      // まだアップロード中またはアップロードされていない画像がある
      return { isReady: false, content }
    }

    return { isReady: true, content }
  }, [content])

  return {
    content,
    setContent,
    editorRef,
    isComposing,
    setIsComposing,
    handleKeyDown,
    handleChange,
    insertText,
    handleImageUpload,
    isUploading,
    uploadedImages,
    getFinalContent,
  }
}
