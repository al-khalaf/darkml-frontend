import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import type { AlertColor } from '@mui/material';

export const useToast = () => {
  const [state, setState] = React.useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({ open: false, message: '', severity: 'info' });

  const showToast = (message: string, severity: AlertColor = 'info') => {
    setState({ open: true, message, severity });
  };

  const handleClose = () => setState((prev) => ({ ...prev, open: false }));

  const toast = (
    <Snackbar
      open={state.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={state.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );

  return { showToast, toast } as const;
};
