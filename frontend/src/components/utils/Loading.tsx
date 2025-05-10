import styles from '@/styles/components/utils/Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.spinner} />
      </div>
    </div>
  )
}

export default Loading
