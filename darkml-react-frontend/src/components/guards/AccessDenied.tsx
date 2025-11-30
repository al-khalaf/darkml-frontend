import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface AccessDeniedProps {
  title?: string;
  message?: string;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({
  title = 'Access restricted',
  message = 'You do not have permission to view this content.',
}) => {
  return (
    <Box
      sx={{
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 3,
        p: 4,
        textAlign: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {message}
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="outlined"
        sx={{ borderRadius: 999, textTransform: 'none' }}
      >
        Return to home
      </Button>
    </Box>
  );
};

export default AccessDenied;
