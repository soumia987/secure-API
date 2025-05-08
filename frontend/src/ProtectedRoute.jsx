import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

const ProtectedRoute = ({ children, requiredRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérifie le token avec le backend
        const response = await api.get('/me');
        const user = response.data.user;
        
        // Vérifie le rôle si nécessaire
        if (requiredRole && user.role !== requiredRole) {
          navigate('/login');
        }
      } catch (err) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, requiredRole]);

  return children;
};

export default ProtectedRoute;