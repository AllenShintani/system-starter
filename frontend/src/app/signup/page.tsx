'use client'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import 'firebase/compat/auth'
import {
  Box,
  Avatar,
  Typography,
  Button,
  Link,
  Divider,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { trpc } from '@/utils/trpc'
import Image from 'next/image'
import GoogleIcon from 'public/google-logo.svg'
import GithubIcon from 'public/github-logo.svg'
import FacebookIcon from 'public/facebook-logo.svg'
import styles from '@/styles/app/Signup.module.css'
import { useSignup } from '@/hooks/useSignup'
import NextLink from 'next/link'
import { useState } from 'react'

export default function Signup() {
  const { handleGoogleSignup, handleGithubSignup, handleFacebookSignup } = useSignup()
  const googleSignupMutation = trpc.signupRouter.googleSignup.useMutation()
  const facebookSignupMutation = trpc.signupRouter.facebookSignup.useMutation()
  const [isTermsAgreed, setIsTermsAgreed] = useState(false)

  // Terms agreement handler
  const handleTermsAgreement = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsAgreed(event.target.checked)
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
                Create Account
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 1, mb: 3 }}
              >
                Choose your preferred way to sign up
              </Typography>
            </Box>

            <div className={styles.socialButtonsContainer}>
              <div className={styles.buttonWrapper}>
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={googleSignupMutation.isLoading || !isTermsAgreed}
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
                        {googleSignupMutation.isLoading ? 'Now Loading...' : 'Sign up with Google'}
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              <div className={styles.buttonWrapper}>
                <button
                  type="button"
                  onClick={handleGithubSignup}
                  disabled={googleSignupMutation.isLoading || !isTermsAgreed}
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
                        {googleSignupMutation.isLoading ? 'Now Loading...' : 'Sign up with GitHub'}
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              <div className={styles.buttonWrapper}>
                <button
                  type="button"
                  onClick={handleFacebookSignup}
                  disabled={facebookSignupMutation.isLoading || !isTermsAgreed}
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
                        {facebookSignupMutation.isLoading
                          ? 'Now Loading...'
                          : 'Sign up with Facebook'}
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <Divider sx={{ mt: 3, mb: 2, width: '100%' }}>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                or
              </Typography>
            </Divider>

            <NextLink
              href="/signup/email"
              passHref
              className={`${styles.emailSignupLink} ${isTermsAgreed ? styles.enabled : ''}`}
            >
              <Button
                fullWidth
                variant="outlined"
                endIcon={<ChevronRightIcon />}
                sx={{ textTransform: 'none' }}
                disabled={!isTermsAgreed}
              >
                Sign up with email
              </Button>
            </NextLink>

            <Box sx={{ mt: 3, mb: 2 }}>
              <div className={styles.checkboxContainer}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isTermsAgreed}
                      onChange={handleTermsAgreement}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the{' '}
                      <Link
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        component={NextLink}
                      >
                        Terms of Service
                      </Link>{' '}
                    </Typography>
                  }
                />
                {!isTermsAgreed && (
                  <div className={styles.noticeArrow}>
                    <ArrowForwardIcon />
                  </div>
                )}
              </div>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Already have an account?{' '}
                <Link
                  href="/signIn"
                  variant="body2"
                  component={NextLink}
                  className={styles.signInLink}
                >
                  SignIn
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
