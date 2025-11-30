import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 10,
      }}
    >
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        The page you're looking for doesn't exist or was moved.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/login">
        Go to Login
      </Button>
    </Box>
  );
};

export default NotFoundPage;
