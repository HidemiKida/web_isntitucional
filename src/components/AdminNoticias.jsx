import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import {
  Box, Container, Typography, Card, CardContent, TextField, Button, 
  Grid, IconButton, Dialog, DialogTitle, DialogActions, DialogContent, 
  Alert, Input, CircularProgress
} from '@mui/material';
import { Delete, Add, Upload } from '@mui/icons-material';
import { convertToBase64, validateImage } from '../utils/imageUtils';

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const q = await getDocs(collection(db, "noticias"));
        setNoticias(q.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        setError("No se pudieron cargar las noticias.");
      }
    };
    fetchNoticias();
  }, []);

  const handleImageSelect = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      validateImage(file);
      setUploadingImage(true);
      setError('');

      const base64 = await convertToBase64(file);
      setPreviewImage(base64);
      setImagen(base64);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const addNoticia = async () => {
    if (!titulo || !descripcion) {
      setError("Completa el título y la descripción.");
      return;
    }
    try {
      const nueva = { 
        titulo, 
        descripcion, 
        imagen: imagen || '', 
        fecha: new Date().toISOString() 
      };
      const docRef = await addDoc(collection(db, "noticias"), nueva);
      setNoticias([...noticias, { ...nueva, id: docRef.id }]);
      setTitulo('');
      setDescripcion('');
      setImagen('');
      setPreviewImage(null);
      setError('');
    } catch (e) {
      setError("Error al agregar noticia.");
    }
  };

  const confirmDelete = noticia => {
    setSelected(noticia);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "noticias", selected.id));
      setNoticias(noticias.filter(n => n.id !== selected.id));
      setDialogOpen(false);
      setError('');
    } catch {
      setError("Error al eliminar la noticia.");
    }
  };

  return (
    <Box sx={{ pt: { xs: 10, md: 12 }, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container>
        <Typography variant="h4" color="primary.dark" fontWeight={700} mb={4}>
          Administrar Noticias
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={2} alignItems="start">
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Nueva Noticia
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

              <TextField
                label="Título"
                fullWidth
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
                margin="dense"
              />
              <TextField
                label="Descripción"
                fullWidth
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                margin="dense"
                multiline
                rows={3}
              />

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
                id="noticia-image-input"
              />
              <label htmlFor="noticia-image-input">
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
                color="primary"
                startIcon={<Add />}
                sx={{ mt: 2 }}
                onClick={addNoticia}
                disabled={!titulo || !descripcion || uploadingImage}
                fullWidth
              >
                Agregar Noticia
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {noticias.map(noticia => (
                <Grid item xs={12} md={6} key={noticia.id}>
                  <Card sx={{ position: 'relative', p: 1.5, minHeight: 180 }}>
                    <IconButton
                      onClick={() => confirmDelete(noticia)}
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
                    {noticia.imagen && (
                      <img 
                        src={noticia.imagen} 
                        alt={noticia.titulo}
                        style={{ 
                          width: '100%', 
                          height: 200, 
                          objectFit: 'cover', 
                          borderRadius: 8,
                          marginBottom: 8 
                        }} 
                      />
                    )}
                    <CardContent sx={{ p: 1 }}>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {noticia.titulo}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {noticia.descripcion}
                      </Typography>
                    </CardContent>
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
          <DialogTitle>¿Eliminar noticia?</DialogTitle>
          <DialogContent>
            ¿Estás seguro de que quieres eliminar la noticia "<b>{selected?.titulo}</b>"?
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