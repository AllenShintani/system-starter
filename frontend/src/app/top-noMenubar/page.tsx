'use client'

import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import theme from '@/components/theme/theme'
import { AdminAppBar } from '@/components/admin/home/AppBar'
import { Sidebar } from '@/components/admin/home/Sidebar'

function Top() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', backgroundColor: '#E7FFFF', minHeight: '100vh' }}>
        <AdminAppBar
          title="プロジェクト名"
          subTitle="サブプロジェクト名"
        />
        <Sidebar />
      </Box>
    </ThemeProvider>
  )
}

export default Top
