import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSanitize } from '../../hooks/useSanitize';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  useTheme,
  Divider,
  Chip
} from '@mui/material';

interface Project {
  title: string;
  projet: string;
  impact: string;
  realisations: string;
  image: string;
  technologies: string[];
  link?: string;
}

const Projects = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const sanitize = useSanitize();

  const projects: Project[] = [
    {
      title: t('portfolio.projects.chausson.title'),
      projet: t('portfolio.projects.chausson.projet'),
      impact: t('portfolio.projects.chausson.impact'),
      realisations: t('portfolio.projects.chausson.realisations'),
      image: '/images/projects/chausson-matériaux.jpg',
      technologies: ['Project Management', 'Marketing', 'PIM', 'E-commerce'],
    },
    {
      title: t('portfolio.projects.eram.title'),
      projet: t('portfolio.projects.eram.projet'),
      impact: t('portfolio.projects.eram.impact'),
      realisations: t('portfolio.projects.eram.realisations'),
      image: '/images/projects/eram-group.jpg',
      technologies: ['Magento 2', 'Adobe Commerce Cloud', 'Redis', 'Fastly', 'Elasticsearch'],
    },
    {
      title: t('portfolio.projects.whisky.title'),
      projet: t('portfolio.projects.whisky.projet'),
      impact: t('portfolio.projects.whisky.impact'),
      realisations: t('portfolio.projects.whisky.realisations'),
      image: '/images/projects/la-maison-du-whisky.jpg',
      technologies: ['ReactJS', 'PHP', 'JavaScript', 'Git', 'ElasticSearch'],
    },
    {
      title: t('portfolio.projects.legrand.title'),
      projet: t('portfolio.projects.legrand.projet'),
      impact: t('portfolio.projects.legrand.impact'),
      realisations: t('portfolio.projects.legrand.realisations'),
      image: '/images/projects/legrand.jpg',
      technologies: ['Magento 2', 'B2B', 'Elasticsearch', 'Redis'],
    },
    {
      title: t('portfolio.projects.marjane.title'),
      projet: t('portfolio.projects.marjane.projet'),
      impact: t('portfolio.projects.marjane.impact'),
      realisations: t('portfolio.projects.marjane.realisations'),
      image: '/images/projects/marjane-mall.jpg',
      technologies: ['Android', 'iOS', 'Octopia', 'Marketplace', 'Nearshore'],
    },
    {
      title: t('portfolio.projects.valrhona.title'),
      projet: t('portfolio.projects.valrhona.projet'),
      impact: t('portfolio.projects.valrhona.impact'),
      realisations: t('portfolio.projects.valrhona.realisations'),
      image: '/images/projects/valrhona.jpg',
      technologies: ['B2B', 'Platform.sh', 'Mirakl', 'Marketplace', 'API', 'SSO'],
    },
  ];

  return (
    <Box
      id="portfolio"
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
          {t('portfolio.title')}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ 
            mb: 6, 
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '800px',
            margin: '0 auto',
            fontSize: '1.1rem',
            lineHeight: 1.6,
          }}
        >
          {t('portfolio.subtitle')}
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
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
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${theme.palette.primary.main}40`,
                    '& img': {
                      transform: 'scale(1.1)',
                    },
                    '&::before': {
                      opacity: 1,
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    opacity: 0.7,
                    transition: 'opacity 0.3s ease',
                    zIndex: 1,
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '56.25%',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%)',
                      zIndex: 1,
                    }
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </Box>
                <CardContent 
                  sx={{ 
                    flexGrow: 1, 
                    p: 3,
                    backgroundColor: 'rgba(18, 18, 18, 0.95)',
                  }}
                >
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h3"
                    sx={{ 
                      fontWeight: 600,
                      mb: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      position: 'relative',
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    paragraph
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.8,
                      mb: 2,
                      fontSize: '0.95rem',
                    }}
                  >
                    {project.projet}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {project.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: theme.palette.primary.light,
                          border: `1px solid ${theme.palette.primary.main}30`,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.12)',
                            transform: 'translateY(-2px)',
                          }
                        }}
                      />
                    ))}
                  </Box>
                  {project.link && (
                    <Button
                      variant="outlined"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                      sx={{
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                        borderWidth: '1.5px',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: theme.palette.primary.light,
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      {t('portfolio.viewProject')}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
