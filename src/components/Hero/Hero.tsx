import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
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
  const { t, i18n } = useTranslation('hero');
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
          background: `linear-gradient(90deg, transparent, ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main}20, transparent)`,
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
                  background: `radial-gradient(ellipse at center, ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main}20 0%, transparent 70%)`,
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
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                  fontWeight: 700,
                  mb: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('title')}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  fontWeight: 500,
                  mb: 3,
                  color: theme.palette.text.secondary,
                }}
              >
                {t('subtitle')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  mb: 4,
                  maxWidth: '800px',
                  color: theme.palette.text.secondary,
                }}
              >
                {t('description')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  gap: 3,
                  mt: 4,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href={t('cta.link')}
                  target="_blank"
                  startIcon={<CalendarMonthIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                  }}
                >
                  {t('cta.title')}
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
                  background: `radial-gradient(circle at center, ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main}20 0%, transparent 70%)`,
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
