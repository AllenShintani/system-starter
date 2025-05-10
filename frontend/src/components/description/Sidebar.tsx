'use client'

import type * as React from 'react'
import {
  Drawer as MuiDrawer,
  Toolbar,
  Box,
  Avatar,
  Typography,
  IconButton,
  List,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import Symbol from 'public/logo.png'
import { useS3Image } from '@/hooks/useS3Image'
import EditIcon from '@mui/icons-material/Edit'
import styles from '@/styles/components/description/Sidebar.module.css'

const DRAWER_WIDTH = 240

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(25),
      },
    }),
  },
}))

interface SidebarProps {
  open: boolean
  toggleDrawer: () => void
  mobileOpen: boolean
  handleDrawerToggle: () => void
  isSmUp: boolean
  userFullName: string
}

export const Sidebar: React.FC<SidebarProps> = ({ open, userFullName }) => {
  const { UserIconUrl } = useS3Image()

  return (
    <Drawer
      variant="permanent"
      open={open}
    >
      <Toolbar className={styles.toolbar}>
        <div className={styles.logoContainer}>
          <Image
            src={Symbol.src}
            alt="Hackers Logo"
            fill
            className={styles.logo}
            priority
          />
        </div>
      </Toolbar>

      <Box className={styles.content}>
        <List disablePadding>
          <Box />
        </List>
      </Box>

      <div className={styles.userSection}>
        <Avatar
          src={UserIconUrl || undefined}
          alt="User Avatar"
          className={styles.avatar}
        />
        <Box className={styles.userInfo}>
          <Typography
            variant="subtitle2"
            noWrap
          >
            {userFullName}
          </Typography>
        </Box>
        <IconButton size="small">
          <EditIcon fontSize="small" />
        </IconButton>
      </div>
    </Drawer>
  )
}
