// パフォーマンス最適化しつつlucide-reactの必要なアイコンだけをインポート
import Link from 'next/link'
import styles from '@/styles/components/top/OptimizedFooter.module.css'
import { Info, Settings, Shield, Mail, Twitter } from 'lucide-react'

interface FooterLink {
  href: string
  label: string
  icon: React.ReactNode
  external?: boolean
}

const footerLinks: FooterLink[] = [
  { href: '/', label: 'Service', icon: <Settings size={18} /> },
  { href: '/about', label: 'About Us', icon: <Info size={18} /> },
  { href: '/policy', label: 'Policy', icon: <Shield size={18} /> },
  {
    href: 'mailto:contact@hackers-guild.tech',
    label: 'Contact',
    icon: <Mail size={18} />,
    external: true,
  },
  {
    href: 'https://x.com/HackersGui1d',
    label: 'X (Twitter)',
    icon: <Twitter size={18} />,
    external: true,
  },
]

export function OptimizedFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linksContainer}>
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={styles.footerLink}
            >
              <span className={styles.icon}>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
