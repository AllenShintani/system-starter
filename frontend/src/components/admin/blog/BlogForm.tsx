'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { Eye, Edit2, Image, Loader } from 'lucide-react'
import styles from '@/styles/app/admin/UploadBlog.module.css'
import { ThumbnailUpload } from './ThumbnailUpload'
import { TagSelector } from './TagSelector'
import { useBlogForm } from '@/hooks/admin/useBlogForm'

const BlogForm: React.FC = () => {
  const {
    formData,
    thumbnailFile,
    thumbnailPreview,
    isSubmitting,
    isPreview,
    setIsPreview,
    markdownEditor,
    handleContentChange,
    handleInputChange,
    handleTagToggle,
    handleThumbnailChange,
    handleSubmit,
  } = useBlogForm()

  // マークダウンをHTMLに変換する（画像処理も含む）
  const [previewHtml, setPreviewHtml] = useState<string>('')

  useEffect(() => {
    if (!markdownEditor.content) {
      setPreviewHtml('')
      return
    }

    // 画像のマッピングを作成
    const imageMap: Record<string, string> = {}
    markdownEditor.uploadedImages.forEach((img) => {
      imageMap[img.alt.trim()] = img.url
    })

    // まず非画像部分のマークダウンをパース
    const processedHtml = processMarkdown(markdownEditor.content, imageMap)
    setPreviewHtml(processedHtml)
  }, [markdownEditor.content, markdownEditor.uploadedImages])

  // マークダウン処理関数を分離してクリーンアップ
  const processMarkdown = (content: string, imageMap: Record<string, string>): string => {
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
        const mappedUrl = imageMap[trimmedAlt]

        if (mappedUrl) {
          return `<img src="${mappedUrl}" alt="${trimmedAlt}" class="${styles.previewImage}" />`
        }

        // URL自体が有効なら使用（オプション）
        if (url && !url.startsWith('blob:')) {
          return `<img src="${url}" alt="${trimmedAlt}" class="${styles.previewImage}" />`
        }

        // 一致するものがなければ代替テキストを表示
        return `<span class="${styles.missingImage}">[画像: ${trimmedAlt}]</span>`
      })
    }

    // 各処理を順番に適用する
    return processImages(processFormatting(processParagraphs(processHeadings(content))))
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentArea}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className={styles.titleInput}
          placeholder="Title"
        />

        <div className={styles.editorContainer}>
          {isPreview ? (
            <div className={styles.previewContent}>
              {/* カスタムマークダウンレンダリングのみを使用 */}
              <div
                dangerouslySetInnerHTML={{ __html: previewHtml }}
                className={styles.customMarkdownPreview}
              />
            </div>
          ) : (
            <div className={styles.editorWithPreview}>
              <textarea
                ref={markdownEditor.editorRef}
                name="content"
                value={markdownEditor.content}
                onChange={handleContentChange}
                onKeyDown={markdownEditor.handleKeyDown}
                onCompositionStart={() => markdownEditor.setIsComposing(true)}
                onCompositionEnd={() => markdownEditor.setIsComposing(false)}
                className={styles.editor}
                placeholder="Tell your story..."
              />

              {markdownEditor.uploadedImages.length > 0 && (
                <div className={styles.imagePreviewContainer}>
                  <h3 className={styles.imagePreviewTitle}>Inserted Images</h3>
                  <div className={styles.imagePreviewGrid}>
                    {markdownEditor.uploadedImages.map((image) => (
                      <div
                        key={image.id}
                        className={styles.imagePreviewItem}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className={styles.imagePreview}
                        />
                        <span className={styles.imagePreviewAlt}>{image.alt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className={styles.editorControls}>
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className={styles.previewSwitch}
            >
              {isPreview ? (
                <>
                  <Edit2 size={16} />
                  Edit
                </>
              ) : (
                <>
                  <Eye size={16} />
                  Preview
                </>
              )}
            </button>

            {!isPreview && (
              <label
                className={`${styles.imageUploadButton} ${
                  markdownEditor.isUploading ? styles.uploading : ''
                }`}
                title={markdownEditor.isUploading ? 'Uploading...' : 'Insert image'}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      markdownEditor.handleImageUpload(file)
                      e.target.value = ''
                    }
                  }}
                  className={styles.hiddenInput}
                  disabled={markdownEditor.isUploading}
                />
                {markdownEditor.isUploading ? (
                  <>
                    <Loader
                      size={16}
                      className={styles.spinningLoader}
                    />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Image size={16} />
                    Insert Image
                  </>
                )}
              </label>
            )}
          </div>
        </div>

        <section className={styles.metadataSection}>
          <h2 className={styles.metadataTitle}>Blog post settings</h2>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionBox}>
              <h3 className={styles.sectionTitle}>Thumbnail</h3>
              <ThumbnailUpload
                thumbnailFile={thumbnailFile}
                thumbnailPreview={thumbnailPreview}
                onChange={handleThumbnailChange}
              />
            </div>

            <div className={styles.sectionBox}>
              <h3 className={styles.sectionTitle}>Tags</h3>
              <TagSelector
                selectedTags={formData.tags}
                onToggle={handleTagToggle}
              />
            </div>
          </div>

          <div className={styles.publishSection}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              Publish immediately
            </label>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BlogForm
