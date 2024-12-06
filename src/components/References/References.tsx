import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/index';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import referencesConfig from './config.json';

interface Reference {
  name: string;
  logo: string;
  link?: string;
  isConfidential: boolean;
}

const References: React.FC = () => {
  const { t } = useTranslation('references');
  const theme = useTheme();

  const references: Reference[] = referencesConfig.references;

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
          {t('title')}
        </Typography>

        <Typography
          variant="h6"
          component="div"
          align="center"
          sx={{
            mb: 6,
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 400,
          }}
        >
          {t('subtitle')}
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
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
                  alt={`${reference.name} ${reference.isConfidential ? t('cac40Member') : ''}`}
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
                {reference.isConfidential && (
                  <Typography
                    component="span"
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
                      display: 'block'
                    }}
                  >
                    {t('confidential')}
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
