import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  useTheme,
} from '@mui/material';

interface Reference {
  name: string;
  logo: string;
  link?: string;
}

const References = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const references: Reference[] = [
    { name: 'Bonpoint', logo: '/images/references/bonpoint.png' },
    { name: 'CAC 40', logo: '/images/references/cac-40.png' },
    { name: 'Chausson Matériaux', logo: '/images/references/chausson-materiaux.png' },
    { name: 'ERAM Group', logo: '/images/references/eram-group.png' },
    { name: 'France Air', logo: '/images/references/france-air.png' },
    { name: 'Hamilton', logo: '/images/references/hamilton.png' },
    { name: 'La Maison du Whisky', logo: '/images/references/la-maison-du-whisky.png' },
    { name: 'Ludilabel', logo: '/images/references/ludilabel.png' },
    { name: 'Maisons du Monde', logo: '/images/references/maisons-du-monde.png' },
    { name: 'Maps System', logo: '/images/references/maps-system.png' },
    { name: 'Marjane Mall', logo: '/images/references/marjanemall.png' },
    { name: 'Maurice Lacroix', logo: '/images/references/maurice-lacroix.png' },
    { name: 'MountNPass', logo: '/images/references/mountnpass.png' },
    { name: 'Nicoll', logo: '/images/references/nicoll.png' },
    { name: 'Nutrixo', logo: '/images/references/nutrixo.png' },
    { name: 'OpenClassrooms', logo: '/images/references/openclassrooms.png' },
    { name: 'Planet Cards', logo: '/images/references/planet-cards.png' },
    { name: 'Pro a Pro', logo: '/images/references/pro-a-pro.png' },
    { name: 'Sopra Steria', logo: '/images/references/sopra-steria.png' },
    { name: 'Valrhona', logo: '/images/references/valrhona.png' },
  ];

  return (
    <Box
      id="references"
      sx={{
        py: 8,
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          {t('references.title')}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          sx={{ mb: 6 }}
        >
          {t('references.subtitle')}
        </Typography>

        <Grid container spacing={4}>
          {references.map((reference, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Card
                elevation={1}
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={reference.logo}
                  alt={reference.name}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    maxHeight: 80,
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default References;
