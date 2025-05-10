'use client'

import { useState } from 'react'
import { trpc } from '@/utils/trpc'
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Divider,
  Card,
  CardContent,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Image from 'next/image'
import GoogleIcon from 'public/google-logo.svg'
import GithubIcon from 'public/github-logo.svg'
import FacebookIcon from 'public/facebook-logo.svg'
import styles from '@/styles/app/SignIn.module.css'
import { auth } from '@/lib/firebase/auth'
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import NextLink from 'next/link'

export default function SignIn() {
  const [error, setError] = useState('')
  const router = useRouter()
  const utils = trpc.useUtils()

  const signInMutation = trpc.signInRouter.signIn.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await utils.signInRouter.checkAuth.invalidate()
        router.push('/top')
      }
    },
    onError: (error: any) => {
      if (error.data?.code === 'UNAUTHORIZED') {
        setError('Your email or password is incorrect.')
      } else if (error.data?.code === 'TOO_MANY_REQUESTS') {
        setError('Too many requests. Please try again later.')
      } else {
        setError('Sign In failed. Please try again.')
      }
    },
  })

  const googleSignInMutation = trpc.signInRouter.googleSignIn.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await utils.signInRouter.checkAuth.invalidate()
        router.push(data.redirect)
      }
    },
    onError: (error) => {
      setError('Failed to sign in with Google. Please try again.')
      console.error('Google sign in error:', error)
    },
  })

  const githubSignInMutation = trpc.signInRouter.githubSignIn.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await utils.signInRouter.checkAuth.invalidate()
        router.push(data.redirect)
      }
    },
    onError: (error) => {
      setError('Failed to sign in with GitHub. Please try again.')
      console.error('GitHub sign in error:', error)
    },
  })

  const facebookSignInMutation = trpc.signInRouter.facebookSignIn.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        await utils.signInRouter.checkAuth.invalidate()
        router.push(data.redirect)
      }
    },
    onError: (error) => {
      setError('Failed to sign in with Facebook. Please try again.')
      console.error('Facebook sign in error:', error)
    },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')?.toString() || ''
    const password = formData.get('password')?.toString() || ''

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const token = await userCredential.user.getIdToken()

      signInMutation.mutate({
        signInData: {
          email,
          password,
          token,
        },
      })
    } catch (error) {
      console.error('Firebase auth error:', error)
      setError('Sign In failed. Please try again.')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      provider.addScope('profile')
      const result = await signInWithPopup(auth, provider)
      const token = await result.user.getIdToken()

      googleSignInMutation.mutate({ token })
    } catch (error) {
      console.error('Google sign in error:', error)
      setError('Failed to sign in with Google. Please try again.')
    }
  }

  const handleGithubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      provider.addScope('user')
      const result = await signInWithPopup(auth, provider)
      const token = await result.user.getIdToken()

      githubSignInMutation.mutate({ token })
    } catch (error) {
      console.error('GitHub sign in error:', error)
      if (error instanceof Error && error.message.includes('popup-closed-by-user')) {
        setError('Sign In cancelled. Please try again if you want to continue.')
      } else {
        setError('Failed to sign in with GitHub. Please try again.')
      }
    }
  }

  const handleFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider()
      provider.addScope('email')
      provider.addScope('public_profile')
      const result = await signInWithPopup(auth, provider)
      const token = await result.user.getIdToken()

      facebookSignInMutation.mutate({ token })
    } catch (error) {
      console.error('Facebook sign in error:', error)
      if (error instanceof Error && error.message.includes('popup-closed-by-user')) {
        setError('Sign In cancelled. Please try again if you want to continue.')
      } else {
        setError('Failed to sign in with Facebook. Please try again.')
      }
    }
  }

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.contentWrapper}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <Box className={styles.headerSection}>
              <Avatar className={styles.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                className={styles.title}
              >
                Sign In
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
                label="Mail"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, textTransform: 'none' }}
                disabled={signInMutation.isLoading}
              >
                {signInMutation.isLoading ? 'Now Loading...' : 'Sign In'}
              </Button>

              <Grid
                container
                spacing={2}
                alignItems="center"
              >
                {
                  <Grid
                    item
                    xs
                  >
                    <Link
                      href="/passwordReset"
                      variant="body2"
                      className={styles.forgotPassword}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                }
                <Grid item>
                  <Link
                    href="/signup"
                    variant="body2"
                    component={NextLink}
                    className={styles.signupLink}
                  >
                    Don&apos;t have an account?
                  </Link>
                </Grid>
              </Grid>

              <Divider sx={{ mt: 3, mb: 2 }}>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  or
                </Typography>
              </Divider>

              <div className={styles.socialButtonsContainer}>
                <div className={styles.buttonWrapper}>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={googleSignInMutation.isLoading}
                    className={styles.googleButton}
                  >
                    <div className={styles.googleIconContainer}>
                      <Image
                        src={GoogleIcon.src}
                        alt="Google logo"
                        width={18}
                        height={18}
                        className={styles.googleIcon}
                      />
                    </div>
                    <div className={styles.buttonContentWrapper}>
                      <div className={styles.textContainer}>
                        <span className={styles.googleButtonText}>
                          {googleSignInMutation.isLoading
                            ? 'Now Loading...'
                            : 'Sign In with Google'}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>

                <div className={styles.buttonWrapper}>
                  <button
                    type="button"
                    onClick={handleGithubSignIn}
                    disabled={githubSignInMutation.isLoading}
                    className={styles.githubButton}
                  >
                    <div className={styles.githubIconContainer}>
                      <Image
                        src={GithubIcon.src}
                        alt="GitHub logo"
                        width={18}
                        height={18}
                        className={styles.githubIcon}
                      />
                    </div>
                    <div className={styles.buttonContentWrapper}>
                      <div className={styles.textContainer}>
                        <span className={styles.githubButtonText}>
                          {githubSignInMutation.isLoading
                            ? 'Now Loading...'
                            : 'Sign In with GitHub'}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>

                <div className={styles.buttonWrapper}>
                  <button
                    type="button"
                    onClick={handleFacebookSignIn}
                    disabled={facebookSignInMutation.isLoading}
                    className={styles.facebookButton}
                  >
                    <div className={styles.facebookIconContainer}>
                      <Image
                        src={FacebookIcon.src}
                        alt="Facebook logo"
                        width={18}
                        height={18}
                        className={styles.facebookIcon}
                      />
                    </div>
                    <div className={styles.buttonContentWrapper}>
                      <div className={styles.textContainer}>
                        <span className={styles.facebookButtonText}>
                          {facebookSignInMutation.isLoading
                            ? 'Now Loading...'
                            : 'Sign In with Facebook'}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
