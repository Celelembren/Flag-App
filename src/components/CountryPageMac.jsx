import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Container, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const CountryPageMac = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const renderSkeletons = () => (
    <Container sx={{py: 4}}>
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
    </Container>
  );


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch countries');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return renderSkeletons();
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={6}>
        {countries.map((country) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={country.cca3}>
            <Link to={`/mac`}>
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
                  <Typography variant="body1" fontWeight="bold" color="text.primary">
                    {country.name?.common}
                  </Typography>
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <Typography variant="body2" fontWeight={600} color="text.primary">
                      Population:
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1 }} color="text.primary">
                      {country.population.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <Typography variant="body2" fontWeight={600} color="text.primary">
                      Region:
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1 }} color="text.primary">
                      {country.region}
                    </Typography>
                  </Box>
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
        ))}
      </Grid>
    </Container>
  );
};

export default CountryPageMac;
