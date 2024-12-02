import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d2ff',
      light: '#64e5ff',
      dark: '#0099cc',
      contrastText: '#000000',
    },
    secondary: {
      main: '#3a7bd5',
      light: '#6fa8ff',
      dark: '#0051a3',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    background: {
      default: '#121212',
      paper: 'rgba(18, 18, 18, 0.95)',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
    error: {
      main: '#ff5252',
      light: '#ff867f',
      dark: '#c50e29',
    },
    warning: {
      main: '#ffd740',
      light: '#ffff74',
      dark: '#c8a600',
    },
    info: {
      main: '#40c4ff',
      light: '#82f7ff',
      dark: '#0094cc',
    },
    success: {
      main: '#69f0ae',
      light: '#9fffe0',
      dark: '#2bbd7e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#ffffff',
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#ffffff',
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#ffffff',
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.35,
      color: '#ffffff',
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#ffffff',
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#ffffff',
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
      color: 'rgba(255, 255, 255, 0.9)',
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      color: 'rgba(255, 255, 255, 0.8)',
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: 'rgba(255, 255, 255, 0.9)',
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.7)',
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      color: 'rgba(255, 255, 255, 0.6)',
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 2.66,
      color: 'rgba(255, 255, 255, 0.7)',
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            background: '#2b2b2b',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor: '#6b6b6b',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#7b7b7b',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(18, 18, 18, 0.95)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-4px)',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #00d2ff 30%, #3a7bd5 90%)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(18, 18, 18, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(18, 18, 18, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(18, 18, 18, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 16,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00d2ff',
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(18, 18, 18, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 8,
          fontSize: '0.75rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
        },
      },
    },
  },
});

export default theme;
