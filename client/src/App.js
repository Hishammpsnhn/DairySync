
import { ColorModeContext, useMode } from './theme'
import { ThemeProvider, CssBaseline } from '@mui/material'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Sellers from './components/Sellers'
import Form from './components/Form'
import Dashboard from './pages/Dashboard'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import Auth from './pages/Auth'

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const [isSidebar, setIsSidebar] = useState(true);

  const shouldShowSidebar = () => {
    return location.pathname !== '/login';
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
              <Route path='/login' element={<Auth />} />
              <Route path='/' element={<Dashboard />} />
              <Route path='/sellers' element={<Sellers />} />
              <Route path='/line' element={<LineChart />} />
              <Route path='/bar' element={<BarChart />} />
              <Route path='/form' element={<Form />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
