'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material'
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined'
import styles from '@/styles/app/PasswordReset.module.css'
import { auth } from '@/lib/firebase/auth'
import { sendPasswordResetEmail } from 'firebase/auth'

const PasswordResetPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')?.toString() || ''

    try {
      // Firebase Authを使用してパスワードリセットメールを送信
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/signIn`,
        handleCodeInApp: false,
      })

      setSuccess('Password reset email has been sent. Please check your inbox.')
    } catch (error) {
      console.error('Password reset error:', error)
      if (error instanceof Error) {
        if (error.message.includes('user-not-found')) {
          setError('No account found with this email address.')
        } else if (error.message.includes('invalid-email')) {
          setError('Please enter a valid email address.')
        } else {
          setError('Failed to send password reset email. Please try again.')
        }
      } else {
        setError('Failed to send password reset email. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.contentWrapper}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <Box className={styles.headerSection}>
              <Avatar className={styles.avatar}>
                <LockResetOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                className={styles.title}
              >
                Reset Password
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 1, mb: 3 }}
              >
                Enter your email address and we&apos;ll send you a link to reset your password.
              </Typography>
            </Box>

            {error && (
              <Typography
                color="error"
                align="center"
                sx={{ mb: 2 }}
              >
                {error}
              </Typography>
            )}

            {success && (
              <Typography
                color="success.main"
                align="center"
                sx={{ mb: 2 }}
              >
                {success}
              </Typography>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              className={styles.form}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                disabled={isLoading}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <CircularProgress
                      size={24}
                      sx={{
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-12px',
                      }}
                    />
                    Now Loading...
                  </>
                ) : (
                  'Reset Password'
                )}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link
                  href="/signIn"
                  component={NextLink}
                  className={styles.link}
                >
                  Back to Sign In
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default PasswordResetPage
