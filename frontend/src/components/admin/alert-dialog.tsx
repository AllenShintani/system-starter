import type * as React from 'react'
import styles from '@/styles/components/admin/AlertDialog.module.css'

interface AlertDialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface AlertDialogContentProps {
  children: React.ReactNode
}

interface AlertDialogHeaderProps {
  children: React.ReactNode
}

interface AlertDialogFooterProps {
  children: React.ReactNode
}

interface AlertDialogTitleProps {
  children: React.ReactNode
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  children,
  open = false,
  onOpenChange,
}) => {
  if (!open) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onOpenChange) {
      onOpenChange(false)
    }
  }

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
    >
      {children}
    </div>
  )
}

export const AlertDialogContent: React.FC<AlertDialogContentProps> = ({ children }) => {
  return <div className={styles.content}>{children}</div>
}

export const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({ children }) => {
  return <div className={styles.header}>{children}</div>
}

export const AlertDialogFooter: React.FC<AlertDialogFooterProps> = ({ children }) => {
  return <div className={styles.footer}>{children}</div>
}

export const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>
}

export const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({ children }) => {
  return <p className={styles.description}>{children}</p>
}

interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const AlertDialogAction: React.FC<AlertDialogActionProps> = ({ children, ...props }) => {
  return (
    <button
      className={styles.actionButton}
      {...props}
    >
      {children}
    </button>
  )
}

export const AlertDialogCancel: React.FC<AlertDialogActionProps> = ({ children, ...props }) => {
  return (
    <button
      className={styles.cancelButton}
      {...props}
    >
      {children}
    </button>
  )
}
