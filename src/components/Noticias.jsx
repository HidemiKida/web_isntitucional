import { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import { db } from "../config/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const q = query(
          collection(db, "noticias"),
          orderBy("fecha", "desc"),
          limit(9)
        );
        const querySnapshot = await getDocs(q);
        setNoticias(querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      } catch (error) {
        console.error("Error fetching noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  return (
    <Box
      sx={{
        pt: { xs: 10, md: 12 },
        pb: 8,
        backgroundColor: 'background.default'
      }}
    >
      <Container>
        <Typography
          component={motion.h1}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            color: 'primary.dark',
            mb: 6,
            fontWeight: 700,
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
          Noticias y Eventos
        </Typography>

        <Grid container spacing={4}>
          {loading
            ? Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton height={32} width="80%" />
                      <Skeleton height={20} width="60%" />
                      <Skeleton height={20} width="40%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : noticias.map((noticia) => (
                <Grid item xs={12} md={4} key={noticia.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)'
                        }
                      }}
                    >
                      {noticia.imagen && (
                        <CardMedia
                          component="img"
                          height="200"
                          image={noticia.imagen}
                          alt={noticia.titulo}
                          sx={{ objectFit: 'cover' }}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h6"
                          component="h2"
                          gutterBottom
                          sx={{ color: 'primary.dark', fontWeight: 600 }}
                        >
                          {noticia.titulo}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                          sx={{ mb: 2 }}
                        >
                          {noticia.descripcion}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: 'primary.main' }}
                        >
                          {new Date(noticia.fecha).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
}