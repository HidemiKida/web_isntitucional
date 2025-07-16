import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Importa el contexto de autenticación

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/admin-login" />;
  }

  return children;
}