import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Breadcrumbs,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FaHome, FaEye, FaLightbulb, FaHandshake, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function MisionVision() {
  const [loaded, setLoaded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLoaded(true);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box sx={{ pt: { xs: 10, md: 12 }, pb: 8, backgroundColor: 'background.default' }}>
      <Container>
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
                '&:hover': { color: 'primary.main' }
              }}
            >
              <FaHome size={15} style={{ marginRight: 8 }} />
              Inicio
            </MuiLink>
            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
              <FaEye size={15} style={{ marginRight: 8 }} />
              Filosofía Institucional
            </Typography>
          </Breadcrumbs>
        </Box>

        <Box component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            component="h1" 
            gutterBottom
            color="primary"
            fontWeight="bold"
            sx={{ 
              mb: 3,
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 4,
                backgroundColor: 'primary.main',
                borderRadius: 2
              }
            }}
          >
            Filosofía Institucional
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" paragraph sx={{ mb: 5, textAlign: 'center' }}>
            En la Unidad Educativa Fiscal "Olga Patricia Acebo Alvarez", trabajamos con dedicación para formar ciudadanos íntegros, 
            conscientes y preparados para enfrentar los desafíos del siglo XXI con excelencia, compromiso y valores sólidos.
          </Typography>

          <Grid container spacing={4}>
            {/* Misión */}
            <Grid item xs={12} md={6}>
              <Card 
                component={motion.div}
                variants={cardVariants}
                initial="hidden"
                animate={loaded ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.2 }}
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(46, 125, 50, 0.2)',
                  },
                }}
              >
                <Box sx={{ 
                  background: 'linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)',
                  py: 2,
                  px: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'white',
                }}>
                  <FaEye size={24} />
                  <Typography variant="h5" fontWeight={600}>
                    Misión
                  </Typography>
                </Box>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="body1" paragraph>
                    La Unidad Educativa Siglo XXI Olga Patricia Acebo Álvarez, tiene como misión desarrollar 
                    niños/niñas y jovenes con una personalidad autónoma, sostenible e independiente, con identidad
                    nacional, conocimientos sólidos, criticos e innovadores, seres humanos capaces de ejercer sus
                    derechos y cumplir sus obligaciones, en el marco de una cultura de paz de no violencia entrelas
                    personas y una convivencia armónica pluricultural y democrática, que contribuya al desarrollo
                    individual, pero con interés superior al beneficio común.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Visión */}
            <Grid item xs={12} md={6}>
              <Card 
                component={motion.div}
                variants={cardVariants}
                initial="hidden"
                animate={loaded ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.4 }}
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(46, 125, 50, 0.2)',
                  },
                }}
              >
                <Box sx={{ 
                  background: 'linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)',
                  py: 2,
                  px: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'white',
                }}>
                  <FaLightbulb size={24} />
                  <Typography variant="h5" fontWeight={600}>
                    Visión
                  </Typography>
                </Box>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="body1" paragraph>
                    Somos una institución forjada de seres humanos justos, creativos, respetuosos y solidarios;
                    buscadores del conocimiento autónomo, líderes por excelencia, creadores de nuevas y mejores
                    oportunidades, de alto nivel académico, con procesos dinámicos y modernos desarrollados en
                    un ambiente agradable, sano y limpio que guarda equilibrio con la naturaleza circundante.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Valores */}
            <Grid item xs={12}>
              <Card 
                component={motion.div}
                variants={cardVariants}
                initial="hidden"
                animate={loaded ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.6 }}
                sx={{ 
                  mt: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(46, 125, 50, 0.2)',
                  },
                }}
              >
                <Box sx={{ 
                  background: 'linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)',
                  py: 2,
                  px: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'white',
                }}>
                  <FaHandshake size={24} />
                  <Typography variant="h5" fontWeight={600}>
                    Valores Institucionales
                  </Typography>
                </Box>
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="h6" color="primary" fontWeight={600} gutterBottom>
                          Responsabilidad
                        </Typography>
                        <Typography variant="body2">
                          Asumimos las consecuencias de nuestras acciones y decisiones, cumpliendo con 
                          nuestros compromisos y obligaciones.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="h6" color="primary" fontWeight={600} gutterBottom>
                          Respeto
                        </Typography>
                        <Typography variant="body2">
                          Valoramos la dignidad de cada persona, reconociendo y apreciando sus diferencias 
                          y cualidades únicas.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="h6" color="primary" fontWeight={600} gutterBottom>
                          Excelencia
                        </Typography>
                        <Typography variant="body2">
                          Buscamos la calidad superior en todo lo que hacemos, esforzándonos siempre 
                          por superar nuestras metas.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="h6" color="primary" fontWeight={600} gutterBottom>
                          Solidaridad
                        </Typography>
                        <Typography variant="body2">
                          Apoyamos a quienes nos rodean, actuando con empatía y colaborando para el 
                          bienestar de toda la comunidad.
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}