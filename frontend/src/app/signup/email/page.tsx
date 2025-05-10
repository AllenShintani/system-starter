'use client'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import 'firebase/compat/auth'
import {
  Container,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  CircularProgress,
  IconButton,
} from '@mui/material'
import { useSignup } from '@/hooks/useSignup'
import { useState } from 'react'
import NextLink from 'next/link'
import styles from '@/styles/app/Signup.module.css'

export default function EmailSignup() {
  const { error, handleSubmit, isLoading } = useSignup()

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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
          position: 'relative',
        }}
      >
        <NextLink
          href="/signup"
          passHref
          className={styles.backButton}
        >
          <IconButton
            aria-label="back to SSO signup"
            sx={{ position: 'absolute', left: 0, top: 0 }}
          >
            <ArrowBackIcon />
          </IconButton>
        </NextLink>

        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign up with email
        </Typography>

        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{ mt: 2 }}
          >
            {error}
          </Typography>
        )}

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: '100%' }}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                autoComplete="given-name"
                name="userName"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
                value={formData.userName}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                id="email"
                label="Mail"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, position: 'relative' }}
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
              'Register'
            )}
          </Button>

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
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
