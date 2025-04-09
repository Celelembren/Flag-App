import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Container } from '@mui/material';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import BedtimeIcon from '@mui/icons-material/Bedtime';

const Navbar = ({ toggleTheme, mode }) => {

  const lightModeLogo = 'assets/techover-logo-dark.png';
  const darkModeLogo = 'assets/techover-logo.png'; 

  return (
    <AppBar  position="sticky" sx={{ width: '100%', px: 0 }}>
      {/* Toolbar is still inside AppBar, but we control the content width */}
      <Toolbar>
        {/* Use Box to center items inside the Toolbar */}
        <Container disableGutters maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px:{ xs: 1, md:6} }}>
          {/* Navbar Title (left-aligned) */}
          <Typography variant="h6">
            The Flag App
          </Typography>
          <Box sx={{ display: {xs: 'none', md:'flex'}, alignItems: 'center' }}>
            <img 
              src={mode === 'dark' ? darkModeLogo : lightModeLogo} 
              alt="Logo"
              style={{ height: 30, marginRight: 10, width: 200 }} // Adjust the height of the logo as per your needs
            />
            </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ color: 'inherit' }} onClick={toggleTheme}>
            {mode === 'dark' ? <BedtimeIcon /> : <BedtimeOutlinedIcon />}
          </IconButton>
          
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </Typography>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
