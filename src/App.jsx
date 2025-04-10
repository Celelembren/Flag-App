import React, { useMemo, useState } from 'react';
import { Box, Container, CssBaseline, Grid, InputBase, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import CountryPageMac from './components/CountryPageMac';
import CountryDetails from './Pages/CountryDetails';
import MacPage from './Pages/MacPage';

const App = () => {
  const [mode, setMode] = useState('dark');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light mode customizations
            primary: {
              main: '#f2f2f2',
            },
            background: {
              default: '#f2f2f2',
              paper: '#fff',
            },
            text: {
              primary: '#000000',
             secondary: '#2B3844',
            }
          }
        : {
            // Dark mode customizations
            primary: {
              main: '#90caf9',
            },
            background: {
              default: '#202C36',  
              paper: '#2B3844',      
            },
            text: {
              primary: '#ffffff',
              secondary: '#aaaaaa',
            },
            
          }),
        },
        
  }), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
<ThemeProvider theme={theme}>
  <CssBaseline />
  <Router>
    <Navbar toggleTheme={toggleTheme} mode={mode} />
    <Routes>
    <Route path="/" element={<CountryPageMac />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/country/:id" element={<CountryDetails />} />
      <Route path="/mac" element={<MacPage />} />
    </Routes>
  </Router>
</ThemeProvider>
  );
};

export default App;
