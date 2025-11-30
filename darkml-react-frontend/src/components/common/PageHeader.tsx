// src/components/common/PageHeader.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <Box
      mb={4}
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 999,
              position: 'relative',
              overflow: 'hidden',
              background:
                'radial-gradient(circle at 0% 0%, rgba(96,165,250,0.7), transparent 55%), radial-gradient(circle at 100% 100%, rgba(129,140,248,0.6), transparent 55%), #020617',
              boxShadow:
                '0 0 0 1px rgba(148,163,184,0.5), 0 12px 30px rgba(15,23,42,0.8)',
            }}
          />
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 600,
                letterSpacing: '-0.03em',
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5, maxWidth: 720 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 2,
          height: 2,
          width: '100%',
          borderRadius: 999,
          background:
            'linear-gradient(90deg, rgba(79,70,229,0.7), rgba(56,189,248,0.5), rgba(16,185,129,0.3))',
          opacity: 0.85,
        }}
      />
    </Box>
  );
};

export default PageHeader;
