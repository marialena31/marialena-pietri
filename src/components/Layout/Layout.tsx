import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Link } from '@mui/material';
import theme from '../../theme';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Link
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          '&:focus': {
            position: 'fixed',
            top: '0',
            left: '0',
            width: 'auto',
            height: 'auto',
            padding: '1rem',
            background: '#fff',
            zIndex: 9999,
            color: 'primary.main',
            textDecoration: 'none',
          },
        }}
      >
        Skip to main content
      </Link>
      <Navbar />
      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        {children}
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
