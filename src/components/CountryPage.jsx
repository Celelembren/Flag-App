import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  useTheme,
} from "@mui/material";

const CountryPage = ({ country }) => {
  const theme = useTheme(); // Optional: to access theme palette if needed

    return (
    <Grid  size={{ xs: 12, sm: 6, md: 3 }}>
        
         <Box
        sx={{
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: theme.palette.background.paper,
          boxShadow: 3,
        }}
      >
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`Flag of ${country.name?.common}`}
          style={{
            width: "100%",
            height: "130px",
            objectFit: "cover",
            display: "block",
          }}
        />

        <Box sx={{ p: 2 }}>
          <Typography variant="body1" fontWeight="bold" color="text.primary">
            {country.name?.common}
          </Typography>

          {/* Population */}
          <Box sx={{ display: "flex", mt: 1 }}>
            <Typography variant="body2" color="text.primary" fontWeight={600}>
              Population:
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ ml: 1, fontWeight: 400 }}
            >
              {country.population.toLocaleString()}
            </Typography>
          </Box>

          {/* Region */}
          <Box sx={{ display: "flex", mt: 1 }}>
            <Typography variant="body2" color="text.primary" fontWeight={600}>
              Region:
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ ml: 1, fontWeight: 400 }}
            >
              {country.region}
            </Typography>
          </Box>

          {/* Capital */}
          <Box sx={{ display: "flex", mt: 1 }}>
            <Typography variant="body2" color="text.primary" fontWeight={600}>
              Capital:
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ ml: 1, fontWeight: 400 }}
            >
              {country.capital}
            </Typography>
          </Box>
        </Box>
      </Box>
        </Grid>
      
  );
};

export default CountryPage;
