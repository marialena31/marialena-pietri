import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Link } from '@mui/material';
import theme from '../../theme';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import SEO from '../SEO/SEO';
import StructuredData from '../SEO/StructuredData';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description, image, article }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO title={title} description={description} image={image} article={article} />
      <StructuredData />
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
            background: 'rgba(18, 18, 18, 0.95)',
            color: '#00d2ff',
            textDecoration: 'none',
            zIndex: 9999,
            borderRadius: '0 0 8px 0',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
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
          background: 'linear-gradient(180deg, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0.98) 100%)',
          color: theme.palette.text.primary,
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(0,210,255,0.1) 0%, rgba(58,123,213,0.05) 50%, rgba(18,18,18,0) 100%)',
            pointerEvents: 'none',
            zIndex: 0,
          },
          '& > *': {
            position: 'relative',
            zIndex: 1,
          },
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
