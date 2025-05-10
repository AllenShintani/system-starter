'use client'

import styles from '@/styles/app/admin/UploadBlog.module.css'
import BlogForm from '@/components/admin/blog/BlogForm'
import AppBar from '@/components/admin/blog/AppBar'

const UploadBlog = () => {
  return (
    <div className={styles.pageContainer}>
      <AppBar />
      <main className={styles.mainContent}>
        <BlogForm />
      </main>
    </div>
  )
}

export default UploadBlog
