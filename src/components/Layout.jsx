import { Box } from '@mui/material';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: '#F1F8E9' // Fondo verde muy claro
    }}>
      <Header />
      <Box sx={{ 
        flex: 1,
        width: '100%',
        pt: { xs: 8, sm: 9 }, // Padding top para compensar el header
        pb: 4
      }}>
        {children}
      </Box>
    </Box>
  );
}