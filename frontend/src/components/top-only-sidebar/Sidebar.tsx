import type * as React from 'react'
import Box from '@mui/material/Box'
import { DRAWERWIDTH } from '@/constants'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance' // 仮のロゴとして使用
import { ListItems } from './Listitems'

export const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        'width': DRAWERWIDTH,
        'flexShrink': 0,
        '& .MuiDrawer-paper': {
          width: DRAWERWIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <AccountBalanceIcon sx={{ fontSize: 40, marginRight: 1 }} />
        <Typography
          variant="h6"
          noWrap
        >
          Your Company
        </Typography>
      </Box>

      <ListItems />
    </Drawer>
  )
}
