import Image from 'next/image'
import styles from '@/styles/app/admin/UploadBlog.module.css'
import Symbol from 'public/logo.png'

const AppBar = () => {
  return (
    <header className={styles.appBar}>
      <div className={styles.logoContainer}>
        <Image
          src={Symbol.src}
          alt="Hackers Logo"
          width={180}
          height={180}
          className={styles.logo}
          priority
        />
      </div>
    </header>
  )
}

export default AppBar
