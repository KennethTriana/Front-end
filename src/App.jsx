import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import NavbarRoutes from './routes/NavbarRoutes';

import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className='content'>
          <NavbarRoutes />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;