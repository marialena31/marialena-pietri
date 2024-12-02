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
        backgroundColor: theme.palette.grey[50],
        borderTop: `1px solid ${theme.palette.grey[100]}`,
        borderBottom: `1px solid ${theme.palette.grey[100]}`,
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
                  backgroundColor: 'white',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {project.title}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Projet
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    dangerouslySetInnerHTML={{ __html: sanitize(project.projet) }}
                    paragraph
                  />
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Impact
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    dangerouslySetInnerHTML={{ __html: sanitize(project.impact) }}
                    paragraph
                  />
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Réalisations
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    dangerouslySetInnerHTML={{ __html: sanitize(project.realisations) }}
                    paragraph
                  />

                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.technologies.map((tech, techIndex) => (
                      <Typography
                        key={techIndex}
                        variant="caption"
                        sx={{
                          backgroundColor: theme.palette.grey[100],
                          color: theme.palette.text.secondary,
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
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
                      {t('portfolio.viewProject')}
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
