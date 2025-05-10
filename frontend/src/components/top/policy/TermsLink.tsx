'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from '@/styles/app/policy/Policy.module.css'

export function TermsLink() {
  // 状態を持たせることでframer-motionの依存を削除
  const [isHovering, setIsHovering] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // JavaScriptを使った軽量なアニメーション
  const style = {
    transform: isPressed ? 'scale(0.98)' : isHovering ? 'scale(1.02)' : 'scale(1)',
    opacity: 1,
    transition: 'transform 0.2s ease',
  }

  return (
    <div
      style={style}
      className={styles.termsLink}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <Link
        href="/terms"
        className={styles.noticeButton}
      >
        <div className={styles.noticeBox}>
          <h2 className={styles.noticeTitle}>Terms of Service Available 🎉</h2>
          <p className={styles.noticeText}>
            Our Terms of Service is now available. Please review the complete terms and conditions
            that govern the use of our platform.
          </p>
          <span className={styles.buttonText}>View Terms of Service →</span>
        </div>
      </Link>
    </div>
  )
}
