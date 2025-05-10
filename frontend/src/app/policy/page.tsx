import { Container } from '@mui/material'
import styles from '@/styles/app/policy/Policy.module.css'
import Link from 'next/link'
// import { useRef, useEffect } from 'react'
// import { initEarthGlobe, handleResize, disposeEarthGlobe } from '@/components/top/utils/earthGlobe'
// import type { EarthGlobeState } from '@/types/top/utils/earthGlobe'
import Footer from '@/components/top/Footer'
import { AnimatedSection } from '@/components/top/policy/AnimatedSection'

// メタデータを追加してSEO対応
export const metadata = {
  title: 'Policy | Your Service X',
  description: 'Your Service X policies, principles, and commitments.',
}

// サーバーコンポーネントとして実装
export default function PolicyPage() {
  // const canvasRef = useRef<HTMLCanvasElement | null>(null)
  // const stateRef = useRef<EarthGlobeState | null>(null)
  // const animationFrameIdRef = useRef<number | null>(null)

  // useEffect(() => {
  //   if (!canvasRef.current) return

  //   stateRef.current = initEarthGlobe(canvasRef.current)

  //   const animationLoop = () => {
  //     if (stateRef.current) {
  //       animationFrameIdRef.current = requestAnimationFrame(animationLoop)
  //     }
  //   }
  //   animationLoop()

  //   const handleWindowResize = () => {
  //     if (stateRef.current) {
  //       handleResize(stateRef.current)
  //     }
  //   }
  //   window.addEventListener('resize', handleWindowResize)
  //   handleWindowResize()

  //   return () => {
  //     if (animationFrameIdRef.current !== null) {
  //       cancelAnimationFrame(animationFrameIdRef.current)
  //     }
  //     if (stateRef.current) {
  //       disposeEarthGlobe(stateRef.current)
  //     }
  //     window.removeEventListener('resize', handleWindowResize)
  //   }
  // }, [])

  return (
    <div className={styles.container}>
      <div className={styles.canvasContainer}>{/* <canvas ref={canvasRef} /> */}</div>

      <Container
        component="main"
        maxWidth="lg"
        className={styles.mainContent}
      >
        <div className={styles.contentWrapper}>
          <section className={styles.policySection}>
            <h1 className={styles.sectionTitle}>Policy</h1>

            <AnimatedSection>
              <Link
                href="/terms"
                className={styles.noticeButton}
              >
                <div className={styles.noticeBox}>
                  <h2 className={styles.noticeTitle}>Terms of Service Available 🎉</h2>
                  <p className={styles.noticeText}>
                    Our Terms of Service is now available. Please review the complete terms and
                    conditions that govern the use of our platform.
                  </p>
                  <span className={styles.buttonText}>View Terms of Service →</span>
                </div>
              </Link>
            </AnimatedSection>

            <div className={styles.policyContent}>
              <h2 className={styles.subsectionTitle}>Our Core Principles</h2>
              <p className={styles.policyText}>
                We operate in accordance with international law and ethical standards. Both our
                administration and users are bound by these principles. While regional restrictions
                may be implemented due to legal requirements or user accessibility concerns, we
                maintain a non-discriminatory and inclusive platform.
              </p>

              <h2 className={styles.subsectionTitle}>Zero Tolerance for Abuse</h2>
              <p className={styles.policyText}>
                Our platform strictly prohibits criminal activities and platform abuse. Any misuse
                will result in immediate and permanent account suspension. While we recognize the
                fine line between legitimate use and exploitation, we maintain zero tolerance for
                malicious activities.
              </p>

              <h2 className={styles.subsectionTitle}>Rights and Privacy</h2>
              <p className={styles.policyText}>
                We are committed to protecting both the right to information and individual privacy.
                Each case is evaluated individually, considering the delicate balance between
                information accessibility and privacy protection. We take a context-sensitive
                approach while maintaining strict standards against misuse.
              </p>

              <h2 className={styles.subsectionTitle}>Our Commitment</h2>
              <ul className={styles.policyList}>
                <li>Protect the rights and privacy of all platform users</li>
                <li>Ensure compliance with international cybersecurity regulations</li>
                <li>Promote ethical information gathering practices</li>
                <li>Maintain transparency in our operations</li>
                <li>Support responsible disclosure procedures</li>
              </ul>
            </div>
          </section>
        </div>
      </Container>

      <Footer />
    </div>
  )
}
