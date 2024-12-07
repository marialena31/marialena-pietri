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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO title={title} description={description} image={image} article={article} />
      <StructuredData />
      {mounted && (
        <>
          <Link
            href="#main-content"
            sx={{
              clip: 'rect(0 0 0 0)',
              clipPath: 'inset(50%)',
              height: '1px',
              overflow: 'hidden',
              position: 'absolute',
              whiteSpace: 'nowrap',
              width: '1px',
              '&:focus': {
                clip: 'auto',
                clipPath: 'none',
                height: 'auto',
                width: 'auto',
                position: 'fixed',
                top: theme.spacing(2),
                left: theme.spacing(2),
                padding: theme.spacing(2),
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.primary.main,
                zIndex: theme.zIndex.tooltip,
                textDecoration: 'none',
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: theme.shape.borderRadius,
              },
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
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(180deg, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0.98) 100%)'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
                color: theme.palette.text.primary,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: theme.palette.mode === 'dark'
                    ? 'radial-gradient(circle at 50% 50%, rgba(0,210,255,0.1) 0%, rgba(58,123,213,0.05) 50%, rgba(18,18,18,0) 100%)'
                    : 'radial-gradient(circle at 50% 50%, rgba(0,210,255,0.05) 0%, rgba(58,123,213,0.025) 50%, rgba(255,255,255,0) 100%)',
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
          </Box>
        </>
      )}
    </ThemeProvider>
  );
};

export default Layout;
