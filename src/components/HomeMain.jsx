import { Box, Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaBook, FaChalkboardTeacher } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MisionVisionCard from './MisionVisionCard';
import NoticiasPreview from './NoticiasPreview';
import GaleriaPreview from './GaleriaPreview';
import Section from './Layout/Section';

export default function HomeMain() {
  const sliderImages = [
    '/slide1.jpg',
    '/slide2.jpg',
    '/slide3.jpg'
  ];

  const featuredCards = [
    {
      icon: <FaGraduationCap size={32} />,
      title: 'Educación de Calidad',
      description: 'Formación integral para nuestros estudiantes'
    },
    {
      icon: <FaUsers size={32} />,
      title: 'Comunidad',
      description: 'Construyendo juntos el futuro'
    },
    {
      icon: <FaBook size={32} />,
      title: 'Programas Académicos',
      description: 'Excelencia en la enseñanza'
    },
    {
      icon: <FaChalkboardTeacher size={32} />,
      title: 'Docentes Calificados',
      description: 'Experiencia y dedicación'
    }
  ];

  return (
    <Box>
      {/* Hero Slider */}
      <Box sx={{ mt: { xs: '64px', md: '72px' } }}>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          style={{ height: '70vh' }}
        >
          {sliderImages.map((img, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: '70vh',
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
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
                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Typography 
                      variant="h1" 
                      sx={{ 
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        mb: 2,
                        maxWidth: '800px'
                      }}
                    >
                      Unidad Educativa Fiscal
                    </Typography>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        mb: 3,
                        maxWidth: '900px'
                      }}
                    >
                      "Olga Patricia Acebo Alvarez"
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'white',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        mb: 4,
                        maxWidth: '600px',
                        lineHeight: 1.6
                      }}
                    >
                      Formando líderes con excelencia académica y valores sólidos para enfrentar los desafíos del futuro.
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 20px rgba(255,255,255,0.3)'
                      }}
                    >
                      Conoce más sobre nosotros
                    </Button>
                  </motion.div>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Sección Filosofía Institucional */}
      <Section py={6}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Nuestra Filosofía Institucional
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
              Conoce nuestros valores, misión y visión que guían nuestro compromiso educativo
            </Typography>
          </Box>
          <MisionVisionCard />
        </Container>
      </Section>

      {/* Sección de Noticias */}
      <NoticiasPreview />

      {/* Sección de Galería */}
      <GaleriaPreview />

      {/* Sección ¿Por qué elegirnos? */}
      <Section backgroundColor="#F1F8E9" py={6}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              ¿Por qué elegirnos?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
              Descubre las características que nos hacen únicos y nos distinguen como institución educativa
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {featuredCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card sx={{ 
                    textAlign: 'center', 
                    p: 3, 
                    height: '100%',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFF8 100%)',
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ 
                        color: 'primary.main', 
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center'
                      }}>
                        {card.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {card.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>
    </Box>
  );
}