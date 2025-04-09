import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Container,
  useTheme,
  Skeleton
} from '@mui/material';

import ArrowDark from '../assets/arrow-left.svg';
import ArrowLight from '../assets/arrow-left-dark.svg';

const CountryDetails = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const [error, setError] = useState(false);

  const isDarkMode = theme.palette.mode === 'dark';
  const arrowIcon = isDarkMode ? ArrowDark : ArrowLight;

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
        if (!response.ok) throw new Error("Fetch failed");
        const data = await response.json();
        setCountry(data[0]);
        setError(false);
      } catch (err) {
        console.error('Error fetching country:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCountry();
  }, [id]);


  const renderSkeleton = () => (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="rounded" width={100} height={36} />
      </Box>
  
      <Grid container spacing={8} alignItems="center">
        {/* Flag Skeleton */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Grid>
  
        {/* Text Skeletons */}
        <Grid  size={{ xs: 12, md: 6 }}>
          <Skeleton variant="text" width="60%" height={40} />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid  size={{ xs: 12, md: 6 }}>
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} variant="text" height={28} sx={{ mb: 1 }} />
              ))}
            </Grid>
            <Grid  size={{ xs: 12, md: 6 }}>
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} variant="text" height={28} sx={{ mb: 1 }} />
              ))}
            </Grid>
          </Grid>
  
          <Box sx={{ mt: 4 }}>
            <Skeleton variant="text" width={160} height={28} />
            <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} variant="rounded" width={80} height={36} />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );

  if (loading) return renderSkeleton();

  if (!country) return <Typography>Error loading country</Typography>;

  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = country;

  const nativeName = Object.values(name.nativeName || {})[0]?.common || name.common;
  const currency = currencies ? Object.values(currencies)[0]?.name : 'N/A';
  const language = languages ? Object.values(languages).join(', ') : 'N/A';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Box sx={{ mb: 4 }}>
        <Button
          onClick={() => navigate('/')}
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 2,
            color: theme.palette.text.primary,
            borderColor: 'transparent',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
              borderColor: 'transparent',
            },
          }}
        >
          <img src={arrowIcon} alt="Back Arrow" style={{ width: 20, height: 20 }} />
          Back
        </Button>
      </Box>

      {/* Main Layout */}
      <Grid container spacing={6} alignItems="center">
        {/* Flag */}
        <Grid  size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={flags.svg}
            alt={`Flag of ${name.common}`}
            sx={{
              width: '100%',
              borderRadius: 2,
              boxShadow: 3,
              maxHeight: 400,
              objectFit: 'cover',
            }}
          />
        </Grid>

        {/* Country Info */}
        <Grid  size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontWeight="bold" mb={3}>
            {name.common}
          </Typography>

          <Grid container spacing={2}>
            <Grid  size={{ xs: 12, sm: 6 }}>
              <Typography><strong>Native Name:</strong> {nativeName}</Typography>
              <Typography><strong>Population:</strong> {population.toLocaleString()}</Typography>
              <Typography><strong>Region:</strong> {region}</Typography>
              <Typography><strong>Subregion:</strong> {subregion}</Typography>
              <Typography><strong>Capital:</strong> {capital?.join(', ') || 'N/A'}</Typography>
            </Grid>
            <Grid  size={{ xs: 12, sm: 6 }}>
              <Typography><strong>Top Level Domain:</strong> {tld?.join(', ')}</Typography>
              <Typography><strong>Currencies:</strong> {currency}</Typography>
              <Typography><strong>Languages:</strong> {language}</Typography>
            </Grid>
          </Grid>

          {/* Border Countries */}
          {borders?.length > 0 && (
            <Box mt={4}>
              <Typography fontWeight="bold" mb={1}>Border Countries:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {borders.map((borderCode) => (
                  <Button
                    key={borderCode}
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/country/${borderCode}`)}
                  >
                    {borderCode}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CountryDetails;
