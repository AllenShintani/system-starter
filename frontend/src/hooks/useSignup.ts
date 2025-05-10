'use client'
import { auth } from '@/lib/firebase/auth'
import { trpc } from '@/utils/trpc'
import type { ActionCodeSettings } from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { base64UrlEncode, getBaseUrl } from './utils/getBaseUrl'

type SignupHookReturn = {
  error: string
  isLoading: boolean
  isVerificationEmailSent: boolean
  verificationEmailError: string | null
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  handleGoogleSignup: () => Promise<void>
  handleGithubSignup: () => Promise<void>
  handleFacebookSignup: () => Promise<void>
}

const createActionCodeSettings = (
  email: string,
  userName: string,
  password: string,
): ActionCodeSettings => {
  const baseUrl = getBaseUrl()

  // URL-safe Base64 encode parameters
  const encodedEmail = base64UrlEncode(email)
  const encodedUserName = base64UrlEncode(userName)
  const encodedPassword = base64UrlEncode(password)

  const actionUrl = `${baseUrl}/auth/action`
  const continueUrl = `${actionUrl}?email=${encodedEmail}&userName=${encodedUserName}&password=${encodedPassword}`

  return {
    url: continueUrl,
    handleCodeInApp: true,
  }
}

const createNewUser = async (
  email: string,
  password: string,
  userName: string,
  setIsVerificationEmailSent: (value: boolean) => void,
  setVerificationEmailError: (error: string | null) => void,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, {
      displayName: userName,
    })

    // メール認証を送信（パスワードを含める）
    const actionCodeSettings = createActionCodeSettings(email, userName, password)
    await sendEmailVerification(userCredential.user, actionCodeSettings)
    console.info(`INFO: Verification email sent successfully${actionCodeSettings}`)

    setIsVerificationEmailSent(true)
    setVerificationEmailError(null)
    return userCredential.user
  } catch (error) {
    console.error(`FATAL: Error in createNewUser:`, error)
    if (error instanceof Error) {
      setVerificationEmailError(error.message)
    } else {
      setVerificationEmailError(`Unknown error occurred during user creation: ${error}`)
    }
    throw error
  }
}

export const useSignup = (): SignupHookReturn => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false)
  const [verificationEmailError, setVerificationEmailError] = useState<string | null>(null)
  const router = useRouter()
  const utils = trpc.useUtils()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setVerificationEmailError(null)
    setIsVerificationEmailSent(false)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const userName = formData.get('userName')

    if (!email || !password || !userName) {
      setError('All fields are required')
      setIsLoading(false)
      return
    }

    try {
      await auth.signOut()
      await createNewUser(
        email.toString(),
        password.toString(),
        userName.toString(),
        setIsVerificationEmailSent,
        setVerificationEmailError,
      )
      console.info('INFO: New user created in Firebase and verification email sent')
      router.push('/auth/verify-email')
    } catch (error: any) {
      console.error('ERROR: Firebase auth error:', error)
      if (error.code === 'auth/email-already-in-use') {
        setError(
          'This email is already registered. Please use a different email or change password',
        )
      } else {
        setError(error.message || 'Failed to create account')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const googleSignupMutation = trpc.signupRouter.googleSignup.useMutation({
    onSuccess: async () => {
      await utils.signInRouter.checkAuth.invalidate()
      // クエストページにリダイレクトし、オンボーディングガイドを表示する
      router.push('/top')
    },
    onError: (error) => {
      console.error(error)
      setError('Failed to sign up with Google. Please try again.')
    },
  })

  const facebookSignupMutation = trpc.signupRouter.facebookSignup.useMutation({
    onSuccess: async () => {
      await utils.signInRouter.checkAuth.invalidate()
      // クエストページにリダイレクトし、オンボーディングガイドを表示する
      router.push('/top')
    },
    onError: (error) => {
      console.error(error)
      setError('Failed to sign up with Facebook. Please try again.')
    },
  })

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      provider.addScope('profile')
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)

      if (!credential) {
        throw new Error('Failed to get authentication information')
      }

      const { user } = result
      if (!user.email) throw new Error('Email is required for signup')
      const userName = user.displayName ?? `user_${Math.random().toString(36).slice(2, 11)}`
      const firebaseToken = await user.getIdToken()

      const userData = {
        email: user.email,
        userName,
        firebaseToken,
      }

      googleSignupMutation.mutate({ userData })
    } catch (error) {
      console.error(error)
      if (error instanceof Error && error.message.includes('popup-closed-by-user')) {
        setError('Sign up cancelled. Please try again if you want to continue.')
      } else {
        setError('Failed to sign up with Google. Please try again.')
      }
    }
  }

  const handleGithubSignup = async () => {
    try {
      const provider = new GithubAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      provider.addScope('user')
      const result = await signInWithPopup(auth, provider)
      const credential = GithubAuthProvider.credentialFromResult(result)
      const { user } = result

      if (!credential) throw new Error('Failed to get authentication information')
      if (!user.email) throw new Error('Email is required for signup')

      const userName = user.displayName ?? `user_${Math.random().toString(36).slice(2, 11)}`
      const firebaseToken = await user.getIdToken()

      const userData = {
        email: user.email,
        userName,
        firebaseToken,
      }

      googleSignupMutation.mutate({ userData })
    } catch (error) {
      console.error(error)
      if (error instanceof Error && error.message.includes('popup-closed-by-user')) {
        setError('Sign up cancelled. Please try again if you want to continue.')
      } else {
        setError('Failed to sign up with GitHub. Please try again.')
      }
    }
  }

  const handleFacebookSignup = async () => {
    try {
      const provider = new FacebookAuthProvider()
      provider.addScope('email')
      provider.addScope('public_profile')
      const result = await signInWithPopup(auth, provider)
      const credential = FacebookAuthProvider.credentialFromResult(result)
      const { user } = result

      if (!credential) throw new Error('Failed to get authentication information')
      if (!user.email) throw new Error('Email is required for signup')

      const userName = user.displayName ?? `user_${Math.random().toString(36).slice(2, 11)}`
      const firebaseToken = await user.getIdToken()

      const userData = {
        email: user.email,
        userName,
        firebaseToken,
      }

      facebookSignupMutation.mutate({ userData })
    } catch (error) {
      console.error(error)
      if (error instanceof Error && error.message.includes('popup-closed-by-user')) {
        setError('Sign up cancelled. Please try again if you want to continue.')
      } else {
        setError('Failed to sign up with Facebook. Please try again.')
      }
    }
  }

  return {
    error,
    isLoading,
    isVerificationEmailSent,
    verificationEmailError,
    handleSubmit,
    handleGoogleSignup,
    handleGithubSignup,
    handleFacebookSignup,
  }
}
