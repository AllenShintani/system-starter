'use client'

import { trpc } from '@/utils/trpc'
import { useState, useEffect, useCallback } from 'react'

export const useS3Image = () => {
  const [UserIconUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const {
    data: userData,
    isLoading: isUserLoading,
    isError,
    refetch,
  } = trpc.userRouter.getUser.useQuery()
  const updateMutation = trpc.userRouter.update.useMutation()

  useEffect(() => {
    if (isUserLoading) return

    if (userData && userData.profilePicture) {
      setImageUrl(userData.profilePicture)
    } else if (isError) {
      setError('Error fetching user data')
    }
    setIsLoading(false)
  }, [userData, isUserLoading, isError])

  const uploadImage = useCallback(
    async (file: File) => {
      try {
        setIsLoading(true)
        setError(null)

        const result = await updateMutation.mutateAsync({
          profilePicture: {
            fileName: file.name,
            fileType: file.type,
          },
        })

        if (!result.success || !result.signedUrl || !result.profilePictureUrl) {
          throw new Error('Failed to get upload URL')
        }

        // S3へのアップロードを試行
        const uploadResponse = await fetch(result.signedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        })

        if (!uploadResponse.ok) {
          console.error('S3 Upload failed:', await uploadResponse.text())
          throw new Error(`Failed to upload image to S3: ${uploadResponse.statusText}`)
        }

        setImageUrl(result.profilePictureUrl)
        await refetch()
      } catch (err) {
        console.error('Upload error:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    },
    [updateMutation, refetch]
  )

  return { UserIconUrl, error, isLoading, uploadImage }
}
