
import { ColorModeContext, useMode } from './theme'
import { ThemeProvider, CssBaseline } from '@mui/material'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Teams from './components/Teams'
import Form from './components/Form'
import Dashboard from './pages/Dashboard'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import Auth from './pages/Auth'
import { useSelector } from 'react-redux'
import RequireAuth from './components/RequireAuth'

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)


  const shouldShowSidebar = () => {
    return location.pathname !== '/';
  };



  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {shouldShowSidebar() && <Sidebar />}
          <main className="content">
            <Topbar />
            <Routes>
              <Route path='/' element={<Auth />} />
              <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path='/teams' element={<RequireAuth><Teams /></RequireAuth>} />
              <Route path='/line' element={<RequireAuth><LineChart /></RequireAuth>} />
              <Route path='/bar' element={<RequireAuth><BarChart /></RequireAuth>} />
              <Route path='/form' element={<RequireAuth><Form /></RequireAuth>} />

              {/* seller */}
              <Route path='/seller' element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
