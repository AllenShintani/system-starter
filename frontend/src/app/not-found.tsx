'use client'

import { useRouter } from 'next/navigation'
import styles from '@/styles/not-found.module.css'

const NotFound = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>Choose your destination:</p>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => router.push('/client/home')}
            className={`${styles.button} ${styles.businessButton}`}
          >
            Investigation Requester Portal
          </button>
          <span className={styles.divider}>or</span>
          <button
            onClick={() => router.push('/top')}
            className={`${styles.button} ${styles.osintButton}`}
          >
            OSINTer Portal
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
