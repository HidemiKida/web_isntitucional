import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Dialog,
  IconButton,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Skeleton,
  Chip,
  Breadcrumbs,
  Link as MuiLink,
  Button,
  Fade,
  Zoom,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Close,
  NavigateBefore,
  NavigateNext,
  ZoomIn,
  Download,
  Share,
  Home,
  PhotoLibrary,
} from '@mui/icons-material';
import { FaImages, FaHome, FaDownload, FaShare, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../config/firebase';
import { collection, getDocs, doc } from 'firebase/firestore';

export default function Galeria() {
  const [albums, setAlbums] = useState([]);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [error, setError] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const q = await getDocs(collection(db, 'galeria'));
        const albumsData = q.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAlbums(albumsData);
        
        // Seleccionar el primer álbum automáticamente si existe
        if (albumsData.length > 0 && !activeAlbum) {
          setActiveAlbum(albumsData[0].id);
        }
      } catch (error) {
        console.error('Error fetching albums:', error);
        setError('Error al cargar los álbumes');
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (!activeAlbum) {
      setPhotos([]);
      return;
    }
    
    const fetchPhotos = async () => {
      try {
        setPhotosLoading(true);
        const albumRef = doc(db, 'galeria', activeAlbum);
        const fotosCol = collection(albumRef, 'fotos');
        const q = await getDocs(fotosCol);
        const photosData = q.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setError('Error al cargar las fotos');
      } finally {
        setPhotosLoading(false);
      }
    };

    fetchPhotos();
  }, [activeAlbum]);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setOpenDialog(true);
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

  const getActiveAlbumName = () => {
    const album = albums.find(a => a.id === activeAlbum);
    return album ? album.nombre : '';
  };

  const handleKeyDown = (event) => {
    if (!openDialog) return;
    if (event.key === 'ArrowRight') handleNext();
    if (event.key === 'ArrowLeft') handlePrevious();
    if (event.key === 'Escape') setOpenDialog(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [openDialog, currentImageIndex]);

  if (loading) {
    return (
      <Box sx={{ pt: { xs: 10, md: 12 }, pb: 8, backgroundColor: 'background.default', minHeight: '100vh' }}>
        <Container>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Cargando galería...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ pt: { xs: 10, md: 12 }, pb: 8, backgroundColor: 'background.default', minHeight: '100vh' }}>
        <Container>
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: { xs: 10, md: 12 }, pb: 8, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container>
        {/* Breadcrumbs */}
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
              <FaImages size={15} style={{ marginRight: 8 }} />
              Galería
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                width: 100,
                height: 4,
                backgroundColor: 'primary.main',
                borderRadius: 2
              }
            }}
          >
            <PhotoLibrary fontSize="large" />
            Galería de Fotos
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Explora nuestros momentos más especiales organizados por álbumes
          </Typography>
        </Box>

        {/* Tabs de álbumes */}
        {albums.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Tabs
              value={activeAlbum || false}
              onChange={(_, newValue) => setActiveAlbum(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: 2,
                  mx: 0.5,
                  minHeight: 48,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  }
                },
                '& .MuiTabs-indicator': {
                  display: 'none'
                }
              }}
            >
              {albums.map((album) => (
                <Tab
                  key={album.id}
                  label={album.nombre}
                  value={album.id}
                />
              ))}
            </Tabs>
          </Box>
        )}

        {/* Información del álbum activo */}
        {activeAlbum && (
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Chip
              label={`${getActiveAlbumName()} - ${photos.length} fotos`}
              color="primary"
              variant="outlined"
              size="large"
              sx={{ fontWeight: 600, fontSize: '1rem', py: 2 }}
            />
          </Box>
        )}

        {/* Grid de fotos */}
        {photosLoading ? (
          <Grid container spacing={2}>
            {Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Skeleton
                  variant="rectangular"
                  height={250}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))}
          </Grid>
        ) : photos.length > 0 ? (
          <AnimatePresence>
            <Grid container spacing={2}>
              {photos.map((photo, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card
                      onClick={() => handleImageClick(photo, index)}
                      sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        '&:hover': {
                          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
                          transform: 'translateY(-5px)',
                          '& .image-overlay': {
                            opacity: 1,
                          }
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="250"
                        image={photo.imagen}
                        alt={`Foto ${index + 1}`}
                        sx={{
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                      <Box
                        className="image-overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          color: 'white'
                        }}
                      >
                        <Box sx={{ textAlign: 'center' }}>
                          <ZoomIn fontSize="large" />
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Ver imagen
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </AnimatePresence>
        ) : activeAlbum ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <PhotoLibrary sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No hay fotos en este álbum
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Las fotos aparecerán aquí cuando sean añadidas al álbum
            </Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <PhotoLibrary sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No hay álbumes disponibles
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Los álbumes aparecerán aquí cuando sean creados
            </Typography>
          </Box>
        )}
      </Container>

      {/* Lightbox Modal */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            borderRadius: 2,
            maxHeight: '95vh',
            maxWidth: '95vw'
          }
        }}
        TransitionComponent={Fade}
        transitionDuration={300}
      >
        {selectedImage && (
          <Box sx={{ position: 'relative', p: 2 }}>
            {/* Controles superiores */}
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                right: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 2
              }}
            >
              <Chip
                label={`${currentImageIndex + 1} de ${photos.length}`}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  onClick={() => setOpenDialog(false)}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
                  }}
                >
                  <Close />
                </IconButton>
              </Box>
            </Box>

            {/* Imagen principal */}
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <motion.img
                key={selectedImage.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedImage.imagen}
                alt={`Foto ${currentImageIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                }}
              />
            </Box>

            {/* Controles de navegación */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: 16,
                transform: 'translateY(-50%)',
                zIndex: 2
              }}
            >
              <IconButton
                onClick={handlePrevious}
                disabled={photos.length <= 1}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                  '&:disabled': { opacity: 0.3 }
                }}
              >
                <NavigateBefore fontSize="large" />
              </IconButton>
            </Box>

            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                right: 16,
                transform: 'translateY(-50%)',
                zIndex: 2
              }}
            >
              <IconButton
                onClick={handleNext}
                disabled={photos.length <= 1}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                  '&:disabled': { opacity: 0.3 }
                }}
              >
                <NavigateNext fontSize="large" />
              </IconButton>
            </Box>

            {/* Información inferior */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="h6" color="white" gutterBottom>
                {getActiveAlbumName()}
              </Typography>
              
              {/* Miniaturas */}
              {photos.length > 1 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    mt: 2,
                    flexWrap: 'wrap',
                    maxWidth: '80%',
                    mx: 'auto'
                  }}
                >
                  {photos.slice(Math.max(0, currentImageIndex - 3), currentImageIndex + 4).map((photo, index) => {
                    const actualIndex = Math.max(0, currentImageIndex - 3) + index;
                    return (
                      <Box
                        key={photo.id}
                        onClick={() => {
                          setCurrentImageIndex(actualIndex);
                          setSelectedImage(photos[actualIndex]);
                        }}
                        sx={{
                          width: 60,
                          height: 60,
                          cursor: 'pointer',
                          borderRadius: 1,
                          overflow: 'hidden',
                          border: actualIndex === currentImageIndex ? '2px solid white' : '2px solid transparent',
                          opacity: actualIndex === currentImageIndex ? 1 : 0.7,
                          transition: 'all 0.3s ease',
                          '&:hover': { opacity: 1 }
                        }}
                      >
                        <img
                          src={photo.imagen}
                          alt={`Miniatura ${actualIndex + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}