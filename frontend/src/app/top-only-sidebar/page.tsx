'use client'

import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import theme from '@/components/theme/theme'
import { Sidebar } from '@/components/top-only-sidebar/Sidebar'

function Top() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', backgroundColor: '#E7FFFF', minHeight: '100vh' }}>
        <Sidebar />
      </Box>
    </ThemeProvider>
  )
}

export default Top
