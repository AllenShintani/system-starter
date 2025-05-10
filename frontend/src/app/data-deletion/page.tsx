'use client'

import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material'

export default function DataDeletion() {
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
            Data Deletion Guide
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mt: 4 }}
          >
            How to Delete Your Account and Data
          </Typography>

          <Typography paragraph>
            We respect your right to delete your personal information from our service. Follow these
            steps to delete your account and associated data:
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="Step 1: Sign in to your account"
                secondary="Make sure you are signed in to the account you want to delete."
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary="Step 2: Go to Account Settings"
                secondary="Navigate to your account settings through the profile menu."
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary="Step 3: Find Delete Account Option"
                secondary="Scroll to the bottom of the account settings page to find the 'Delete Account' section."
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary="Step 4: Confirm Deletion"
                secondary="Click the delete button and confirm your decision. You may need to enter your password."
              />
            </ListItem>
          </List>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mt: 4 }}
          >
            What Will Be Deleted
          </Typography>

          <Typography paragraph>
            When you delete your account, we will remove: - Your profile information - Your posts
            and comments - Your authentication data - Any associated data linked to your account
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mt: 4 }}
          >
            Data Retention Period
          </Typography>

          <Typography paragraph>
            After requesting deletion, your data will be permanently removed from our active systems
            within 30 days. Backup copies may take up to 90 days to be completely removed from our
            systems.
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mt: 4 }}
          >
            Need Help?
          </Typography>

          <Typography paragraph>
            If you encounter any issues with the deletion process or need assistance, please contact
            our support team at contact@hackers-guild.tech
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
