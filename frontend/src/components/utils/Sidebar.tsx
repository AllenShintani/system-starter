'use client'

import { useState } from 'react'
import MuiDrawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Link from 'next/link'
import Symbol from 'public/logo.png'
import MenuIcon from '@mui/icons-material/Menu'
import IconImage from 'public/icon.png'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useS3Image } from '@/hooks/useS3Image'
import type { Theme } from '@mui/material'
import { Avatar, Typography, IconButton, Chip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VerifiedIcon from '@mui/icons-material/Verified'
import GppMaybeIcon from '@mui/icons-material/GppMaybe'
import { styled } from '@mui/material/styles'
import styles from '@/styles/components/utils/Sidebar.module.css'
import { SidebarItem } from './SidebarItem'
import { trpc } from '@/utils/trpc'

const DRAWER_WIDTH = 255

const getTransitionStyles = (theme: Theme) => ({
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.enteringScreen,
})

const getClosedDrawerStyles = (theme: Theme) => ({
  overflowX: 'hidden' as const,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: theme.spacing(7),
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(9),
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', getTransitionStyles(theme)),
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    ...(!open && getClosedDrawerStyles(theme)),
  },
}))

type AdminDrawerProps = {
  open: boolean
  toggleDrawer: () => void
  mobileOpen: boolean
  handleDrawerToggle: () => void
  isSmUp: boolean
  userFullName: string
}

type TransitionProps = {
  open: boolean
  visibility?: 'visible' | 'hidden'
}

const getTransitionStyle = ({ open, visibility = 'visible' }: TransitionProps) => ({
  opacity: open ? 1 : 0,
  transition: 'opacity 0.2s ease-in-out',
  visibility: open ? visibility : 'hidden',
})

const MenuToggleButton: React.FC<{ open: boolean; onClick: () => void }> = ({ open, onClick }) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <IconButton
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={styles.menuButton}
    >
      {open ? (
        <ChevronLeftIcon />
      ) : (
        <>
          <div className={`${styles.menuIconContainer} ${!isHovering ? styles.visible : ''}`}>
            <Image
              src={IconImage.src}
              alt="Menu Icon"
              width={78}
              height={78}
            />
          </div>
          <div className={`${styles.menuIconContainer} ${isHovering ? styles.visible : ''}`}>
            <MenuIcon />
          </div>
        </>
      )}
    </IconButton>
  )
}

const NeonFilter: React.FC = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
      <filter id="neonEffect">
        <feColorMatrix
          type="matrix"
          values="0.953 0 0 0 0
                  0 0.922 0 0 0
                  0 0 0.827 0 0
                  0 0 0 1 0"
        />
        <feGaussianBlur
          stdDeviation="2"
          result="blur"
        />
        <feFlood
          floodColor="#F3EBD3"
          floodOpacity="0.7"
          result="glow"
        />
        <feComposite
          in="glow"
          in2="blur"
          operator="atop"
          result="glowBlur"
        />
        <feMerge>
          <feMergeNode in="glowBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
)

const Logo: React.FC<{ open: boolean }> = ({ open }) => (
  <div
    className={styles.logoContainer}
    style={getTransitionStyle({ open })}
  >
    <Image
      src={Symbol.src}
      alt="Hackers Logo"
      fill
      className={styles.logo}
      priority
      style={{
        filter: 'url(#neonEffect)',
        WebkitFilter: 'url(#neonEffect)',
      }}
    />
  </div>
)

const UserInfo: React.FC<{
  open: boolean
  userFullName: string
  userIconUrl?: string
  isVerified: boolean
}> = ({ open, userFullName, userIconUrl, isVerified }) => (
  <Link
    href="/user/profile/edit"
    className={styles.userSection}
  >
    <div className={styles.userContent}>
      {open && (
        <div className={styles.userTopRow}>
          <Chip
            icon={isVerified ? <VerifiedIcon /> : <GppMaybeIcon />}
            label={isVerified ? 'Verified' : 'Unverified yet'}
            color={isVerified ? 'success' : 'warning'}
            variant="outlined"
            size="small"
            className={styles.verificationChip}
          />
        </div>
      )}
      <div className={styles.userBottomRow}>
        <Avatar
          src={userIconUrl}
          alt="User Avatar"
        />
        <Box
          className={styles.userInfo}
          style={getTransitionStyle({ open })}
        >
          <Typography
            variant="subtitle1"
            noWrap
          >
            {userFullName}
          </Typography>
        </Box>
        <IconButton
          size="small"
          className={styles.editButton}
          style={getTransitionStyle({ open })}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  </Link>
)

export const Sidebar: React.FC<AdminDrawerProps> = ({
  open,
  toggleDrawer,
  mobileOpen,
  handleDrawerToggle,
  isSmUp,
  userFullName,
}) => {
  const { UserIconUrl } = useS3Image()
  const { data: userData } = trpc.userRouter.getUser.useQuery()

  return (
    <>
      <NeonFilter />
      <Drawer
        variant={isSmUp ? 'permanent' : 'temporary'}
        open={isSmUp ? open : mobileOpen}
        onClose={handleDrawerToggle}
      >
        <Toolbar className={styles.toolbar}>
          <Logo open={open} />
          <MenuToggleButton
            open={open}
            onClick={toggleDrawer}
          />
        </Toolbar>
        <Box className={styles.content}>
          <SidebarItem
            PaperProps={{
              style: {
                width: DRAWER_WIDTH,
                padding: 0,
              },
            }}
            sx={{
              'display': { sm: 'block', xs: 'none' },
              '& .MuiListItemIcon-root': {
                minWidth: open ? 'auto' : 48,
                justifyContent: 'center',
              },
              '& .MuiListItemText-root': {
                opacity: open ? 1 : 0,
              },
            }}
          />
        </Box>
        <UserInfo
          open={open}
          userFullName={userFullName}
          userIconUrl={UserIconUrl || undefined}
          isVerified={userData?.isVerified ?? false}
        />
      </Drawer>
    </>
  )
}
