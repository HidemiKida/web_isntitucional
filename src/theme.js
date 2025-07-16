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
    },
    h2: {
      fontWeight: 700,
      color: '#2E7D32',
    },
    h3: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2E7D32',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
        contained: {
          backgroundColor: '#2E7D32',
          '&:hover': {
            backgroundColor: '#1B5E20',
          },
        },
        outlined: {
          borderColor: '#2E7D32',
          color: '#2E7D32',
          '&:hover': {
            borderColor: '#1B5E20',
            backgroundColor: 'rgba(46, 125, 50, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #E8F5E9',
        },
      },
    },
  },
});

export default theme;