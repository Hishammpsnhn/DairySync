import { Box, IconButton, InputBase, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { ColorModeContext, tokens } from '../theme'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlined from '@mui/icons-material/SettingsOutlined'
import PersonOutlined from '@mui/icons-material/PersonOutlined'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlined from '@mui/icons-material/LightModeOutlined'

const Topbar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)

  return (
    <Box display="flex" justifyContent="space-between" p={2} height="10%">
      {/* search Bar */}
      <Box display="flex" borderRadius="3px" bgcolor={colors.primary[400]}>
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        <IconButton>
          <PersonOutlined />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Topbar
