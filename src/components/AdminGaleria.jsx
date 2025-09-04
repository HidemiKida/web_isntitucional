import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import {
  Box, Container, Typography, Card, CardContent, TextField, Button, Grid, 
  IconButton, Dialog, DialogTitle, DialogActions, DialogContent, Alert, 
  Tabs, Tab, Input, CircularProgress
} from '@mui/material';
import { Delete, AddPhotoAlternate, Upload } from '@mui/icons-material';
import { convertToBase64, validateImage } from '../utils/imageUtils';

export default function AdminGaleria() {
  const [albums, setAlbums] = useState([]);
  const [activeAlbum, setActiveAlbum] = useState('');
  const [photos, setPhotos] = useState([]);
  const [nombreAlbum, setNombreAlbum] = useState('');
  const [urlFoto, setUrlFoto] = useState('');
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const q = await getDocs(collection(db, "galeria"));
        setAlbums(q.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        setError("Error al cargar los álbumes");
      }
    };
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (!activeAlbum) return setPhotos([]);
    const fetchPhotos = async () => {
      try {
        const albumRef = doc(db, "galeria", activeAlbum);
        const fotosCol = collection(albumRef, "fotos");
        const q = await getDocs(fotosCol);
        setPhotos(q.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        setError("Error al cargar las fotos");
      }
    };
    fetchPhotos();
  }, [activeAlbum]);

  const handleImageSelect = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      validateImage(file);
      setUploadingImage(true);
      setError('');

      const base64 = await convertToBase64(file);
      setPreviewImage(base64);
      setUrlFoto(base64);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const addAlbum = async () => {
    if (!nombreAlbum) {
      setError("El nombre del álbum es obligatorio.");
      return;
    }
    try {
      const albumRef = await addDoc(collection(db, "galeria"), { nombre: nombreAlbum });
      setAlbums([...albums, { id: albumRef.id, nombre: nombreAlbum }]);
      setNombreAlbum('');
      setError('');
    } catch {
      setError("No se pudo crear el álbum.");
    }
  };

  const addPhoto = async () => {
    if (!urlFoto || !activeAlbum) {
      setError("Selecciona un álbum y una imagen.");
      return;
    }
    try {
      const newPhoto = { imagen: urlFoto };
      const docRef = await addDoc(collection(doc(db, "galeria", activeAlbum), "fotos"), newPhoto);
      setPhotos([...photos, { ...newPhoto, id: docRef.id }]);
      setUrlFoto('');
      setPreviewImage(null);
      setError('');
    } catch {
      setError("No se pudo agregar la foto.");
    }
  };

  const confirmDelete = photo => {
    setSelected(photo);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(doc(db, "galeria", activeAlbum), "fotos", selected.id));
      setPhotos(photos.filter(f => f.id !== selected.id));
      setDialogOpen(false);
      setError('');
    } catch {
      setError("No se pudo eliminar la foto.");
    }
  };

  return (
    <Box sx={{ pt: { xs: 10, md: 12 }, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container>
        <Typography variant="h4" color="primary.dark" fontWeight={700} mb={4}>
          Administrar Galería
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Crear Álbum
              </Typography>
              <TextField
                label="Nombre del álbum"
                fullWidth
                value={nombreAlbum}
                onChange={e => setNombreAlbum(e.target.value)}
                margin="dense"
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={addAlbum}
                fullWidth
              >
                Crear Álbum
              </Button>
            </Card>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Agregar Foto a Álbum
              </Typography>

              {previewImage && (
                <Box sx={{ mt: 2, mb: 2 }}>
                  <img 
                    src={previewImage} 
                    alt="Vista previa" 
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }} 
                  />
                </Box>
              )}

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
                id="galeria-image-input"
              />
              <label htmlFor="galeria-image-input">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<Upload />}
                  sx={{ mt: 2, mb: 2 }}
                  fullWidth
                  disabled={uploadingImage}
                >
                  {uploadingImage ? (
                    <CircularProgress size={24} />
                  ) : (
                    'Seleccionar Imagen'
                  )}
                </Button>
              </label>

              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                startIcon={<AddPhotoAlternate />}
                onClick={addPhoto}
                disabled={!urlFoto || !activeAlbum || uploadingImage}
                fullWidth
              >
                Agregar Foto al Álbum
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Tabs
              value={activeAlbum || false}
              onChange={(_, v) => setActiveAlbum(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 2 }}
            >
              {albums.map(album => (
                <Tab
                  key={album.id}
                  label={album.nombre}
                  value={album.id}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    color: 'text.primary',
                    '&.Mui-selected': { color: 'primary.main' }
                  }}
                />
              ))}
            </Tabs>
            <Grid container spacing={2}>
              {photos.map(photo => (
                <Grid item xs={6} md={4} key={photo.id}>
                  <Card sx={{ position: 'relative', p: 1 }}>
                    <IconButton
                      onClick={() => confirmDelete(photo)}
                      sx={{
                        position: 'absolute', 
                        top: 8, 
                        right: 8,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        color: '#C62828', 
                        zIndex: 1,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 1)',
                        }
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <img
                      src={photo.imagen}
                      alt="Foto"
                      style={{ 
                        width: '100%', 
                        height: 200, 
                        objectFit: 'cover', 
                        borderRadius: 8 
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Dialog 
          open={dialogOpen} 
          onClose={() => setDialogOpen(false)}
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle>¿Eliminar foto?</DialogTitle>
          <DialogContent>
            ¿Estás seguro de que quieres eliminar esta foto?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleDelete} color="error">Eliminar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}