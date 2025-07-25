import { Box, Skeleton, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

export const CardSkeleton = ({ height = 200, showContent = true }) => (
  <Box sx={{ borderRadius: 2, overflow: 'hidden' }}>
    <Skeleton 
      variant="rectangular" 
      height={height} 
      sx={{ borderRadius: '12px 12px 0 0' }}
    />
    {showContent && (
      <Box sx={{ p: 2 }}>
        <Skeleton height={24} width="80%" sx={{ mb: 1 }} />
        <Skeleton height={16} width="60%" sx={{ mb: 1 }} />
        <Skeleton height={16} width="40%" />
      </Box>
    )}
  </Box>
);

export const SectionSkeleton = ({ 
  title = "Cargando contenido...", 
  cards = 3, 
  cardHeight = 200 
}) => (
  <Box sx={{ py: 6 }}>
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Skeleton 
        height={40} 
        width="300px" 
        sx={{ mx: 'auto', mb: 2, borderRadius: 2 }} 
      />
      <Skeleton 
        height={20} 
        width="500px" 
        sx={{ mx: 'auto', borderRadius: 2 }} 
      />
    </Box>
    
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
      {Array.from(new Array(cards)).map((_, index) => (
        <CardSkeleton key={index} height={cardHeight} />
      ))}
    </Box>
  </Box>
);

export const LoadingSpinner = ({ message = "Cargando..." }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    py: 8 
  }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <CircularProgress size={60} thickness={4} />
    </motion.div>
    <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
      {message}
    </Typography>
  </Box>
);

export const EmptyState = ({ 
  icon, 
  title = "No hay contenido", 
  subtitle = "El contenido aparecerá aquí cuando esté disponible",
  action 
}) => (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    <Box sx={{ fontSize: '4rem', color: 'text.disabled', mb: 2 }}>
      {icon}
    </Box>
    <Typography variant="h5" color="text.secondary" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
      {subtitle}
    </Typography>
    {action && action}
  </Box>
);