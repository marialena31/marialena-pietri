import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';

interface Skill {
  name: string;
  description: string;
  icon: string;
}

const Skills = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const skillCategories = [
    {
      title: 'CMS',
      skills: [
        { name: 'Magento 2.x', description: 'Expert', icon: '/images/skills/magento.png' },
        { name: 'Adobe Commerce Cloud', description: 'Expert', icon: '/images/skills/Adobe-Commerce.png' },
        { name: 'WordPress', description: 'Advanced', icon: '/images/skills/wordpress.png' },
        { name: 'WooCommerce', description: 'Advanced', icon: '/images/skills/woo-commerce.png' },
        { name: 'Shopify', description: 'Advanced', icon: '/images/skills/shopify.png' },
      ],
    },
    {
      title: 'Web Development',
      skills: [
        { name: 'PHP', description: 'Expert', icon: '/images/skills/php.png' },
        { name: 'JavaScript', description: 'Advanced', icon: '/images/skills/JavaScript.png' },
        { name: 'React', description: 'Advanced', icon: '/images/skills/reactjs.png' },
        { name: 'HTML5', description: 'Expert', icon: '/images/skills/HTML5.png' },
        { name: 'CSS3', description: 'Expert', icon: '/images/skills/css3.png' },
        { name: 'SCSS', description: 'Advanced', icon: '/images/skills/scss.png' },
      ],
    },
    {
      title: 'DevOps & Infrastructure',
      skills: [
        { name: 'Git', description: 'Expert', icon: '/images/skills/git.png' },
        { name: 'Docker', description: 'Advanced', icon: '/images/skills/docker.png' },
        { name: 'AWS', description: 'Advanced', icon: '/images/skills/aws.png' },
        { name: 'MySQL', description: 'Expert', icon: '/images/skills/my-sql.png' },
        { name: 'MongoDB', description: 'Advanced', icon: '/images/skills/mongoDB.png' },
        { name: 'Redis', description: 'Advanced', icon: '/images/skills/redis.png' },
        { name: 'Elasticsearch', description: 'Advanced', icon: '/images/skills/elasticsearch.png' },
        { name: 'Varnish', description: 'Advanced', icon: '/images/skills/varnish-cache.png' },
      ],
    },
  ];

  return (
    <Box
      id="skills"
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
          background: `radial-gradient(circle at 30% 30%, ${theme.palette.primary.dark}15 0%, transparent 60%),
                      radial-gradient(circle at 70% 70%, ${theme.palette.secondary.dark}15 0%, transparent 60%)`,
          opacity: 0.6,
          pointerEvents: 'none',
        },
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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
          {t('skills.title')}
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
          {t('skills.subtitle')}
        </Typography>

        <Grid container spacing={4}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${theme.palette.primary.main}40`,
                  },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ 
                    mb: 3,
                    color: 'white',
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {category.title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {category.skills.map((skill, skillIndex) => (
                    <Box 
                      key={skillIndex}
                      sx={{
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: -8,
                          left: -12,
                          right: -12,
                          bottom: -8,
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '12px',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover': {
                          '&::before': {
                            opacity: 1,
                          },
                          '& img': {
                            transform: 'scale(1.05)',
                            filter: 'brightness(1.2)',
                          }
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1,
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        <Box
                          component="img"
                          src={skill.icon}
                          alt={skill.name}
                          sx={{
                            width: category.title === 'CMS' 
                              ? { xs: 60, sm: 80, md: 100 }
                              : { xs: 40, sm: 50, md: 60 },
                            height: category.title === 'CMS'
                              ? { xs: 60, sm: 80, md: 100 }
                              : { xs: 40, sm: 50, md: 60 },
                            mr: category.title === 'CMS' ? 4 : 3,
                            objectFit: 'contain',
                            display: 'block',
                            minWidth: category.title === 'CMS'
                              ? { xs: 60, sm: 80, md: 100 }
                              : { xs: 40, sm: 50, md: 60 },
                            transition: 'all 0.3s ease',
                            filter: 'brightness(0.9)',
                          }}
                        />
                        <Box>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontSize: category.title === 'CMS' ? '1.2rem' : '1.1rem',
                              fontWeight: 500,
                              color: 'white',
                              mb: 0.5,
                            }}
                          >
                            {skill.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.6)',
                              fontSize: '0.9rem',
                              fontStyle: 'italic',
                            }}
                          >
                            {skill.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
