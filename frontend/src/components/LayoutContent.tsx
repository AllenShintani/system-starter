'use client'
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { usePathname } from 'next/navigation'
import { isPathWithSidebar } from '@/constants/barPath'

interface LayoutContentProps {
  children: ReactNode
}

export function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname()
  const shouldShowSidebar = isPathWithSidebar(pathname)

  if (!shouldShowSidebar) {
    return <Box component="main">{children}</Box>
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100%',
          overflow: 'auto',
          bgcolor: 'background.default',
          p: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
