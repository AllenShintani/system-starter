import type * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface AppBarProps {
  title: string
  subTitle: string
}

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 2,
  width: '100%',
  height: '80px',
  marginBottom: '0px',
}))

const StyledToolbar = styled(Toolbar)({
  height: '100%',
  minHeight: '80px',
})

export const AdminAppBar: React.FC<AppBarProps> = ({ title, subTitle }) => {
  return (
    <AppBar position="fixed">
      <StyledToolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            ml: '50px',
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              color: '#00D1FF',
              fontSize: '28px',
              fontWeight: 'bold',
              lineHeight: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#000000',
              fontSize: '16px',
              lineHeight: 1,
            }}
          >
            {subTitle}
          </Typography>
        </Box>
      </StyledToolbar>
    </AppBar>
  )
}
