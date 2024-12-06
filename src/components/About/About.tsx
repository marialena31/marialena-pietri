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
  LinearProgress,
  useTheme,
} from '@mui/material';

interface Language {
  language: string;
  level: string;
  level2: string;
}

const About = () => {
  const { t, i18n } = useTranslation('about');
  const theme = useTheme();

  const getProgressValue = (level2: string): number => {
    switch (level2) {
      case '':
        return 100;
      case 'C2':
        return 100;
      case 'C1':
        return 90;
      case 'B2/C1':
        return 80;
      case 'B2':
        return 70;
      case 'B1/B2':
        return 60;
      case 'B1':
        return 50;
      case 'A2/B1':
        return 40;
      case 'A2':
        return 30;
      case 'A1/A2':
        return 20;
      case 'A1':
        return 10;
      default:
        return 0;
    }
  };

  const languages = t('languages', { returnObjects: true }) as Language[];

  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
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

        <Grid container spacing={4}>
          {/* Who Am I Section */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                backgroundColor: theme.palette.background.paper,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h3" component="h3" color="primary" gutterBottom>
                  {t('whoAmI.title')}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {t('whoAmI.content')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Expertise Section */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                backgroundColor: theme.palette.background.paper,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h3" component="h3" color="primary" gutterBottom>
                  {t('expertise.title')}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {t('expertise.content')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Languages Section */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                backgroundColor: theme.palette.background.paper,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h3" component="h3" color="primary" gutterBottom>
                  Languages
                </Typography>
                {Array.isArray(languages) && languages.map((lang, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">
                        {lang.language}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {lang.level} {lang.level2 && `(${lang.level2})`}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={getProgressValue(lang.level2)}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: theme.palette.grey[200],
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        },
                      }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
