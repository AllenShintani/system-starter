import type React from 'react'
import Link from 'next/link'
import styles from '@/styles/app/about/About.module.css'

const Contact: React.FC = () => {
  return (
    <section className={styles.contactSection}>
      <h2 className={styles.sectionTitle}>Get in Touch</h2>
      <p className={styles.contactText}>
        Interested in learning more about how we can help you? Send us a message and we&apos;ll get
        back to you soon.
      </p>
      <Link
        href="mailto:contact@hackers-guild.tech"
        className={styles.contactButton}
      >
        Contact Us
      </Link>
    </section>
  )
}

export default Contact
