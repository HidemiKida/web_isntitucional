import { Box, Container, Typography, Grid, Button, Alert } from '@mui/material';
import { FaNewspaper, FaEye, FaRedo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAsyncData } from '../hooks/useAsyncData';
import { SectionSkeleton, EmptyState } from './UI/LoadingState';
import Section from './Layout/Section';
import NoticiaCard from './Cards/NoticiaCard';

const fetchNoticias = async () => {
  const q = query(
    collection(db, 'noticias'),
    orderBy('fecha', 'desc'),
    limit(3)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export default function NoticiasPreview() {
  const { data: noticias, loading, error, retry } = useAsyncData(fetchNoticias);

  // Estado de carga
  if (loading) {
    return (
      <Section py={6}>
        <Container maxWidth="xl">
          <SectionSkeleton 
            title="Cargando noticias..." 
            cards={3} 
            cardHeight={250}
          />
        </Container>
      </Section>
    );
  }

  // Estado de error
  if (error) {
    return (
      <Section py={6}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              <FaNewspaper size={32} style={{ marginRight: 16 }} />
              Últimas Noticias
            </Typography>
          </Box>
          
          <Alert 
            severity="error" 
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={retry}
                startIcon={<FaRedo />}
              >
                Reintentar
              </Button>
            }
            sx={{ mb: 4 }}
          >
            {error}
          </Alert>
          
          <Box sx={{ textAlign: 'center' }}>
            <Button 
              component={Link} 
              to="/noticias" 
              variant="outlined" 
              endIcon={<FaEye />}
            >
              Ir a noticias
            </Button>
          </Box>
        </Container>
      </Section>
    );
  }

  // Estado vacío
  if (!noticias || noticias.length === 0) {
    return (
      <Section py={6}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              <FaNewspaper size={32} style={{ marginRight: 16 }} />
              Últimas Noticias
            </Typography>
          </Box>
          
          <EmptyState
            icon={<FaNewspaper />}
            title="No hay noticias disponibles"
            subtitle="Las noticias aparecerán aquí cuando sean publicadas"
            action={
              <Button 
                component={Link} 
                to="/noticias" 
                variant="outlined"
                endIcon={<FaEye />}
              >
                Ver todas las noticias
              </Button>
            }
          />
        </Container>
      </Section>
    );
  }

  // Estado con datos
  return (
    <Section py={6}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <FaNewspaper size={32} />
              Últimas Noticias
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
              Mantente informado sobre los acontecimientos más recientes de nuestra institución
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {noticias.map((noticia, index) => (
              <Grid item xs={12} md={4} key={noticia.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <NoticiaCard noticia={noticia} />
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={Link}
              to="/noticias"
              variant="contained"
              size="large"
              endIcon={<FaEye />}
              sx={{ px: 4 }}
            >
              Ver todas las noticias
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Section>
  );
}