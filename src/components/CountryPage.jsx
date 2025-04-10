import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const CountryPage = ({ country }) => {
  const theme = useTheme(); 
  const navigate = useNavigate();


  const handleClick = () => {
    // Pass the country data as state to the CountryDetails page
    navigate(`/country/${country.cca3}`, { state: { country } });
  };

   return (
    <Grid  size={{ xs: 12, sm: 6, md: 3 }} key={country.cca3}> 
 <Link to={`/country/${country.cca3}`} state={{ country }} style={{ textDecoration: 'none', color: 'inherit' }}>
  <Box
    sx={{
      width: '100%',
      borderRadius: 2,
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      transition: 'transform 0.2s',
      '&:hover': {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        backgroundColor: '#f5f5f515',
        cursor: 'pointer',
      },
    }}
    onClick={handleClick} // Ensure this onClick is correctly navigating
  >
    <img
      src={country.flags?.svg || country.flags?.png}
      alt={`Flag of ${country.name?.common}`}
      style={{
        width: '100%',
        height: '130px',
        objectFit: 'cover',
        display: 'block',
      }}
    />
    <Box sx={{ p: 2 }}>
      {/* Country Name */}
      <Typography variant="body1" fontWeight="bold" color="text.primary">
        {country.name?.common}
      </Typography>

      {/* Population */}
      <Box sx={{ display: 'flex', mt: 1 }}>
        <Typography variant="body2" fontWeight={600} color="text.primary">
          Population:
        </Typography>
        <Typography variant="body2" sx={{ ml: 1 }} color="text.primary">
          {country.population.toLocaleString()}
        </Typography>
      </Box>

      {/* Region */}
      <Box sx={{ display: 'flex', mt: 1 }}>
        <Typography variant="body2" fontWeight={600} color="text.primary">
          Region:
        </Typography>
        <Typography variant="body2" sx={{ ml: 1 }} color="text.primary">
          {country.region}
        </Typography>
      </Box>

      {/* Capital */}
      <Box sx={{ display: 'flex', mt: 1 }}>
        <Typography variant="body2" fontWeight={600} color="text.primary">
          Capital:
        </Typography>
        <Typography variant="body2" sx={{ ml: 1 }} color="text.primary">
          {country.capital?.[0] || 'N/A'}
        </Typography>
      </Box>
    </Box>
  </Box>
</Link>
        </Grid>
      
  );
};

export default CountryPage;
