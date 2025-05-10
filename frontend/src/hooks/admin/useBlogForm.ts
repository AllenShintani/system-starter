import { useState, useEffect } from 'react'
import type { CreateBlogPostInput } from '@your_service_name/backend/schemas'
import { trpc } from '@/utils/trpc'
import { useMarkdownEditor } from './useMarkdownEditor'
import { MAX_FILE_SIZE } from '@/constants/quest'

export const useBlogForm = () => {
  const defaultFormData: CreateBlogPostInput = {
    title: '',
    content: '',
    imageKey: '',
    isPublished: false,
    tags: [],
  }

  const [formData, setFormData] = useState<CreateBlogPostInput>(defaultFormData)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const markdownEditor = useMarkdownEditor(formData.content)

  // Update form data when markdown editor content changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, content: markdownEditor.content }))
  }, [markdownEditor.content])

  const getPresignedUrl = trpc.admin.blog.getPresignedUrl.useMutation()
  const { mutateAsync: createPost, isLoading } = trpc.admin.blog.createPost.useMutation({
    onSuccess: () => {
      alert('Blog post created successfully')
      setFormData(defaultFormData)
      markdownEditor.setContent('')
      setThumbnailFile(null)
      setThumbnailPreview('')
      setSubmissionError(null)
    },
    onError: (error) => {
      setSubmissionError(error.message)
      alert(error.message)
    },
  })

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    markdownEditor.handleChange(e)
    setFormData((prev) => ({ ...prev, content: e.target.value }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'isPublished' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds 5MB limit'
    }

    if (!file.type.startsWith('image/')) {
      return 'Please upload an image file'
    }

    return null
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !files[0]) return

    const file = files[0]
    const error = validateFile(file)

    if (error) {
      alert(error)
      e.target.value = ''
      return
    }

    setThumbnailFile(file)
    const objectUrl = URL.createObjectURL(file)
    setThumbnailPreview(objectUrl)
  }

  const uploadToS3 = async (file: File): Promise<string> => {
    try {
      const { presignedUrl, key } = await getPresignedUrl.mutateAsync({
        fileType: file.type,
      })

      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to upload file')
      }

      return key
    } catch (error) {
      console.error('Error uploading file:', error)
      if (error instanceof Error && error.message.includes('FORBIDDEN')) {
        alert('You do not have permission to upload blog posts')
      } else {
        alert('Failed to upload file')
      }
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissionError(null)

    if (!thumbnailFile) {
      setSubmissionError('Please select a thumbnail image')
      alert('Please select a thumbnail image')
      return
    }

    if (formData.tags.length === 0) {
      setSubmissionError('Please select at least one tag')
      alert('Please select at least one tag')
      return
    }

    // コンテンツ内の画像がすべてアップロードされているか確認
    const { isReady, content } = markdownEditor.getFinalContent()
    if (!isReady) {
      setSubmissionError('Images are still being uploaded. Please wait.')
      alert('Images are still being uploaded. Please wait.')
      return
    }

    // ブログのコンテンツには正しい画像URLを使用
    const updatedFormData = {
      ...formData,
      content,
    }

    try {
      setIsUploading(true)
      // サムネイル画像のアップロード
      const imageKey = await uploadToS3(thumbnailFile)

      // 記事の作成
      await createPost({
        ...updatedFormData,
        imageKey,
      })
    } catch (error) {
      console.error('Error creating blog post:', error)
      if (error instanceof Error && error.message.includes('FORBIDDEN')) {
        setSubmissionError('You do not have permission to create blog posts')
        alert('You do not have permission to create blog posts')
      } else {
        setSubmissionError('Failed to create blog post')
        alert('Failed to create blog post')
      }
    } finally {
      setIsUploading(false)
    }
  }

  const isSubmitting = isLoading || isUploading || getPresignedUrl.isLoading

  return {
    formData,
    thumbnailFile,
    thumbnailPreview,
    isSubmitting,
    isPreview,
    setIsPreview,
    markdownEditor,
    submissionError,
    handleContentChange,
    handleInputChange,
    handleTagToggle,
    handleThumbnailChange,
    handleSubmit,
  }
}
