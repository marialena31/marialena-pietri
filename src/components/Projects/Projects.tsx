import React from 'react';
import { useTranslation } from 'react-i18next';
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
} from '@mui/material';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

const Projects = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const projects: Project[] = [
    {
      title: t('portfolio.projects.chausson.title'),
      description: t('portfolio.projects.chausson.description'),
      image: '/images/projects/chausson-matériaux.jpg',
      technologies: ['Magento 2', 'Adobe Commerce Cloud', 'Elasticsearch', 'Redis', 'Varnish'],
    },
    {
      title: t('portfolio.projects.eram.title'),
      description: t('portfolio.projects.eram.description'),
      image: '/images/projects/eram-group.jpg',
      technologies: ['Magento 2', 'Adobe Commerce Cloud', 'AWS', 'Elasticsearch'],
    },
    {
      title: t('portfolio.projects.whisky.title'),
      description: t('portfolio.projects.whisky.description'),
      image: '/images/projects/la-maison-du-whisky.jpg',
      technologies: ['Magento 2', 'Adobe Commerce Cloud', 'Redis', 'Elasticsearch'],
    },
    {
      title: t('portfolio.projects.legrand.title'),
      description: t('portfolio.projects.legrand.description'),
      image: '/images/projects/legrand.jpg',
      technologies: ['Magento 2', 'Adobe Commerce Cloud', 'Elasticsearch', 'Redis'],
    },
    {
      title: t('portfolio.projects.marjane.title'),
      description: t('portfolio.projects.marjane.description'),
      image: '/images/projects/marjane-mall.jpg',
      technologies: ['Magento 2', 'Adobe Commerce Cloud', 'Elasticsearch', 'Redis', 'Varnish'],
    },
    {
      title: t('portfolio.projects.valrhona.title'),
      description: t('portfolio.projects.valrhona.description'),
      image: '/images/projects/valrhona.jpg',
      technologies: ['Magento 2', 'Adobe Commerce Cloud', 'Elasticsearch', 'Redis'],
    },
  ];

  return (
    <Box
      id="projects"
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
          {t('portfolio.title')}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          sx={{ mb: 6 }}
        >
          {t('portfolio.subtitle')}
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                  sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f5f5f5' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {project.technologies.map((tech, techIndex) => (
                      <Typography
                        key={techIndex}
                        variant="caption"
                        sx={{
                          display: 'inline-block',
                          bgcolor: theme.palette.primary.main,
                          color: 'white',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          mr: 1,
                          mb: 1,
                        }}
                      >
                        {tech}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                {project.link && (
                  <CardActions>
                    <Button size="small" color="primary" href={project.link} target="_blank">
                      {t('projects.learnMore')}
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
