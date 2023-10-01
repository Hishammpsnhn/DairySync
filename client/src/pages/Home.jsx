import React from 'react'
import Header from '../components/Header'
import { ColorModeContext, useMode } from '../theme'
import { ThemeProvider, CssBaseline } from '@mui/material'
import Headers from '../components/Headers'

const Home = () => {
  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
          
            <Headers/>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default Home
