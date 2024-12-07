import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Link } from '@mui/material';
import theme from '../../theme';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import SEO from '../SEO/SEO';
import StructuredData from '../SEO/StructuredData';
import '../../styles/global.css';

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
        className="skip-to-main"
        aria-label="Skip to main content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          '&:focus': {
            left: '0',
            top: '0',
            zIndex: 9999,
            padding: '1rem',
            background: theme.palette.background.paper,
            color: theme.palette.primary.main,
          }
        }}
      >
        Skip to main content
      </Link>
      <Box component="div">
        <Navbar />
        <Box
          component="main"
          id="main-content"
          role="main"
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
            '@media (prefers-reduced-motion: reduce)': {
              '&:before': {
                animation: 'none',
              }
            }
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
