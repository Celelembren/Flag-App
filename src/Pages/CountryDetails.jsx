import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

const CountryDetails = () => {
  const { id } = useParams();

  return (
    <Box p={4}>
      <Typography variant="h4">Country Detail: {id}</Typography>
      {/* Fetch and display more info about the country using id (cca3) */}
    </Box>
  );
};

export default CountryDetails;
