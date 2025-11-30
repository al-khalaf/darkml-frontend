import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

interface State {
  hasError: boolean;
  message?: string;
}

class LmsErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message };
  }

  componentDidCatch(error: any, info: any) {
    console.error('LMS ErrorBoundary caught:', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, message: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            mt: 8,
            mx: 'auto',
            maxWidth: 680,
            textAlign: 'center',
            p: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <Typography variant="h4" gutterBottom>
            We couldn&apos;t load this LMS page
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {this.state.message || 'An unexpected error occurred while fetching LMS data.'}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
            <Button variant="contained" onClick={this.handleRetry} sx={{ px: 3 }}>
              Try again
            </Button>
            <Button variant="outlined" onClick={() => window.location.reload()} sx={{ px: 3 }}>
              Reload page
            </Button>
          </Stack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default LmsErrorBoundary;
