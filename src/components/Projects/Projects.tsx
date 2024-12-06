import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';

interface ProjectAchievement {
  title: string;
  items: string[];
}

interface ProjectSection {
  title: string;
  content: string;
}

interface Project {
  id: string;
  title: string;
  date: string;
  project: ProjectSection;
  impact: ProjectSection;
  achievements: ProjectAchievement;
  image: string;
  technologies: string[];
  tags: string[];
  link?: string;
}

const Projects = () => {
  const { t, i18n } = useTranslation('projects');  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Get projects from current language and French fallback
  const currentProjects = t('projects', { returnObjects: true });
  const frProjects = i18n.getResource('fr', 'projects', 'projects') || [];

  // Create a map of French project images
  const frProjectImages = Array.isArray(frProjects) 
    ? frProjects.reduce((acc, project) => ({
        ...acc,
        [project.id]: project.image
      }), {})
    : {};

  // Merge current projects with French image fallbacks
  const projects = Array.isArray(currentProjects) 
    ? currentProjects.map(project => {
        const finalImage = project.image || frProjectImages[project.id] || '/images/projects/default.jpg';
        return {
          ...project,
          image: finalImage
        };
      })
    : [];

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
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="div"
          align="center"
          sx={{
            mb: 1,
            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 600,
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

        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 24px rgba(0, 0, 0, 0.2)`,
                    '& .project-image': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <CardMedia
                    component="img"
                    image={project.image}
                    alt={project.title}
                    className="project-image"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
                    }}
                  />
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {project.date}
                  </Typography>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{
                      color: 'white',
                      fontWeight: 500,
                      mb: 2,
                    }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 2,
                      lineHeight: 1.6,
                    }}
                  >
                    {project.project.content}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      color: theme.palette.primary.light,
                      mb: 1,
                      fontWeight: 500,
                    }}
                  >
                    {project.impact.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 2,
                      lineHeight: 1.6,
                    }}
                  >
                    {project.impact.content}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      color: theme.palette.secondary.light,
                      mb: 1,
                      fontWeight: 500,
                    }}
                  >
                    {project.achievements.title}
                  </Typography>
                  <Box 
                    component="ul" 
                    sx={{ 
                      pl: 3, 
                      mb: 2,
                      listStyle: 'none',
                      '& li': {
                        position: 'relative',
                        '&::before': {
                          content: '"•"',
                          position: 'absolute',
                          left: '-1em',
                          color: theme.palette.secondary.light,
                        }
                      }
                    }}
                  >
                    {project.achievements.items.map((item, index) => (
                      <Box
                        key={index}
                        component="li"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          mb: 0.5,
                          fontSize: '0.875rem',
                          lineHeight: 1.43,
                        }}
                      >
                        {item}
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {project.tags?.map((tagKey, index) => {
                      const tagTranslation = t(`tags.${tagKey}`, { defaultValue: tagKey });
                      return (
                        <Chip
                          key={index}
                          label={tagTranslation}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '4px',
                            textTransform: 'capitalize',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            },
                          }}
                        />
                      );
                    })}
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
                    {project.technologies?.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: 'rgba(255, 255, 255, 0.7)',
                          borderRadius: '4px',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          },
                        }}
                      />
                    ))}
                  </Box>
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
