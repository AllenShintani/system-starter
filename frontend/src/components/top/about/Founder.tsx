import type React from 'react'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/app/about/About.module.css'

const founders = [
  {
    name: 'Allen Shintani',
    role: 'Co-founder & Technical Lead',
    description:
      'Technical lead specializing in TypeScript-based web development. Drives innovation in full-stack solutions while maintaining high code quality standards.',
    image: '/founderIcon/allen.webp',
    github: 'https://github.com/AllenShintani',
  },
  {
    name: '1azymamba',
    role: 'Co-founder & Security Researcher',
    description:
      'Security researcher passionate about contributing to hacker culture and information infrastructure. Experienced in both red team and blue team operations.',
    image: '/founderIcon/1azymamba.webp',
    github: 'https://github.com/1azymamba',
  },
]

const Founders: React.FC = () => {
  return (
    <section className={styles.teamSection}>
      <h2 className={styles.sectionTitle}>Our Founders</h2>
      <div className={styles.foundersGrid}>
        {founders.map((founder, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={styles.founderCard}
          >
            <div className={styles.founderImageWrapper}>
              <Image
                src={founder.image}
                alt={founder.name}
                width={200}
                height={200}
                className={styles.founderImage}
              />
            </div>
            <div className={styles.founderInfo}>
              <h3 className={styles.founderName}>{founder.name}</h3>
              <p className={styles.founderRole}>{founder.role}</p>
              <p className={styles.founderDescription}>{founder.description}</p>
              <Link
                href={founder.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
              >
                <Github className={styles.githubIcon} />
                <span>GitHub Profile</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Founders
