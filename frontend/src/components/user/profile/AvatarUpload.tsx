'use client'

import { Avatar, Button, Box } from '@mui/material'
import styles from '@/styles/app/user/profile/edit.module.css'

interface AvatarUploadProps {
  previewUrl: string | null | undefined
  userName: string | undefined
  handleAvatarClick: () => void
}

const AvatarUpload = ({ previewUrl, userName, handleAvatarClick }: AvatarUploadProps) => {
  return (
    <Box className={styles.avatarUploadContainer}>
      <Box className={styles.avatarUpload}>
        <Avatar
          src={previewUrl || undefined}
          onClick={handleAvatarClick}
          alt={userName || 'User Avatar'}
          className={styles.largeAvatar}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAvatarClick}
          sx={{ mt: 2 }}
        >
          Upload New Avatar
        </Button>
      </Box>
    </Box>
  )
}

export default AvatarUpload
