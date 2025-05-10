'use client'
/* eslint-disable sonarjs/cognitive-complexity */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { auth } from '@/lib/firebase/auth'
import type { AuthError } from 'firebase/auth'
import {
  applyActionCode,
  checkActionCode,
  verifyPasswordResetCode,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { trpc } from '@/utils/trpc'

// Types
type ActionResult = {
  success: boolean
  error?: string
  completed?: boolean
}

type EmailParams = {
  email: string
  userName: string
  password: string
}

type ActionOperation = 'EMAIL_SIGNIN' | 'VERIFY_EMAIL' | 'PASSWORD_RESET' | 'UNKNOWN'

type UseAuthActionResult = {
  result: ActionResult | null
  debugInfo: string[]
  actionType: string | null
  handleRetry: () => void
}

// Error handling utilities
const handleAuthError = (error: unknown, context: string): ActionResult => {
  console.error(`${context}:`, error)
  const authError = error as AuthError
  return {
    success: false,
    error: getErrorMessage(authError),
    completed: true,
  }
}

const getErrorMessage = (error: AuthError): string => {
  const errorMessages = {
    'auth/invalid-action-code':
      'This link has expired or already been used. Please request a new one.',
    'auth/expired-action-code': 'This link has expired. Please request a new one.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found for this email.',
    'auth/weak-password': 'The password is too weak.',
    'auth/id-token-expired': 'Your session has expired. Please try again.',
  }
  return (
    errorMessages[error.code as keyof typeof errorMessages] ||
    'An error occurred. Please try again.'
  )
}

// URL parameter utilities
const decodeBase64UrlSafe = (str: string): string => {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    return decodeURIComponent(atob(base64))
  } catch (error) {
    console.error('Decoding error:', error)
    return ''
  }
}

const extractParamsFromContinueUrl = (continueUrl: string): EmailParams => {
  try {
    const url = new URL(decodeURIComponent(continueUrl))
    const params = url.searchParams

    const getDecodedParam = (name: string) => {
      const value = params.get(name)
      return value ? decodeBase64UrlSafe(value) : ''
    }

    return {
      email: getDecodedParam('email'),
      userName: getDecodedParam('userName'),
      password: getDecodedParam('password'),
    }
  } catch (error) {
    console.error('Error parsing continueUrl:', error)
    return { email: '', userName: '', password: '' }
  }
}

export const useAuthAction = (): UseAuthActionResult => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const processedRef = useRef(false)
  const processingRef = useRef(false)
  const [result, setResult] = useState<ActionResult | null>(null)
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const [actionType, setActionType] = useState<string | null>(null)
  const oobCode = searchParams.get('oobCode')
  const continueUrl = searchParams.get('continueUrl')

  const addDebugInfo = useCallback((info: string) => {
    setDebugInfo((prev) => [...prev, info])
  }, [])

  const verifyEmailMutation = trpc.signupRouter.completeSignup.useMutation({
    onSuccess: () => {
      addDebugInfo('Signup mutation completed successfully')
      setResult((prev) => (prev ? { ...prev, completed: true } : null))
    },
    onError: (error) => {
      console.error('Mutation error:', error)
      setResult({
        success: false,
        error: error.message,
        completed: true,
      })
    },
  })

  const handleSignIn = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      if (!email || !password) {
        addDebugInfo('No credentials available for sign in')
        return false
      }

      try {
        addDebugInfo('Attempting to sign in with credentials...')
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        await userCredential.user.reload()
        addDebugInfo('Sign in successful')
        return true
      } catch (error) {
        addDebugInfo(`Sign in failed: ${error}`)
        return false
      }
    },
    [addDebugInfo]
  )

  const completeEmailVerification = useCallback(
    async (params: EmailParams): Promise<ActionResult> => {
      if (!auth.currentUser) {
        addDebugInfo('No current user after sign in attempt')
        return {
          success: true,
          error: 'Email verified successfully. Please proceed to sign in.',
          completed: true,
        }
      }

      await auth.currentUser.reload()
      addDebugInfo(`User verified status: ${auth.currentUser.emailVerified}`)

      if (!auth.currentUser.emailVerified) {
        return {
          success: false,
          error: 'Email verification failed. Please try again.',
          completed: true,
        }
      }

      if (params.email && params.userName) {
        addDebugInfo('Starting signup completion...')
        await verifyEmailMutation.mutateAsync({
          email: params.email,
          userName: params.userName,
          firebaseUid: auth.currentUser.uid,
        })
      }

      return { success: true, completed: true }
    },
    [addDebugInfo, verifyEmailMutation]
  )

  const handleEmailVerification = useCallback(
    async (oobCode: string, params: EmailParams): Promise<ActionResult> => {
      try {
        addDebugInfo('Applying email verification code...')
        await applyActionCode(auth, oobCode)
        addDebugInfo('Action code applied successfully')
        await handleSignIn(params.email, params.password)
        return await completeEmailVerification(params)
      } catch (error) {
        addDebugInfo(`Error encountered: ${(error as AuthError).code || (error as Error).message}`)
        return handleAuthError(error, 'Email verification error')
      }
    },
    [addDebugInfo, handleSignIn, completeEmailVerification]
  )

  const handlePasswordReset = useCallback(
    async (oobCode: string): Promise<ActionResult> => {
      try {
        addDebugInfo('Verifying password reset code...')
        const email = await verifyPasswordResetCode(auth, oobCode)
        addDebugInfo(`Password reset code verified for email: ${email}`)
        router.push(`/auth/reset-password?oobCode=${oobCode}`)
        return { success: true, completed: true }
      } catch (error) {
        addDebugInfo(`Error encountered: ${(error as AuthError).code || (error as Error).message}`)
        return handleAuthError(error, 'Password reset error')
      }
    },
    [addDebugInfo, router]
  )

  const handleActionByType = useCallback(
    async (operation: ActionOperation, params: EmailParams): Promise<ActionResult> => {
      if (!oobCode) {
        return {
          success: false,
          error: 'Invalid verification link. Please request a new one.',
          completed: true,
        }
      }

      const handlers: Partial<Record<ActionOperation, () => Promise<ActionResult>>> = {
        EMAIL_SIGNIN: () => handleEmailVerification(oobCode, params),
        VERIFY_EMAIL: () => handleEmailVerification(oobCode, params),
        PASSWORD_RESET: () => handlePasswordReset(oobCode),
      }

      const handler = handlers[operation]
      return handler
        ? handler()
        : { success: false, error: 'Unsupported action type', completed: true }
    },
    [oobCode, handleEmailVerification, handlePasswordReset]
  )

  const handleEmailAction = useCallback(async () => {
    if (processedRef.current || processingRef.current || result !== null || !oobCode) {
      addDebugInfo('Process already started, completed, or invalid')
      return
    }

    try {
      processingRef.current = true
      addDebugInfo('Checking action code...')
      const actionInfo = await checkActionCode(auth, oobCode)
      const operation = actionInfo.operation as ActionOperation
      setActionType(operation)
      addDebugInfo(`Action type: ${operation}`)

      const params = continueUrl
        ? extractParamsFromContinueUrl(continueUrl)
        : { email: '', userName: '', password: '' }

      const actionResult = await handleActionByType(operation, params)
      processedRef.current = true
      setResult(actionResult)
    } catch (error) {
      addDebugInfo(
        `Action code check error: ${(error as AuthError).code || (error as Error).message}`
      )
      setResult(handleAuthError(error, 'Action code check error'))
    } finally {
      processingRef.current = false
    }
  }, [oobCode, continueUrl, result, handleActionByType, addDebugInfo])

  useEffect(() => {
    if (oobCode && !result && !processedRef.current && !processingRef.current) {
      handleEmailAction().catch((error) => {
        console.error('Unexpected error:', error)
        addDebugInfo(`Unexpected error: ${error}`)
        setResult({
          success: false,
          error: 'An unexpected error occurred. Please try again.',
          completed: true,
        })
      })
    }
  }, [oobCode, result, handleEmailAction, addDebugInfo])

  const handleRetry = useCallback(() => {
    processedRef.current = false
    processingRef.current = false
    setResult(null)
    setDebugInfo([])
    handleEmailAction()
  }, [handleEmailAction])

  return { result, debugInfo, actionType, handleRetry }
}
