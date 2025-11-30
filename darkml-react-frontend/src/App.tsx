// src/App.tsx
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
