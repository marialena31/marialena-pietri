import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';

interface Service {
  title: string;
  description: string;
}

const Services = () => {
  const { t } = useTranslation();

  const services: Service[] = [
    {
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
    },
    {
      title: t('services.development.title'),
      description: t('services.development.description'),
    },
    {
      title: t('services.migration.title'),
      description: t('services.migration.description'),
    },
    {
      title: t('services.security.title'),
      description: t('services.security.description'),
    },
    {
      title: t('services.management.title'),
      description: t('services.management.description'),
    },
    {
      title: t('services.performance.title'),
      description: t('services.performance.description'),
    },
  ];

  return (
    <Box
      id="services"
      component="section"
      sx={{
        py: 8,
        backgroundColor: 'white'
      }}
    >
      <Container>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          {t('services.title')}
        </Typography>
        
        <Typography
          variant="h5"
          component="p"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          {t('services.subtitle')}
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
                elevation={2}
              >
                <CardHeader
                  title={service.title}
                  titleTypographyProps={{ 
                    align: 'center', 
                    variant: 'h5',
                    gutterBottom: true 
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" color="text.secondary" align="center">
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
