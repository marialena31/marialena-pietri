import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSanitize } from '../../hooks/useSanitize';
import {
  Box,
  Container,
  Grid,
  Typography,
  LinearProgress,
  Paper,
  useTheme,
} from '@mui/material';

interface Language {
  language: string;
  level: string;
}

const About = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const sanitize = useSanitize();

  const getLanguageLevel = (level: string): number => {
    const nativeLevels = ["Langue maternelle", "Native", "Nativo"];
    const professionalLevels = ["Professionnel", "Professional", "Profesional"];
    const advancedLevels = ["Avancé", "Advanced", "Avanzado"];

    if (nativeLevels.includes(level)) {
      return 100;
    } else if (professionalLevels.includes(level)) {
      return 90;
    } else if (advancedLevels.includes(level)) {
      return 75;
    }
    return 0;
  };

  const languages = t('about.languages.list', { returnObjects: true });
  const languagesArray = Array.isArray(languages) ? languages : [];

  return (
    <Box
      id="about"
      sx={{
        py: 8,
        backgroundColor: 'rgba(18, 18, 18, 0.95)',
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
          {t('about.title')}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: `1px solid ${theme.palette.primary.main}40`,
                }
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {t('about.whoAmI.title')}
              </Typography>
              <Typography 
                dangerouslySetInnerHTML={{ 
                  __html: sanitize(t('about.whoAmI.content')) 
                }}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.7,
                  '& a': {
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: theme.palette.primary.light,
                    }
                  }
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: `1px solid ${theme.palette.primary.main}40`,
                }
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {t('about.expertise.title')}
              </Typography>
              <Typography 
                dangerouslySetInnerHTML={{ 
                  __html: sanitize(t('about.expertise.content')) 
                }}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.7,
                  '& a': {
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: theme.palette.primary.light,
                    }
                  }
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: `1px solid ${theme.palette.primary.main}40`,
                }
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {t('about.languages.title')}
              </Typography>
              {languagesArray.map((lang: any, index: number) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      {lang.language}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontStyle: 'italic'
                      }}
                    >
                      {lang.level}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getLanguageLevel(lang.level)}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      }
                    }}
                  />
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
