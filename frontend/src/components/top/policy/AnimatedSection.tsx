'use client'

import { motion } from 'framer-motion'
import type React from 'react'
import styles from '@/styles/app/policy/Policy.module.css'

interface AnimatedSectionProps {
  children: React.ReactNode
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={styles.termsLink}
    >
      {children}
    </motion.div>
  )
}
