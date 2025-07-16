import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaNewspaper,
  FaImages,
  FaBars,
  FaChevronDown,
  FaSignOutAlt,
  FaCog,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminMenuAnchor, setAdminMenuAnchor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { text: 'Inicio', icon: <FaHome size={20} />, path: '/' },
    { text: 'Noticias', icon: <FaNewspaper size={20} />, path: '/noticias' },
    { text: 'Galería', icon: <FaImages size={20} />, path: '/galeria' },
  ];

  const adminItems = [
    { text: 'Admin Noticias', path: '/admin-noticias' },
    { text: 'Admin Galería', path: '/admin-galeria' },
  ];

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppBar
      component={motion.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      position="fixed"
      sx={{
        background: isScrolled
          ? 'rgba(187, 217, 176, 0.95)'
          : 'linear-gradient(180deg, rgba(187, 217, 176, 0.95) 0%, rgba(187, 217, 176, 0.95) 100%)',
        boxShadow: isScrolled
          ? '0 2px 28px rgba(0,0,0,0.1)'
          : 'none',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            py: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo y Título */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              gap: 2,
            }}
          >
            <Avatar
              src="/Logo.jpg"
              alt="Logo"
              sx={{
                width: { xs: 45, md: 55 },
                height: { xs: 45, md: 55 },
                border: '2px solid #2E7D32',
                p: 0.5,
                background: '#fff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
            {!isMobile && (
              <Box>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Unidad Educativa Fiscal
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="primary.dark"
                  sx={{ fontWeight: 500 }}
                >
                  "Olga Patricia Acebo Alvarez"
                </Typography>
              </Box>
            )}
          </Box>

          {/* Menú Desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: 'primary.main',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    backgroundColor: location.pathname === item.path ? 'rgba(46, 125, 50, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.15)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}

              <Button
                onClick={(e) => setAdminMenuAnchor(e.currentTarget)}
                startIcon={<FaCog />}
                endIcon={<FaChevronDown />}
                sx={{
                  ml: 1,
                  color: 'primary.main',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                Admin
              </Button>

              <Menu
                anchorEl={adminMenuAnchor}
                open={Boolean(adminMenuAnchor)}
                onClose={() => setAdminMenuAnchor(null)}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    borderRadius: 2,
                  },
                }}
              >
                {adminItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    component={Link}
                    to={item.path}
                    onClick={() => setAdminMenuAnchor(null)}
                    sx={{
                      py: 1.5,
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.1)',
                      },
                    }}
                  >
                    {item.text}
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={() => {
                    setAdminMenuAnchor(null);
                    handleLogout();
                  }}
                  disabled={isLoading}
                  sx={{
                    color: 'error.main',
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    mt: 1,
                  }}
                >
                  <FaSignOutAlt style={{ marginRight: 8 }} />
                  {isLoading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
                </MenuItem>
              </Menu>
            </Box>
          )}

          {/* Menú Mobile */}
          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ color: 'primary.main' }}
            >
              <FaBars size={24} />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Drawer Mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 320,
            background: 'linear-gradient(180deg, rgba(187, 217, 176, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 4,
            }}
          >
            <Avatar
              src="/Logo.jpg"
              alt="Logo"
              sx={{
                width: 50,
                height: 50,
                border: '2px solid #2E7D32',
              }}
            />
            <Typography variant="h6" color="primary.main" fontWeight={700}>
              Panel Admin
            </Typography>
          </Box>

          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  backgroundColor: location.pathname === item.path ? 'rgba(46, 125, 50, 0.1)' : 'transparent',
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: 'primary.main',
                  }}
                />
              </ListItem>
            ))}

            {adminItems.map((item) => (
              <ListItem
                key={item.text}
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  backgroundColor: location.pathname === item.path ? 'rgba(46, 125, 50, 0.1)' : 'transparent',
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  <FaCog />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: 'primary.main',
                  }}
                />
              </ListItem>
            ))}

            <ListItem
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
              disabled={isLoading}
              sx={{
                borderRadius: 2,
                mt: 2,
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'rgba(211, 47, 47, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'error.main' }}>
                <FaSignOutAlt />
              </ListItemIcon>
              <ListItemText
                primary={isLoading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
                primaryTypographyProps={{
                  fontWeight: 500,
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
