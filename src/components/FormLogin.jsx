import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography, Alert, Paper, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_ROUTES } from '../config';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#1e88e5',
            },
            '&:hover fieldset': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          },
        },
      },
    },
  },
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axios.post(API_ROUTES.LOGIN, {
        username,
        password
      });

      if (response.data.status === 'error') {
        setError(response.data.message);
      } else {
        const { token } = response.data.data;
        Cookies.set('token', token, { expires: 1 }); // Guardar token en cookies por 1 día
        setSuccess('Login exitoso. Redirigiendo...');
        navigate('/admin'); // Redirigir a /admin
      }
    } catch (error) {
      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError('Error: No se pudo conectar con el servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#0d0d0d',
          backgroundImage: 'linear-gradient(to right, #0d0d0d, #1c1c1c)',
        }}
      >
        <Container maxWidth="xs">
          <Paper elevation={10} sx={{ padding: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ color: '#ffffff' }}>
                Iniciar sesión
              </Typography>
              {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{success}</Alert>}
              <form noValidate autoComplete="off" onSubmit={handleLogin} style={{ width: '100%' }}>
                <TextField
                  label="Usuario"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  InputLabelProps={{
                    style: { color: '#ffffff' },
                  }}
                  inputProps={{
                    style: { color: '#ffffff' },
                  }}
                />
                <TextField
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{
                    style: { color: '#ffffff' },
                  }}
                  inputProps={{
                    style: { color: '#ffffff' },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, mb: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                </Button>
              </form>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
