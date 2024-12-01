import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Grid,
  Typography,
  LinearProgress,
  Paper,
  useTheme,
} from '@mui/material';

const About = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const languageSkills = [
    { language: 'French', level: 100 },
    { language: 'English', level: 90 },
    { language: 'Spanish', level: 85 },
  ];

  return (
    <Box
      id="about"
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.default,
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
              <Typography>
                {t('about.whoAmI.content')}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                {t('about.expertise.title')}
              </Typography>
              <Typography>
                {t('about.expertise.content')}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                {t('about.languages.title')}
              </Typography>
              {languageSkills.map((lang) => (
                <Box key={lang.language} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{lang.language}</Typography>
                    <Typography>{lang.level}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={lang.level}
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
