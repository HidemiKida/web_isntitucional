import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, TextField, CircularProgress, Alert } from '@mui/material';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin-dashboard');
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minHeight="100vh" sx={{
      bgcolor: 'background.default', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <Card sx={{ maxWidth: 370, width: '100%', boxShadow: 5, p: 2 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <img src="/Logo.jpg" alt="Logo" style={{ height: 60, marginBottom: 10 }} />
            <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>
              Acceso Administrativo
            </Typography>
          </Box>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="username"
              autoFocus
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
              sx={{ mt: 2, py: 1.3 }}
            >
              {loading ? <CircularProgress size={26} color="inherit" /> : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}