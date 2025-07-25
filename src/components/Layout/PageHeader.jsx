import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';

export default function PageHeader({ 
  title, 
  subtitle, 
  icon, 
  breadcrumbs = [], 
  centerContent = true 
}) {
  return (
    <Box sx={{ pt: { xs: 12, md: 14 }, pb: 6, backgroundColor: 'background.default' }}>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <MuiLink
                component={Link}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                <FaHome size={14} style={{ marginRight: 6 }} />
                Inicio
              </MuiLink>
              {breadcrumbs.map((crumb, index) => (
                <Typography 
                  key={index}
                  color="text.primary" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    fontSize: '0.9rem'
                  }}
                >
                  {crumb.icon && <Box sx={{ mr: 1, fontSize: '14px' }}>{crumb.icon}</Box>}
                  {crumb.text}
                </Typography>
              ))}
            </Breadcrumbs>
          </Box>
        )}

        {/* Header Content */}
        <Box sx={{ textAlign: centerContent ? 'center' : 'left' }}>
          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            variant="h3"
            gutterBottom
            sx={{
              color: 'primary.dark',
              fontWeight: 700,
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              mb: 3,
              '&::after': centerContent ? {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                backgroundColor: 'primary.main',
                borderRadius: 2
              } : {}
            }}
          >
            {icon && <Box sx={{ fontSize: '2rem' }}>{icon}</Box>}
            {title}
          </Typography>

          {subtitle && (
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                mt: 2,
                maxWidth: '800px',
                mx: centerContent ? 'auto' : 0,
                lineHeight: 1.6
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}