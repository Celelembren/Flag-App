import React, { useEffect, useState } from "react";
import {
  Box,
  Skeleton,
  Grid,
  Typography,
  Container,
  useTheme,
} from "@mui/material";

const CountryFlags = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme(); // Optional: to access theme palette if needed

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const renderSkeletons = () => (
    <Grid container spacing={4}>
      {[...Array(12)].map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Box
            sx={{
              width: "100%",
              height: 220,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={130} />
            <Box sx={{ p: 2 }}>
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  const renderCountries = () => (
    <Grid container spacing={4} >
      {countries.map((country) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={country.cca3}>
          <Box
            sx={{
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: theme.palette.background.paper,
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
  <Typography variant="body1" fontWeight="bold" color="text.primary" >
    {country.name?.common}
  </Typography>

  {/* Population */}
  <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', mt: 1, fontWeight: 600 }}>
    <Typography variant="body2" color="text.primary">
      Population:
    </Typography>
    <Typography variant="body2" color="text.primary" sx={{marginLeft: 1, fontWeight: 400}}>
      {country.population.toLocaleString()}
    </Typography>
  </Box>

  {/* Region */}
  <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', mt: 1, fontWeight: 600 }}>
    <Typography variant="body2"  color="text.primary">
      Region:
    </Typography>
    <Typography variant="body2" color="text.primary" sx={{marginLeft: 1, fontWeight: 400}}>
      {country.region}
    </Typography>
  </Box>

  {/* Capital */}
  <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', mt: 1, fontWeight: 600 }}>
    <Typography variant="body2"  color="text.primary">
      Capital:
    </Typography>
    <Typography variant="body2" color="text.primary" sx={{marginLeft: 1, fontWeight: 400}}>
      {country.capital}
    </Typography>
  </Box>
</Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {loading ? renderSkeletons() : renderCountries()}
    </Container>
  );
};

export default CountryFlags;
