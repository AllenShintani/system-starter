'use client'

import type React from 'react'
// import { useEffect, useRef } from 'react'
import { Container } from '@mui/material'
import { motion } from 'framer-motion'
import styles from '@/styles/app/about/About.module.css'
import Footer from '@/components/top/Footer'

// import { initEarthGlobe, handleResize, disposeEarthGlobe } from '@/components/top/utils/earthGlobe'
// import type { EarthGlobeState } from '@/types/top/utils/earthGlobe'
import Founders from '@/components/top/about/Founder'
import Mission from '@/components/top/about/Mission'
import Contact from '@/components/top/about/Contact'
import CompanyInfo from '@/components/top/about/CompanyInfo'

const AboutPage: React.FC = () => {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.contentWrapper}
        >
          <h1 className={styles.title}>About Your Service X</h1>
          <p className={styles.subtitle}>Leading the Future of Open-Source Intelligence</p>

          <div className={styles.serviceImageSection}>
            <img
              src="/home/platform.webp"
              alt="Service explanation"
              className={styles.serviceImage}
            />
          </div>

          <Mission />
          <Founders />
          <Contact />
          <CompanyInfo />
        </motion.div>
      </Container>

      <Footer />
    </div>
  )
}

export default AboutPage
