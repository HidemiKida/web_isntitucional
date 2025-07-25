import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  Dialog,
  IconButton,
  Skeleton,
  Chip,
  Alert,
} from '@mui/material';
import { FaImages, FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../config/firebase';
import { collection, getDocs, doc, limit, query } from 'firebase/firestore';

export default function GaleriaPreview() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchGalleryPreview = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Obtener álbumes
        const albumsSnapshot = await getDocs(collection(db, 'galeria'));
        const albumsData = albumsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Obtener fotos de todos los álbumes (limitado)
        const allPhotos = [];
        const maxAlbums = Math.min(3, albumsData.length); // Máximo 3 álbumes
        
        for (let i = 0; i < maxAlbums; i++) {
          const album = albumsData[i];
          try {
            const albumRef = doc(db, 'galeria', album.id);
            const fotosCol = collection(albumRef, 'fotos');
            const fotosQuery = query(fotosCol, limit(4)); // 4 fotos por álbum
            const fotosSnapshot = await getDocs(fotosQuery);
            
            fotosSnapshot.docs.forEach(fotoDoc => {
              allPhotos.push({
                id: fotoDoc.id,
                albumName: album.nombre,
                albumId: album.id,
                ...fotoDoc.data()
              });
            });
          } catch (albumError) {
            console.error(`Error fetching photos from album ${album.id}:`, albumError);
          }
        }
        
        setPhotos(allPhotos.slice(0, 8)); // Máximo 8 fotos para la preview
      } catch (error) {
        console.error('Error fetching gallery preview:', error);
        setError('Error al cargar la galería');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryPreview();
  }, []);

  const handleImageClick = (photo, index) => {
    setSelectedImage(photo);
    setCurrentImageIndex(index);
    setOpenLightbox(true);
  };

  const handleNext = () => {
    const nextIndex = (currentImageIndex + 1) % photos.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(photos[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = currentImageIndex === 0 ? photos.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(photos[prevIndex]);
  };

  // Mostrar estado de carga
  if (loading) {
    return (
      <Box sx={{ py: 8, backgroundColor: '#F8FFFE' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                color: 'primary.dark',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <FaImages size={40} />
              Galería de Momentos
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              Revive los mejores momentos de nuestra comunidad educativa
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton 
                  variant="rectangular" 
                  height={200} 
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  // Mostrar error si existe
  if (error) {
    return (
      <Box sx={{ py: 8, backgroundColor: '#F8FFFE' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" gutterBottom sx={{ color: 'primary.dark', fontWeight: 700 }}>
              <FaImages size={40} style={{ marginRight: 16 }} />
              Galería de Momentos
            </Typography>
          </Box>
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={Link}
              to="/galeria"
              variant="outlined"
              size="large"
              endIcon={<FaEye />}
            >
              Ver galería completa
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  // Mostrar mensaje si no hay fotos
  if (photos.length === 0) {
    return (
      <Box sx={{ py: 8, backgroundColor: '#F8FFFE' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                color: 'primary.dark',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <FaImages size={40} />
              Galería de Momentos
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <FaImages size={80} color="#ccc" />
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              No hay fotos disponibles en este momento
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Las fotos aparecerán aquí cuando sean añadidas a la galería
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, backgroundColor: '#F8FFFE' }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            component={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                backgroundColor: 'primary.main',
                borderRadius: 2
              }
            }}
          >
            <FaImages size={40} />
            Galería de Momentos
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Revive los mejores momentos de nuestra comunidad educativa
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {photos.map((photo, index) => (
            <Grid item xs={12} sm={6} md={3} key={`${photo.albumId}-${photo.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card
                  onClick={() => handleImageClick(photo, index)}
                  sx={{
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  {photo.imagen ? (
                    <CardMedia
                      component="img"
                      height="200"
                      image={photo.imagen}
                      alt={`Foto de ${photo.albumName}`}
                      sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.1)' }
                      }}
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
                      <FaImages size={50} />
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      p: 2,
                      color: 'white'
                    }}
                  >
                    <Chip
                      label={photo.albumName}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: 500
                      }}
                    />
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={Link}
            to="/galeria"
            variant="outlined"
            size="large"
            endIcon={<FaEye />}
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)'
              }
            }}
          >
            Ver galería completa
          </Button>
        </Box>
      </Container>

      {/* Lightbox */}
      <Dialog
        open={openLightbox}
        onClose={() => setOpenLightbox(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderRadius: 2,
            maxHeight: '90vh'
          }
        }}
      >
        <Box sx={{ position: 'relative', p: 2 }}>
          <IconButton
            onClick={() => setOpenLightbox(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              zIndex: 1,
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
            }}
          >
            <FaTimes />
          </IconButton>

          {selectedImage && (
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={selectedImage.imagen}
                alt={`Foto de ${selectedImage.albumName}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
              
              <Box sx={{ mt: 2, color: 'white' }}>
                <Typography variant="h6" gutterBottom>
                  {selectedImage.albumName}
                </Typography>
                <Typography variant="body2" color="grey.300">
                  {currentImageIndex + 1} de {photos.length}
                </Typography>
              </Box>

              {photos.length > 1 && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <IconButton
                    onClick={handlePrevious}
                    sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <FaChevronLeft />
                  </IconButton>
                  <IconButton
                    onClick={handleNext}
                    sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <FaChevronRight />
                  </IconButton>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}