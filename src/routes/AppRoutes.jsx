import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import ProtectedRoute from './ProtectedRoute';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post('https://perfectosri.software-total.com/api/v1/logout/', null, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        });
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        Cookies.remove('token'); // Eliminar el token de las cookies
        navigate('/login'); // Redirigir a la página de login
      }
    };

    performLogout();
  }, [navigate]);

  return null;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
