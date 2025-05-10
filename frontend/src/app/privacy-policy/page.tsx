'use client'

import { Container, Typography, Box, Paper } from '@mui/material'

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper
          elevation={3}
          sx={{ p: 4 }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
          >
            Privacy Policy
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mt: 4 }}
          >
            1. Information We Collect
          </Typography>
          <Typography paragraph>
            When you create an account on Your Service X, we collect the following information: -
            Email address - Display name - Profile information you choose to provide -
            Authentication data from third-party providers (Google, GitHub, Facebook)
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mt: 4 }}
          >
            2. How We Use Your Information
          </Typography>
          <Typography paragraph>
            We use the collected information to: - Provide and maintain our services - Notify you
            about changes to our services - Provide customer support - Monitor usage of our services
            - Detect, prevent and address technical issues
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mt: 4 }}
          >
            3. Data Storage and Security
          </Typography>
          <Typography paragraph>
            Your data is stored securely in our database. We implement appropriate security measures
            to protect against unauthorized access, alteration, disclosure, or destruction of your
            information.
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mt: 4 }}
          >
            4. Third-Party Authentication
          </Typography>
          <Typography paragraph>
            We use third-party authentication providers (Google, GitHub, Facebook) to enable easy
            sign-up and sign-in. When you choose to authenticate using these services, we only store
            the minimum required information to maintain your account.
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mt: 4 }}
          >
            5. Data Sharing
          </Typography>
          <Typography paragraph>
            We do not sell or share your personal information with third parties except as necessary
            to provide our services or as required by law.
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mt: 4 }}
          >
            6. Your Rights
          </Typography>
          <Typography paragraph>
            You have the right to: - Access your personal information - Correct inaccurate data -
            Request deletion of your data - Object to our use of your data - Export your data
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mt: 4 }}
          >
            7. Updates to Privacy Policy
          </Typography>
          <Typography paragraph>
            We may update this privacy policy from time to time. We will notify you of any changes
            by posting the new policy on this page and updating the effective date.
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mt: 4 }}
          >
            8. Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about this privacy policy, please contact us at:
            contact@info-plat.tech
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 4 }}
          >
            Last updated: January 13, 2025
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}
