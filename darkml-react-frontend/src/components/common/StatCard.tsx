// src/components/common/StatCard.tsx
import React from 'react';
import  { Card, CardContent, Typography, Box } from '@mui/material';
import type {SxProps, Theme} from '@mui/material';

interface StatCardProps {
  label: string;
  value: string | number;
  helperText?: string;
  sx?: SxProps<Theme>;        // <-- ADD THIS
}

const StatCard: React.FC<StatCardProps> = ({ label, value, helperText, sx }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 24,       // default radius
        px: 0.25,
        py: 0.25,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 0% 0%, rgba(79,70,229,0.25), transparent 55%), radial-gradient(circle at 100% 100%, rgba(56,189,248,0.18), transparent 55%)',
          opacity: 0.9,
          pointerEvents: 'none',
        },
        ...sx,                  // <-- MERGE USER-PROVIDED STYLES
      }}
    >
      <CardContent
        sx={{
          position: 'relative',
          zIndex: 1,
          p: 2.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.25,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'text.secondary',
            fontSize: 10,
          }}
        >
          {label}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, letterSpacing: '-0.03em' }}>
            {value}
          </Typography>
        </Box>

        {helperText && (
          <Typography variant="body2" color="text.secondary">
            {helperText}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
