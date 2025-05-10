// components/BlogForm/TagSelector.tsx
import type React from 'react'
import styles from '@/styles/app/admin/UploadBlog.module.css'

export const AVAILABLE_TAGS = [
  'OSINT',
  'Security',
  'Tutorial',
  'News',
  'Case Study',
  'Industry Insights',
  'Tips & Tricks',
  'Product Updates',
]

interface TagSelectorProps {
  selectedTags: string[]
  onToggle: (tag: string) => void
}

export const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags, onToggle }) => {
  return (
    <div className={styles.sidebarSection}>
      <h3 className={styles.sidebarTitle}>Tags</h3>
      <div className={styles.tagContainer}>
        {AVAILABLE_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            className={`${styles.tag} ${
              selectedTags.includes(tag) ? styles.tagSelected : styles.tagUnselected
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
