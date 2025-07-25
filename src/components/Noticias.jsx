import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Skeleton,
  Pagination,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Breadcrumbs,
  Link as MuiLink,
  Dialog,
  DialogContent,
  DialogTitle,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  FaSearch,
  FaCalendarAlt,
  FaNewspaper,
  FaHome,
  FaEye,
  FaFilter,
  FaTimes,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [filteredNoticias, setFilteredNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNoticia, setSelectedNoticia] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const noticiasPerPage = 6;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const q = query(
          collection(db, 'noticias'),
          orderBy('fecha', sortOrder)
        );
        const querySnapshot = await getDocs(q);
        const noticiasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNoticias(noticiasData);
        setFilteredNoticias(noticiasData);
      } catch (error) {
        console.error('Error fetching noticias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, [sortOrder]);

  useEffect(() => {
    const filtered = noticias.filter(noticia =>
      noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      noticia.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNoticias(filtered);
    setCurrentPage(1);
  }, [searchTerm, noticias]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleNoticiaClick = (noticia) => {
    setSelectedNoticia(noticia);
    setOpenDialog(true);
  };

  const indexOfLastNoticia = currentPage * noticiasPerPage;
  const indexOfFirstNoticia = indexOfLastNoticia - noticiasPerPage;
  const currentNoticias = filteredNoticias.slice(indexOfFirstNoticia, indexOfLastNoticia);
  const totalPages = Math.ceil(filteredNoticias.length / noticiasPerPage);

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
              <FaNewspaper size={15} style={{ marginRight: 8 }} />
              Noticias
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
            <FaNewspaper size={40} />
            Noticias y Eventos
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Todas las noticias y eventos de nuestra institución educativa
          </Typography>
        </Box>

        {/* Controles de búsqueda y filtros */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Buscar noticias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch color={theme.palette.primary.main} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Ordenar por</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  label="Ordenar por"
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="desc">Más recientes</MenuItem>
                  <MenuItem value="asc">Más antiguos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip
                  icon={<FaFilter />}
                  label={`${filteredNoticias.length} noticias`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Grid de noticias */}
        <AnimatePresence>
          <Grid container spacing={4}>
            {loading
              ? Array.from(new Array(6)).map((_, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card sx={{ height: '100%' }}>
                      <Skeleton variant="rectangular" height={250} />
                      <CardContent>
                        <Skeleton height={32} width="80%" />
                        <Skeleton height={20} width="60%" sx={{ mt: 1 }} />
                        <Skeleton height={20} width="40%" sx={{ mt: 2 }} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : currentNoticias.map((noticia, index) => (
                  <Grid item xs={12} md={6} lg={4} key={noticia.id}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                    >
                      <Card
                        onClick={() => handleNoticiaClick(noticia)}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: 3,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          border: '1px solid rgba(46, 125, 50, 0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 8px 40px rgba(46, 125, 50, 0.2)',
                            transform: 'translateY(-5px)',
                          }
                        }}
                      >
                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                          {noticia.imagen ? (
                            <CardMedia
                              component="img"
                              height="200"
                              image={noticia.imagen}
                              alt={noticia.titulo}
                              sx={{
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.05)' }
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
                              <FaNewspaper size={50} />
                            </Box>
                          )}
                          <Chip
                            icon={<FaCalendarAlt size={12} />}
                            label={formatDate(noticia.fecha)}
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              color: 'primary.main',
                              fontWeight: 600,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                            }}
                          />
                        </Box>

                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Typography
                            variant="h6"
                            component="h2"
                            gutterBottom
                            sx={{
                              fontWeight: 700,
                              color: 'primary.dark',
                              lineHeight: 1.3,
                              mb: 2,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {noticia.titulo}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              lineHeight: 1.6,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {noticia.descripcion}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
          </Grid>
        </AnimatePresence>

        {/* Paginación */}
        {!loading && totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2,
                  fontWeight: 600,
                }
              }}
            />
          </Box>
        )}

        {/* Estado vacío */}
        {!loading && filteredNoticias.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <FaNewspaper size={80} color={theme.palette.text.disabled} />
            <Typography variant="h5" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
              No se encontraron noticias
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Intenta con otros términos de búsqueda
            </Typography>
          </Box>
        )}
      </Container>

      {/* Modal de noticia completa */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        {selectedNoticia && (
          <>
            <DialogTitle sx={{ p: 0, position: 'relative' }}>
              {selectedNoticia.imagen && (
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={selectedNoticia.imagen}
                    alt={selectedNoticia.titulo}
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      p: 3,
                      color: 'white'
                    }}
                  >
                    <Chip
                      icon={<FaCalendarAlt size={12} />}
                      label={formatDate(selectedNoticia.fecha)}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        mb: 2
                      }}
                    />
                    <Typography variant="h4" fontWeight={700}>
                      {selectedNoticia.titulo}
                    </Typography>
                  </Box>
                </Box>
              )}
              <IconButton
                onClick={() => setOpenDialog(false)}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
                }}
              >
                <FaTimes />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 4 }}>
              {!selectedNoticia.imagen && (
                <Box sx={{ mb: 3 }}>
                  <Chip
                    icon={<FaCalendarAlt size={12} />}
                    label={formatDate(selectedNoticia.fecha)}
                    color="primary"
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h4" fontWeight={700} color="primary.dark" gutterBottom>
                    {selectedNoticia.titulo}
                  </Typography>
                </Box>
              )}
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                {selectedNoticia.descripcion}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}