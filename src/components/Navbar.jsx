import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Container, Button } from '@mui/material';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useNavigate } from "react-router-dom";

import lightModeLogo from '../assets/techover-logo-dark.png';
import darkModeLogo from '../assets/techover-logo.png'; 

const Navbar = ({ toggleTheme, mode }) => {

  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ width: '100%', px: 0 }}>
      {/* Toolbar is still inside AppBar, but we control the content width */}
      <Toolbar>
        {/* Use Box to center items inside the Toolbar */}
        <Container disableGutters maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px:{ xs: 1, md:3} }}>
          {/* Navbar Title (left-aligned) */}
          <Button onClick={() => navigate("/")}>
          <Typography variant="h6" color="text.primary">
            The Flag App
          </Typography>
          </Button>
          <Box sx={{ display: {xs: 'none', md:'flex'}, alignItems: 'center' }}>
            <img 
              src={mode === 'dark' ? darkModeLogo : lightModeLogo} 
              alt="Logo"
              style={{ height: 30, marginRight: 10, width: 200 }} // Adjust the height of the logo as per your needs
            />
            </Box>
            <Button
  onClick={toggleTheme}
  sx={{
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textTransform: 'none', // prevents text from being uppercased
  }}
>
  {mode === 'dark' ? <BedtimeIcon sx={{ mr: 1 }} /> : <BedtimeOutlinedIcon sx={{ mr: 1 }} />}
  <Typography variant="body1">{mode === 'dark' ? 'Dark Mode' : 'Light Mode'}</Typography>
</Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
