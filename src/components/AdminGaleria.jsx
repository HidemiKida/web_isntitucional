import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import {
  Box, Container, Typography, Card, CardContent, TextField, Button, Grid, IconButton, Dialog, DialogTitle, DialogActions, DialogContent, Alert, Tabs, Tab
} from '@mui/material';
import { Delete, AddPhotoAlternate } from '@mui/icons-material';

export default function AdminGaleria() {
  const [albums, setAlbums] = useState([]);
  const [activeAlbum, setActiveAlbum] = useState('');
  const [photos, setPhotos] = useState([]);
  const [nombreAlbum, setNombreAlbum] = useState('');
  const [urlFoto, setUrlFoto] = useState('');
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Cargar álbumes
  useEffect(() => {
    const fetchAlbums = async () => {
      const q = await getDocs(collection(db, "galeria"));
      setAlbums(q.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchAlbums();
  }, []);

  // Cargar fotos del álbum seleccionado
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
      setError("No se pudo crear álbum.");
    }
  };

  const addPhoto = async () => {
    if (!urlFoto || !activeAlbum) {
      setError("Elige un álbum y coloca la URL de la foto.");
      return;
    }
    try {
      await addDoc(collection(doc(db, "galeria", activeAlbum), "fotos"), { imagen: urlFoto });
      setPhotos([...photos, { imagen: urlFoto }]);
      setUrlFoto('');
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
              >
                Crear Álbum
              </Button>
            </Card>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Agregar Foto a Álbum
              </Typography>
              <TextField
                label="URL de la imagen"
                fullWidth
                value={urlFoto}
                onChange={e => setUrlFoto(e.target.value)}
                margin="dense"
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                startIcon={<AddPhotoAlternate />}
                onClick={addPhoto}
              >
                Agregar Foto
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
                        position: 'absolute', top: 8, right: 8,
                        bgcolor: '#F4EDE7', color: '#C62828', zIndex: 1
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <img
                      src={photo.imagen}
                      alt="Foto"
                      style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
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