import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import { FaNewspaper, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

export default function NoticiaCard({ noticia }) {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Fecha no disponible';
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px rgba(46, 125, 50, 0.2)'
      }
    }}>
      <Box sx={{ position: 'relative' }}>
        {noticia.imagen ? (
          <CardMedia
            component="img"
            height="200"
            image={noticia.imagen}
            alt={noticia.titulo}
            sx={{ objectFit: 'cover' }}
          />
        ) : (
          <Box
            sx={{
              height: 200,
              background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.main'
            }}
          >
            <FaNewspaper size={40} />
          </Box>
        )}
        <Chip
          icon={<FaCalendarAlt size={12} />}
          label={formatDate(noticia.fecha)}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: 'primary.main',
            fontWeight: 600,
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            lineHeight: 1.3,
            mb: 2
          }}
        >
          {truncateText(noticia.titulo, 50)}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 3, 
            lineHeight: 1.5,
            flexGrow: 1
          }}
        >
          {truncateText(noticia.descripcion, 100)}
        </Typography>
        
        <Button
          variant="outlined"
          size="small"
          endIcon={<FaArrowRight />}
          sx={{ mt: 'auto' }}
        >
          Leer más
        </Button>
      </CardContent>
    </Card>
  );
}