import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';

interface ServiceItem {
  title: string;
  description: string;
}

const Services = () => {
  const { t, i18n } = useTranslation('services');  // Specify the 'services' namespace
  const theme = useTheme();

  // Access the items array from the services namespace
  const services = (t('items', { returnObjects: true }) || []) as ServiceItem[];

  return (
    <Box
      id="services"
      component="section"
      sx={{
        py: 8,
        backgroundColor: 'rgba(18, 18, 18, 0.95)',
        color: 'white',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.dark}15 0%, transparent 60%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.dark}15 0%, transparent 60%)`,
          opacity: 0.6,
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ 
            mb: 6,
            color: 'white',
            fontWeight: 600,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: '2px',
            }
          }}
        >
          {t('title')}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ 
            mb: 12,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '800px',
            margin: '0 auto',
            fontSize: '1.1rem',
            lineHeight: 1.6,
          }}
        >
          {t('subtitle')}
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 0 }}>
          {Array.isArray(services) && services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    opacity: 0.7,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '120%',
                    height: '120%',
                    background: `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 70%)`,
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${theme.palette.primary.main}40`,
                    '&:before': {
                      opacity: 1,
                    },
                    '&:after': {
                      opacity: 1,
                    }
                  }
                }}
              >
                <CardContent 
                  sx={{ 
                    flexGrow: 1,
                    p: 4,
                    position: 'relative',
                    zIndex: 1,
                    '&:last-child': { pb: 4 }
                  }}
                >
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h3"
                    align="center"
                    sx={{ 
                      fontWeight: 600,
                      mb: 3,
                      background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '40px',
                        height: '2px',
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        borderRadius: '1px',
                        opacity: 0.7,
                      }
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.8,
                      letterSpacing: '0.3px',
                      fontSize: '1rem'
                    }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
