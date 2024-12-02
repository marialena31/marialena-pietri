import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 12, md: 16 },
        pb: 8,
        background: 'rgba(18, 18, 18, 0.95)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 40%, ${theme.palette.primary.dark}20, transparent 60%),
                      radial-gradient(circle at 70% 60%, ${theme.palette.secondary.dark}20, transparent 60%)`,
          opacity: 0.8,
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-20%',
                  left: '-10%',
                  width: '120%',
                  height: '140%',
                  background: `radial-gradient(ellipse at center, ${theme.palette.primary.main}10 0%, transparent 70%)`,
                  opacity: 0.5,
                  zIndex: -1,
                  filter: 'blur(40px)',
                  animation: 'pulse 8s ease-in-out infinite',
                },
                '@keyframes pulse': {
                  '0%, 100%': {
                    transform: 'scale(1)',
                    opacity: 0.5,
                  },
                  '50%': {
                    transform: 'scale(1.05)',
                    opacity: 0.7,
                  },
                },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 'bold',
                  mb: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    left: isMobile ? '50%' : '0',
                    transform: isMobile ? 'translateX(-50%)' : 'none',
                    width: '60px',
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: '2px',
                  }
                }}
              >
                {t('hero.title')}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  mb: 2,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                {t('hero.subtitle')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.6,
                  maxWidth: '600px',
                  margin: { xs: 'auto', md: '0' },
                  position: 'relative',
                  backdropFilter: 'blur(4px)',
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {t('hero.description')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  href="https://calendly.com/pietri-marialena/contact-30?month=2024-12"
                  target="_blank"
                  startIcon={<CalendarMonthIcon />}
                  sx={{
                    minWidth: 200,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                    '&:active': {
                      transform: 'translateY(1px)',
                    }
                  }}
                >
                  {t('hero.cta')}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  background: `radial-gradient(circle at center, ${theme.palette.primary.main}20 0%, transparent 70%)`,
                  filter: 'blur(40px)',
                  opacity: 0.6,
                  animation: 'float 6s ease-in-out infinite',
                },
                '@keyframes float': {
                  '0%, 100%': {
                    transform: 'translate(-50%, -50%) scale(1)',
                  },
                  '50%': {
                    transform: 'translate(-50%, -50%) scale(1.1)',
                  },
                },
              }}
            >
              <Box
                component="img"
                src="/images/profile.webp"
                alt="Maria-Lena Pietri"
                sx={{
                  width: '100%',
                  maxWidth: 400,
                  height: 'auto',
                  borderRadius: '50%',
                  boxShadow: theme.shadows[10],
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
