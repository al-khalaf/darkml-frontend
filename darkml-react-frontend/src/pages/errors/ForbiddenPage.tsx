import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ForbiddenPage: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h2" gutterBottom>
        403
      </Typography>
      <Typography variant="h5" gutterBottom>
        Not Authorized
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        You don't have permission to view this page.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/login">
        Go to Login
      </Button>
    </Box>
  );
};

export default ForbiddenPage;
