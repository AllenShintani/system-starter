import type React from 'react'
import { Upload } from 'lucide-react'
import styles from '@/styles/app/admin/UploadBlog.module.css'

interface ThumbnailUploadProps {
  thumbnailFile: File | null
  thumbnailPreview: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({
  thumbnailFile,
  thumbnailPreview,
  onChange,
}) => {
  return (
    <div className={styles.sidebarSection}>
      <h3 className={styles.sidebarTitle}>Thumbnail</h3>
      <div className={styles.fileUploadContainer}>
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          required
          className={styles.fileInput}
          id="thumbnail-input"
        />
        <label
          htmlFor="thumbnail-input"
          className={styles.fileInputLabel}
        >
          <Upload size={20} />
          {thumbnailFile ? thumbnailFile.name : 'Choose thumbnail image'}
        </label>
      </div>
      {thumbnailPreview && (
        <img
          src={thumbnailPreview}
          alt="Preview"
          className={styles.thumbnail}
        />
      )}
    </div>
  )
}
