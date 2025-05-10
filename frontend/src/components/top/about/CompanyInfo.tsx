import type React from 'react'
import Image from 'next/image'
import styles from '@/styles/app/about/About.module.css'

const CompanyInfo: React.FC = () => {
  return (
    <section className={`${styles.missionSection} ${styles.companyInfoSection}`}>
      <h2 className={styles.sectionTitle}>Company Information</h2>
      <div className={styles.contentWrapper}>
        <div className={styles.sectionText}>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>Company Name :</div>
              <div className={styles.infoValue}>ALAIA Inc.</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>CEO :</div>
              <div
                className={styles.infoValue}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Image
                  src="/company/name.jpeg"
                  alt="Phone Number"
                  width={150}
                  height={20}
                  className={styles.contactImage}
                />
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>Address :</div>
              <div className={styles.infoValue}>7-1-1-404 Machiya, Arakawa-ku, Tokyo, Japan</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>Phone :</div>
              <div
                className={styles.infoValue}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Image
                  src="/company/phone.png"
                  alt="Phone Number"
                  width={150}
                  height={20}
                  className={styles.contactImage}
                />
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>Contact :</div>
              <div
                className={styles.infoValue}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Image
                  src="/company/email.jpeg"
                  alt="Email Address"
                  width={250}
                  height={20}
                  className={styles.contactImage}
                />
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>Capital :</div>
              <div className={styles.infoValue}>1,000,000 JPY</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>Established :</div>
              <div className={styles.infoValue}>July 11, 2023</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>Payment Terms :</div>
              <div className={styles.infoValue}>
                Payment will be processed within 2 business days
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyInfo
