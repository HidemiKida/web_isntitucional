import { useState, useEffect } from 'react';
import { 
  Container, Box, Typography, ImageList, ImageListItem, 
  Dialog, IconButton, Tabs, Tab, useMediaQuery, useTheme 
} from '@mui/material';
import { Close, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from "../config/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default function Galeria() {
  const [albums, setAlbums] = useState([]);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchAlbums = async () => {
      const q = await getDocs(collection(db, "galeria"));
      setAlbums(q.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (!activeAlbum) return setPhotos([]);
    const fetchPhotos = async () => {
      const albumRef = doc(db, "galeria", activeAlbum);
      const fotosCol = collection(albumRef, "fotos");
      const q = await getDocs(fotosCol);
      setPhotos(q.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPhotos();
  }, [activeAlbum]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const handleNext = () => {
    const currentIndex = photos.findIndex(photo => photo.id === selectedImage.id);
    if (currentIndex < photos.length - 1) {
      setSelectedImage(photos[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = photos.findIndex(photo => photo.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(photos[currentIndex - 1]);
    }
  };

  return (
    <Box sx={{ pt: { xs: 10, md: 12 }, pb: 8, backgroundColor: 'background.default' }}>
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
          Galería de Fotos
        </Typography>

        <Tabs
          value={activeAlbum || false}
          onChange={(_, newValue) => setActiveAlbum(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 4 }}
        >
          {albums.map((album) => (
            <Tab
              key={album.id}
              label={album.nombre}
              value={album.id}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                color: 'text.primary',
                '&.Mui-selected': {
                  color: 'primary.main',
                }
              }}
            />
          ))}
        </Tabs>

        <ImageList
          variant="masonry"
          cols={isMobile ? 1 : 3}
          gap={16}
        >
          {photos.map((photo) => (
            <ImageListItem
              key={photo.id}
              component={motion.div}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                overflow: 'hidden',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover img': {
                  transform: 'scale(1.05)'
                }
              }}
              onClick={() => handleImageClick(photo)}
            >
              <img
                src={photo.imagen}
                alt={photo.titulo || 'Imagen de galería'}
                loading="lazy"
                style={{
                  borderRadius: 8,
                  transition: 'transform 0.3s ease-in-out'
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="lg"
          fullWidth
        >
          <Box sx={{ position: 'relative', bgcolor: 'background.paper' }}>
            <IconButton
              onClick={() => setOpenDialog(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.7)'
                }
              }}
            >
              <Close />
            </IconButton>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
              <IconButton
                onClick={handlePrevious}
                disabled={!selectedImage || photos.indexOf(selectedImage) === 0}
                sx={{ color: 'primary.main' }}
              >
                <NavigateBefore />
              </IconButton>
              
              {selectedImage && (
                <img
                  src={selectedImage.imagen}
                  alt={selectedImage.titulo || 'Imagen ampliada'}
                  style={{
                    maxHeight: '80vh',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              )}
              
              <IconButton
                onClick={handleNext}
                disabled={!selectedImage || photos.indexOf(selectedImage) === photos.length - 1}
                sx={{ color: 'primary.main' }}
              >
                <NavigateNext />
              </IconButton>
            </Box>
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
}