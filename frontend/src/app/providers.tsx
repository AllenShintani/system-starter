'use client'

import type { ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthProtection } from '@/components/AuthProtection'
import { LayoutContent } from '@/components/LayoutContent'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <CssBaseline />
      <AuthProtection>
        <LayoutContent>{children}</LayoutContent>
      </AuthProtection>
    </>
  )
}
