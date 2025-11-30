// src/theme.ts
import { alpha, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }

  interface TypeBackground {
    elevated?: string;
  }
}

const primaryMain = '#6366F1';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: primaryMain,
      light: '#A5B4FC',
      dark: '#4F46E5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06B6D4',
      light: '#67E8F9',
      dark: '#0E7490',
      contrastText: '#ffffff',
    },
    error: {
      main: '#DC2626',
      light: '#FCA5A5',
      dark: '#991B1B',
    },
    warning: {
      main: '#FACC15',
      light: '#FEF08A',
      dark: '#CA8A04',
    },
    info: {
      main: '#0284C7',
      light: '#38BDF8',
      dark: '#0369A1',
    },
    success: {
      main: '#22C55E',
      light: '#4ADE80',
      dark: '#15803D',
    },
    neutral: {
      main: '#64748B',
      light: '#94A3B8',
      dark: '#334155',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
      elevated: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#475569',
      disabled: alpha('#64748B', 0.5),
    },
    divider: alpha('#CBD5E1', 0.7),
    action: {
      hover: alpha('#E2E8F0', 0.6),
      selected: alpha(primaryMain, 0.12),
      disabled: alpha('#94A3B8', 0.5),
      disabledBackground: alpha('#E2E8F0', 0.5),
      focus: alpha(primaryMain, 0.3),
      hoverOpacity: 0.08,
      selectedOpacity: 0.12,
      disabledOpacity: 0.38,
      focusOpacity: 0.24,
      activatedOpacity: 0.22,
    },
  },

  shape: { borderRadius: 12 },

  typography: {
    fontFamily: [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"SF Pro Text"',
      '"Inter"',
      'sans-serif',
    ].join(','),
    h1: { fontSize: '2.6rem', fontWeight: 700 },
    h2: { fontSize: '2.1rem', fontWeight: 700 },
    h3: { fontSize: '1.8rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1.05rem', fontWeight: 600 },
    subtitle1: { fontWeight: 500, color: '#64748B' },
    subtitle2: { fontWeight: 500, color: '#94A3B8' },
    body1: { fontSize: '0.95rem', color: '#334155' },
    body2: { fontSize: '0.85rem', color: '#475569' },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    overline: {
      fontSize: '0.7rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#94A3B8',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            'radial-gradient(circle at 0% 0%, rgba(99,102,241,0.08), transparent 55%), #F9FAFB',
          color: '#1E293B',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: alpha('#94A3B8', 0.6),
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: alpha('#64748B', 0.8),
        },
      },
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'default',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${alpha('#CBD5E1', 0.7)}`,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          border: `1px solid ${alpha('#CBD5E1', 0.8)}`,
          boxShadow:
            '0 6px 18px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,1)',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: `1px solid ${alpha('#CBD5E1', 0.9)}`,
          backgroundColor: '#FFFFFF',
          '&::before': { display: 'none' },
        },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
          paddingBlock: 8,
        },
        containedPrimary: {
          backgroundImage: 'linear-gradient(135deg, #6366F1, #818CF8)',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha('#94A3B8', 0.6),
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#64748B',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: primaryMain,
            boxShadow: `0 0 0 2px ${alpha(primaryMain, 0.3)}`,
          },
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:hover': {
            backgroundColor: alpha('#E2E8F0', 0.8),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(primaryMain, 0.15),
            color: primaryMain,
          },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1E293B',
          color: '#F8FAFC',
          borderRadius: 8,
        },
        arrow: { color: '#1E293B' },
      },
    },
  },
});

export default theme;
