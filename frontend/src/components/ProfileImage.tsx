import type React from 'react'
import { useState, useEffect } from 'react'
import { Avatar, CircularProgress, Typography, Box } from '@mui/material'
import { useS3Image } from '@/hooks/useS3Image'

interface ProfileImageProps {
  imageUrl: string | null
  size?: number
  onImageLoad?: () => void
  onImageError?: (error: string) => void
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  imageUrl,
  size = 100,
  onImageLoad,
  onImageError,
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const { UserIconUrl } = useS3Image()

  useEffect(() => {
    if (!imageUrl) return
    setLoading(true)
    setError(null)

    const img = new Image()
    img.onload = () => {
      setImageSrc(imageUrl)
      setLoading(false)
      onImageLoad?.()
    }
    img.onerror = (e) => {
      console.error('Failed to load image:', imageUrl, e)
      const errorMessage = `画像の読み込みに失敗しました: ${e}`
      setError(errorMessage)
      setLoading(false)
      onImageError?.(errorMessage)
    }
    img.src = imageUrl
  }, [imageUrl, onImageLoad, onImageError])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Avatar
        src={imageSrc || UserIconUrl || undefined}
        sx={{
          width: size,
          height: size,
          position: 'relative',
        }}
      >
        {loading && (
          <CircularProgress
            size={size * 0.8}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: `${-size * 0.4}px`,
              marginLeft: `${-size * 0.4}px`,
            }}
          />
        )}
      </Avatar>
      {error && (
        <Typography
          variant="caption"
          color="error"
        >
          {error}
        </Typography>
      )}
    </Box>
  )
}

export default ProfileImage
