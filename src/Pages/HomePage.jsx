import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  InputBase,
  Container,
  useTheme,
  Skeleton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CountryPage from "../components/CountryPage";

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const [regionFilter, setRegionFilter] = useState("");

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

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name?.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRegion =
      regionFilter === "" || country.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 4 }}>
<Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-between',
    alignItems: { xs: 'strech', md: 'center' },
    gap: 2,
    mb: 4,
  }}
>
  {/* Search Bar */}
  <Box
    sx={{
      width: { xs: '100%', md: 350 },
      backgroundColor: theme.palette.background.paper,
      borderRadius: 2,
      boxShadow: 3,
      px: 2,
      py: 1,
    }}
  >
    <InputBase
      fullWidth
      placeholder="Search countries"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      sx={{ color: theme.palette.text.primary }}
    />
  </Box>

  {/* Region Filter */}
  <Box
    sx={{
      width: { xs: '50%', md: 200 },
      backgroundColor: theme.palette.background.paper,
      borderRadius: 2,
      boxShadow: 3,
      px: 2,
      py: 1.2,
    }}
  >
    <FormControl fullWidth variant="standard">
      <Select
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
        disableUnderline
        displayEmpty
        sx={{ color: theme.palette.text.primary }}
      >
        <MenuItem value="">All Regions</MenuItem>
        <MenuItem value="Africa">Africa</MenuItem>
        <MenuItem value="Americas">Americas</MenuItem>
        <MenuItem value="Asia">Asia</MenuItem>
        <MenuItem value="Europe">Europe</MenuItem>
        <MenuItem value="Oceania">Oceania</MenuItem>
      </Select>
    </FormControl>
  </Box>
</Box>

      {/* Countries */}
      {loading ? (
        renderSkeletons()
      ) : (
        <Grid container spacing={6} size={{ xs: 12, sm: 6, md: 3 }}>
          {!loading && filteredCountries.length === 0 && (
            <Box sx={{ mt: 4, textAlign: "center", width: "100%" }}>
              <Typography variant="h6" color="text.secondary">
                No countries found matching "{searchQuery}"
              </Typography>
            </Box>
          )}
          {filteredCountries.map((country) => (
            <CountryPage key={country.cca3} country={country} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
