import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Header from './components/Header';
import HomeMain from './components/HomeMain';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminNoticias from './components/AdminNoticias';
import AdminGaleria from './components/AdminGaleria';
import Noticias from './components/Noticias';
import Galeria from './components/Galeria';
import PrivateRoute from './components/PrivateRoute';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <div className="app-container">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomeMain />} />
                <Route path="/noticias" element={<Noticias />} />
                <Route path="/galeria" element={<Galeria />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                  path="/admin-dashboard"
                  element={
                    <PrivateRoute>
                      <AdminNoticias />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin-galeria"
                  element={
                    <PrivateRoute>
                      <AdminGaleria />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin-noticias"
                  element={
                    <PrivateRoute>
                      <AdminNoticias />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;