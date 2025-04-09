import React, { useMemo, useState } from 'react';
import { Box, Container, CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/Homepage';

import CountryDetails from './Pages/CountryDetails';

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
              primary: 'black',
             secondary: '#2B3844',
            }
          }
        : {
            // Dark mode customizations
            primary: {
              main: '#90caf9',
            },
            background: {
              default: '#202C36',   // Page background
              paper: '#2B3844',      // Cards, AppBar, etc.
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
    
      {/* Navbar with text and light/dark mode */}
      <Navbar toggleTheme={toggleTheme} mode={mode} />

      {/* Main content, with Search Bar and Country Cards */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Search Bar and Filters Container */}
        <Grid container spacing={4} sx={{ marginBottom: 4 }}>
          {/* Search Bar */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: theme.palette.background.paper, borderRadius: 2, boxShadow: 3 }}>
              {/* <SearchIcon sx={{ color: theme.palette.text.secondary, marginLeft: 2 }} />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search countries"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              /> */}
            </Box>
          </Grid>

          {/* Filter Placeholder */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: theme.palette.background.paper, borderRadius: 2, boxShadow: 3 }}>
              {/* You can add filter UI elements here */}
            </Box>
          </Grid>
        </Grid>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:id" element={<CountryDetails />} />
        </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
