import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme
} from '@mui/material';

interface Reference {
  name: string;
  logo: string;
  link?: string;
  isCAC40: boolean;
}

const References = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const references: Reference[] = [
    { name: 'Bonpoint', logo: '/images/references/bonpoint.png', isCAC40: false },
    { name: 'CAC 40', logo: '/images/references/cac-40.png', isCAC40: true },
    { name: 'Chausson Matériaux', logo: '/images/references/chausson-materiaux.png', isCAC40: false },
    { name: 'ERAM Group', logo: '/images/references/eram-group.png', isCAC40: false },
    { name: 'France Air', logo: '/images/references/france-air.png', isCAC40: false },
    { name: 'Hamilton', logo: '/images/references/hamilton.png', isCAC40: false },
    { name: 'La Maison du Whisky', logo: '/images/references/la-maison-du-whisky.png', isCAC40: false },
    { name: 'Ludilabel', logo: '/images/references/ludilabel.png', isCAC40: false },
    { name: 'Maisons du Monde', logo: '/images/references/maisons-du-monde.png', isCAC40: false },
    { name: 'Maps System', logo: '/images/references/maps-system.png', isCAC40: false },
    { name: 'Marjane Mall', logo: '/images/references/marjanemall.png', isCAC40: false },
    { name: 'Maurice Lacroix', logo: '/images/references/maurice-lacroix.png', isCAC40: false },
    { name: 'MountNPass', logo: '/images/references/mountnpass.png', isCAC40: false },
    { name: 'Nicoll', logo: '/images/references/nicoll.png', isCAC40: false },
    { name: 'Nutrixo', logo: '/images/references/nutrixo.png', isCAC40: false },
    { name: 'OpenClassrooms', logo: '/images/references/openclassrooms.png', isCAC40: false },
    { name: 'Planet Cards', logo: '/images/references/planet-cards.png', isCAC40: false },
    { name: 'Pro a Pro', logo: '/images/references/pro-a-pro.png', isCAC40: false },
    { name: 'Sopra Steria', logo: '/images/references/sopra-steria.png', isCAC40: false },
    { name: 'Valrhona', logo: '/images/references/valrhona.png', isCAC40: false },
  ];

  return (
    <Box
      id="references"
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
          component="h2"
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
          {t('references.title')}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {references.map((reference, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                    '& img': {
                      transform: 'scale(1.05)',
                    }
                  }
                }}
              >
                <Box
                  component="img"
                  src={reference.logo}
                  alt={`${reference.name} ${reference.isCAC40 ? t('references.cac40Member') : ''}`}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 100,
                    objectFit: 'contain',
                    transition: 'transform 0.3s ease',
                  }}
                  role="img"
                />
                {reference.isCAC40 && (
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) rotate(-45deg)',
                      color: 'rgba(0, 0, 0, 0.1)',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      width: '200%',
                      textAlign: 'center',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t('references.confidential')}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default References;
