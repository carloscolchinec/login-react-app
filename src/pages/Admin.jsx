import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import { API_ROUTES } from '../config';

const Admin = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(API_ROUTES.PROFILE, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        setError('Error al cargar el perfil del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(API_ROUTES.LOGOUT, null, {
        headers: {
          'Authorization': `Token ${Cookies.get('token')}`
        }
      });
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
    } finally {
      Cookies.remove('token');
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#ffffff' }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: '#ffffff' }}>
          Bienvenido, {profile?.data.username}.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout} sx={{ mt: 3, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
          Cerrar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Admin;
