import { Box, Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaBook, FaChalkboardTeacher } from 'react-icons/fa';

export default function HomeMain() {
  const sliderImages = [
    '/slide1.jpg',
    '/slide2.jpg',
    '/slide3.jpg'
  ];

  const featuredCards = [
    {
      icon: <FaGraduationCap size={40} />,
      title: 'Educación de Calidad',
      description: 'Formación integral para nuestros estudiantes'
    },
    {
      icon: <FaUsers size={40} />,
      title: 'Comunidad',
      description: 'Construyendo juntos el futuro'
    },
    {
      icon: <FaBook size={40} />,
      title: 'Programas Académicos',
      description: 'Excelencia en la enseñanza'
    },
    {
      icon: <FaChalkboardTeacher size={40} />,
      title: 'Docentes Calificados',
      description: 'Experiencia y dedicación'
    }
  ];

  return (
    <Box sx={{ 
      position: 'relative',
      mt: { xs: '64px', md: '72px' }
    }}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        style={{ height: 'calc(80vh - 52px)' }}
      >
        {sliderImages.map((img, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                height: 'calc(100vh - 72px)',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.4)'
                }
              }}
            >
              <Container>
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    zIndex: 2
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                                      <Typography 
                      variant="h2" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 700,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        fontSize: { xs: '2.5rem', md: '3.75rem' }
                      }}
                    >
                      Unidad Educativa Fiscal
                    </Typography>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        mb: 2,
                        fontWeight: 600,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        fontSize: { xs: '2rem', md: '3rem' }
                      }}
                    >
                      "Olga Patricia Acebo Alvarez"
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 4,
                        textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                        fontSize: { xs: '1.25rem', md: '1.5rem' }
                      }}
                    >
                      Formando líderes para el futuro
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: '#e53935',
                        '&:hover': {
                          backgroundColor: '#c62828'
                        },
                        px: 4,
                        py: 1.5
                      }}
                    >
                      Conoce más
                    </Button>
                  </motion.div>
                </Box>
              </Container>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Cards Superpuestas */}
      <Container
        sx={{
          position: 'relative',
          marginTop: '-100px',
          zIndex: 2,
          pb: 6
        }}
      >
        <Grid container spacing={3}>
          {featuredCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box 
                      sx={{ 
                        color: 'primary.main',
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60px'
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{
                        color: 'primary.dark',
                        fontWeight: 600,
                        mb: 2,
                        fontSize: '1.25rem',
                        lineHeight: 1.3
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.95rem',
                        lineHeight: 1.6
                      }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sección de Noticias */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              mb: 6,
              fontWeight: 700,
              color: 'primary.dark',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 4,
                backgroundColor: 'primary.main',
                borderRadius: 2
              }
            }}
          >
            Últimas Noticias
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: 'url(/news1.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: 'primary.dark',
                        fontSize: '1.1rem',
                        mb: 2
                      }}
                    >
                      Título de la Noticia
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mb: 2,
                        lineHeight: 1.6
                      }}
                    >
                      Descripción breve de la noticia que proporciona una vista previa del contenido completo...
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        mt: 2,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: 'rgba(46, 125, 50, 0.08)'
                        }
                      }}
                    >
                      Leer más
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
