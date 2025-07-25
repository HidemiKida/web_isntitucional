import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Verde forest - Color principal del logo
      light: '#4CAF50', // Verde más claro para hover
      dark: '#1B5E20', // Verde oscuro para énfasis
    },
    secondary: {
      main: '#424242', // Gris oscuro - del texto/pluma del logo
      light: '#757575',
      dark: '#212121',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#424242',
    },
    success: {
      main: '#388E3C', // Verde alternativo
    },
    custom: {
      lightGreen: '#E8F5E9', // Fondo verde claro para secciones
      paleGreen: '#C8E6C9', // Verde muy suave para bordes
    }
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      color: '#2E7D32',
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
      '@media (min-width:900px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontWeight: 700,
      color: '#2E7D32',
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:900px)': {
        fontSize: '3rem',
      },
    },
    h3: {
      fontWeight: 600,
      color: '#2E7D32',
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '1.8rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2.2rem',
      },
    },
    h4: {
      fontWeight: 600,
      color: '#2E7D32',
      fontSize: '1.3rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontWeight: 600,
      color: '#2E7D32',
      fontSize: '1.1rem',
      '@media (min-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontWeight: 600,
      color: '#2E7D32',
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1.1rem',
      },
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  spacing: 8, // Espaciado consistente
  shape: {
    borderRadius: 12, // Bordes redondeados consistentes
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '16px',
          paddingRight: '16px',
          '@media (min-width:600px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2E7D32',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          backgroundColor: '#2E7D32',
          '&:hover': {
            backgroundColor: '#1B5E20',
          },
        },
        outlined: {
          borderColor: '#2E7D32',
          borderWidth: '2px',
          color: '#2E7D32',
          '&:hover': {
            borderColor: '#1B5E20',
            borderWidth: '2px',
            backgroundColor: 'rgba(46, 125, 50, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(46, 125, 50, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 40px rgba(46, 125, 50, 0.15)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;