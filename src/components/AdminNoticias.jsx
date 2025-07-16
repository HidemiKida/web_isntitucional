import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import {
  Box, Container, Typography, Card, CardContent, TextField, Button, Grid, IconButton, Dialog, DialogTitle, DialogActions, DialogContent, Alert
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState(null);

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

  const addNoticia = async () => {
    if (!titulo || !descripcion) {
      setError("Completa todos los campos.");
      return;
    }
    try {
      const nueva = { titulo, descripcion, imagen, fecha: new Date().toISOString() };
      await addDoc(collection(db, "noticias"), nueva);
      setNoticias([...noticias, nueva]);
      setTitulo(''); setDescripcion(''); setImagen('');
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
      setError("Error al eliminar noticia.");
    }
  };

  return (
    <Box sx={{ pt: { xs: 10, md: 12 }, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container>
        <Typography variant="h4" color="primary.dark" fontWeight={700} mb={4}>
          Administrar Noticias
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Nueva Noticia
              </Typography>
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
              <TextField
                label="URL de Imagen"
                fullWidth
                value={imagen}
                onChange={e => setImagen(e.target.value)}
                margin="dense"
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                sx={{ mt: 2 }}
                onClick={addNoticia}
              >
                Agregar
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
                        position: 'absolute', top: 8, right: 8,
                        bgcolor: '#F4EDE7', color: '#C62828', zIndex: 1
                      }}
                    >
                      <Delete />
                    </IconButton>
                    {noticia.imagen &&
                      <img src={noticia.imagen} alt="" style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                    }
                    <CardContent sx={{ p: 1 }}>
                      <Typography variant="subtitle1" fontWeight={700}>{noticia.titulo}</Typography>
                      <Typography variant="body2" color="text.secondary">{noticia.descripcion}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
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