'use client'

import { useState } from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import type { DrawerProps } from '@mui/material/Drawer'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Link from 'next/link'
import { ListItemButton, Grid } from '@mui/material'
import { getListItems } from '@/constants/listItems'

export const SidebarItem = (props: DrawerProps) => {
  const { ...other } = props
  const [selectedSideItem, setSelectedSideItem] = useState(1)
  const [listItems] = useState(getListItems())

  return (
    <Grid container>
      <Drawer
        variant="permanent"
        {...other}
      >
        <List disablePadding>
          <Box key={'Build'}>
            {listItems.map((it) => (
              <ListItem
                disablePadding
                key={it.id}
              >
                {it.href ? (
                  <Link
                    href={it.href}
                    style={{ width: '100%', textDecoration: 'none' }}
                  >
                    <ListItemButton
                      selected={selectedSideItem === it.id}
                      onClick={() => {
                        setSelectedSideItem(it.id)
                      }}
                    >
                      <ListItemIcon>{it.icon}</ListItemIcon>
                      <ListItemText>{it.label}</ListItemText>
                    </ListItemButton>
                  </Link>
                ) : (
                  <ListItemButton
                    selected={selectedSideItem === it.id}
                    onClick={() => {
                      setSelectedSideItem(it.id)
                    }}
                  >
                    <ListItemIcon>{it.icon}</ListItemIcon>
                    <ListItemText>{it.label}</ListItemText>
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </Box>
        </List>
      </Drawer>
    </Grid>
  )
}
