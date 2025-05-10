import { Twitter } from 'lucide-react'
import Link from 'next/link'
import styles from '@/styles/components/utils/Footer.module.css'
import { DiscordIcon } from '@/constants/listItems'

const Footer = ({ sidebarOpen = true }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={styles.footer}
      data-sidebar-collapsed={!sidebarOpen}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Company Info */}
          <div className={styles.linkGroup}>
            <Link
              href="/about"
              className={styles.link}
            >
              About Us
            </Link>
            <Link
              href="/mailto:contact@info-plat.tech"
              className={styles.link}
            >
              Feedback
            </Link>
            {/* <Link
              href="/security"
              className={styles.link}
            >
              Trust, Safety & Security
            </Link> */}
          </div>

          {/* Support */}
          <div className={styles.linkGroup}>
            <Link
              href="/mailto:contact@info-plath"
              className={styles.link}
            >
              Help & Support
            </Link>
            <Link
              href="/terms"
              className={styles.link}
            >
              Terms of Service
            </Link>
          </div>

          {/* Privacy */}
          <div className={styles.linkGroup}>
            <Link
              href="/policy"
              className={styles.link}
            >
              Privacy Policy
            </Link>

            {/* <Link
              href="/cookie-settings"
              className={styles.link}
            >
              Cookie Settings
            </Link> */}
          </div>

          {/* Apps & More */}
          <div className={styles.linkGroup}>
            <Link
              href="/client/home"
              className={styles.link}
            >
              Client Page
            </Link>
            {/* <Link
              href="/cookie-policy"
              className={styles.link}
            >
              Cookie Policy
            </Link> */}
            {/* <Link
              href="/enterprise"
              className={styles.link}
            >
              Enterprise Solutions
            </Link> */}
          </div>
        </div>

        <div className={styles.bottomSection}>
          {/* Social Links */}
          <div className={styles.socialSection}>
            <span className={styles.socialLabel}>Follow Us</span>
            <div className={styles.socialLinks}>
              <a
                href="https://x.com/HackersGui1d"
                className={styles.socialIcon}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://discord.gg/urcEF7NhbD"
                className={styles.socialIcon}
                aria-label="Discord"
              >
                <DiscordIcon />
              </a>
            </div>
          </div>

          {/* Mobile Apps */}
          {/* <div className={styles.mobileSection}>
            <span className={styles.mobileLabel}>Mobile app</span>
            <Link
              href="/ios-app"
              aria-label="Download on the App Store"
            >
              <img
                src="/images/app-store-badge.png"
                alt="App Store"
                className={styles.mobileIcon}
              />
            </Link>
            <Link
              href="/android-app"
              aria-label="Get it on Google Play"
            >
              <img
                src="/images/google-play-badge.png"
                alt="Google Play"
                className={styles.mobileIcon}
              />
            </Link>
          </div> */}
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>© {currentYear} your_service_name@ Inc.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
