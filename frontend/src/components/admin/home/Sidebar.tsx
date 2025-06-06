import type * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import { Navigator } from '@/components/admin/home/listitems'
import { APPBARHEIGHT, DRAWERWIDTH } from '@/constants'
import Drawer from '@mui/material/Drawer'

export const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': {
          top: APPBARHEIGHT, // AppBarの高さ分下に配置
          width: DRAWERWIDTH,
        },
        'zIndex': (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar />
      <Box>
        <Navigator />
      </Box>
    </Drawer>
  )
}
