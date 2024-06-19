import React from 'react';
import { CssBaseline } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import './App.css';

const App = () => {
  return (
    <div>
      <CssBaseline />
      <AppRoutes />
    </div>
  );
};

export default App;
