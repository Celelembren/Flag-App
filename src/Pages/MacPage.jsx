import { Box, Button, Container, Grid } from '@mui/material';
import mac from '../assets/marcus-glad liten.png';
import macAlt from '../assets/ahri.jpg'; 
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MacPage = () => {

    const [showAlt, setShowAlt] = useState(false);
    const navigate = useNavigate();

useEffect(() => {
  const timer = setTimeout(() => {
    setShowAlt(true);
  }, 2000);
  return () => clearTimeout(timer);
}, []);


  return (
    
    <Container maxWidth="lg" sx={{ py: 4 }}>
<Box sx={{ position: 'absolute', top: 70, left: 24, zIndex: 10 }}>
  <Button
    variant="contained"
    color="primary"
    onClick={() => navigate('/home')} // or use window.location.href = '/' if not using navigate
    sx={{
      textTransform: 'none',
      fontWeight: 'bold',
      px: 3,
      py: 1,
      borderRadius: 2,
      boxShadow: 4,
    }}
  >
    Return to Reality
  </Button>
</Box>
      <Grid container spacing={2}>
        
        {Array.from({ length: 9 }).map((_, index) => (
          <Grid size={{ xs: 12, sm: 4, md: 4 }} key={index}>
            <Box>
              <img
                src={index === 4 && showAlt ? macAlt : mac}
                alt={`Marcus ${index === 4 ? 'Surprise' : 'Glad'}`}
                style={{
                  width: '100%',
                  height: 250,
                  objectFit: 'contain',
                  display: 'block',
                    animation: index === 4 ? 'glitch 0.4s infinite' : 'none'
                }}
              />
            </Box>
          </Grid>
          
        ))}
      </Grid>
    </Container>
  );
};

export default MacPage;
