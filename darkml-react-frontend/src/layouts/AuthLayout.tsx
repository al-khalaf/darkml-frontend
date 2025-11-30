// src/layouts/AuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  Stack,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';

const AuthLayout: React.FC = () => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 0% 0%, ${alpha(theme.palette.primary.main, 0.2)}, transparent 60%),
            radial-gradient(circle at 100% 0%, ${alpha(theme.palette.info.main, 0.2)}, transparent 60%),
            radial-gradient(circle at 0% 100%, ${alpha(theme.palette.success.main, 0.18)}, transparent 55%)
          `,
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 3, sm: 4.5 },
            borderRadius: 4,
            backdropFilter: 'blur(26px)',
            backgroundColor: theme.palette.background.paper,
            borderColor,
            boxShadow:
              '0 30px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.6)',
          }}
        >
          <Stack spacing={2.5} mb={3.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    overflow: 'hidden',
                    background: `
                      radial-gradient(circle at 0% 0%, ${alpha(theme.palette.primary.light, 0.55)}, transparent 55%),
                      radial-gradient(circle at 100% 100%, ${alpha(theme.palette.info.light, 0.55)}, transparent 55%),
                      ${theme.palette.background.paper}
                    `,
                    border: `1px solid ${borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: '0.12em' }}>
                    DM
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'text.secondary',
                      fontSize: 10,
                    }}
                  >
                    DarkML
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    Intelligent Learning Access
                  </Typography>
                </Box>
              </Stack>

              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  fontSize: 10,
                }}
              >
                Secure Area
              </Typography>
            </Stack>

            <Divider sx={{ borderColor, borderBottomWidth: 1 }} />

            <Stack spacing={0.5}>
              <Typography variant="h4" sx={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
                Welcome back
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Sign in to continue to your DarkML workspace.
              </Typography>
            </Stack>
          </Stack>

          <Box>
            <Outlet />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
