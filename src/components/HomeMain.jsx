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
    '/slide1.jpg', // Imágenes de tu institución
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
    <Box sx={{ position: 'relative' }}>
      {/* Hero Slider */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        style={{ height: '80vh' }}
      >
        {sliderImages.map((img, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                height: '80vh',
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
                    color: 'white'
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
                      Institución Educativa
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4 }}>
                      Formando líderes para el futuro
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: '#e53935',
                        '&:hover': {
                          backgroundColor: '#c62828'
                        }
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
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {card.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Últimas Noticias
          </Typography>
          <Grid container spacing={4}>
            {/* Ejemplo de noticia */}
            <Grid item xs={12} md={4}>
              <Card>
                <Box
                  sx={{
                    height: 200,
                    backgroundImage: 'url(/news1.jpg)',
                    backgroundSize: 'cover'
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Título de la Noticia
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Descripción breve de la noticia...
                  </Typography>
                  <Button
                    sx={{ mt: 2 }}
                    variant="outlined"
                    color="primary"
                  >
                    Leer más
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* Repite para más noticias */}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}