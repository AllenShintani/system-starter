'use client'
import { Container, Box, Typography, CircularProgress } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'

const VerifyEmailPage = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <EmailIcon sx={{ fontSize: 48, color: 'primary.main' }} />

        <Typography
          component="h1"
          variant="h5"
          textAlign="center"
        >
          Email Verification Required
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
        >
          We&apos;ve sent you a verification email. Please check your inbox and click the
          verification link to complete your registration.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <CircularProgress
            size={24}
            sx={{ mr: 1 }}
          />
          <Typography
            component="span"
            color="text.secondary"
          >
            Waiting for verification...
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          If you don&apos;t see the email, please check your spam folder. The verification link will
          expire in 24 hours.
        </Typography>
      </Box>
    </Container>
  )
}

export default VerifyEmailPage
