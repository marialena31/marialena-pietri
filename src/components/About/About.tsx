import React from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
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

  const getLanguageLevel = (level: string): number => {
    switch (level) {
      case "Langue maternelle":
        return 100;
      case "Professionnel":
        return 90;
      default:
        return 75;
    }
  };

  const languages: Language[] = t('about.languages.list', { returnObjects: true });

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
                  __html: DOMPurify.sanitize(t('about.whoAmI.content')) 
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
                  __html: DOMPurify.sanitize(t('about.expertise.content')) 
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                {t('about.languages.title')}
              </Typography>
              {languages.map((lang) => (
                <Box key={lang.language} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{lang.language}</Typography>
                    <Typography>{lang.level}</Typography>
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
                      },
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
