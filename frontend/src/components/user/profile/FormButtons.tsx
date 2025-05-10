'use client'

import { Button, Box } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import styles from '@/styles/app/user/profile/edit.module.css'

interface FormButtonsProps {
  isLoading: boolean
  isUserVerified: boolean | undefined
  isVerifying: boolean
  handleStartVerification: () => void
}

const FormButtons = ({
  isLoading,
  isUserVerified,
  isVerifying,
  handleStartVerification,
}: FormButtonsProps) => {
  return (
    <Box className={styles.buttonContainer}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        size="large"
        className={styles.submitButton}
        sx={{ textTransform: 'none' }}
      >
        {isLoading ? 'Saving Changes...' : 'Save Changes'}
      </Button>

      {!isUserVerified && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleStartVerification}
          disabled={isVerifying}
          size="large"
          className={styles.verifyButton}
          startIcon={<VerifiedIcon />}
          sx={{ textTransform: 'none', ml: 2 }}
        >
          {isVerifying ? 'Starting Verification...' : 'Verify Identity'}
        </Button>
      )}
    </Box>
  )
}

export default FormButtons
