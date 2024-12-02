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
        backgroundColor: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          {t('about.title')}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                {t('about.whoAmI.title')}
              </Typography>
              <Typography 
                dangerouslySetInnerHTML={{ 
                  __html: sanitize(t('about.whoAmI.content')) 
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                {t('about.expertise.title')}
              </Typography>
              <Typography 
                dangerouslySetInnerHTML={{ 
                  __html: sanitize(t('about.expertise.content')) 
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                {t('about.languages.title')}
              </Typography>
              {languagesArray.map((lang: any, index: number) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">{lang.language}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {lang.level}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getLanguageLevel(lang.level)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.grey[200],
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
