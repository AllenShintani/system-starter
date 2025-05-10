import type React from 'react'
import styles from '@/styles/app/about/About.module.css'

const Mission: React.FC = () => {
  return (
    <section className={styles.missionSection}>
      <h2 className={styles.sectionTitle}>Our Mission</h2>
      <p className={styles.missionStatement}>
        Powering the information infrastructure with hacker talent
      </p>
      <p className={styles.sectionText}>
        People can&apos;t live without food. Can&apos;t live without a warm place to sleep. But what
        about information? In today&apos;s tech-driven world, when people can&apos;t get the
        information they need, It can be just as dangerous for people&apos;s safety. We believe
        information is just as vital as food and shelter, and Your Service X brings hacker value to
        all.
      </p>
    </section>
  )
}

export default Mission
