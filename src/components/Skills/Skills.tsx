import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  useTheme,
} from '@mui/material';

interface Skill {
  name: string;
  level: number;
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
        { name: 'Magento 2.x', level: 95, description: 'Expert', icon: '/images/skills/magento.png' },
        { name: 'Adobe Commerce Cloud', level: 90, description: 'Expert', icon: '/images/skills/Adobe-Commerce.png' },
        { name: 'WordPress', level: 85, description: 'Advanced', icon: '/images/skills/wordpress.png' },
        { name: 'WooCommerce', level: 85, description: 'Advanced', icon: '/images/skills/woo-commerce.png' },
        { name: 'Shopify', level: 80, description: 'Advanced', icon: '/images/skills/shopify.png' },
      ],
    },
    {
      title: 'Web Development',
      skills: [
        { name: 'PHP', level: 95, description: 'Expert', icon: '/images/skills/php.png' },
        { name: 'JavaScript', level: 85, description: 'Advanced', icon: '/images/skills/JavaScript.png' },
        { name: 'React', level: 80, description: 'Advanced', icon: '/images/skills/reactjs.png' },
        { name: 'HTML5', level: 90, description: 'Expert', icon: '/images/skills/HTML5.png' },
        { name: 'CSS3', level: 90, description: 'Expert', icon: '/images/skills/css3.png' },
        { name: 'SCSS', level: 85, description: 'Advanced', icon: '/images/skills/scss.png' },
      ],
    },
    {
      title: 'DevOps & Infrastructure',
      skills: [
        { name: 'Git', level: 90, description: 'Expert', icon: '/images/skills/git.png' },
        { name: 'Docker', level: 85, description: 'Advanced', icon: '/images/skills/docker.png' },
        { name: 'AWS', level: 80, description: 'Advanced', icon: '/images/skills/aws.png' },
        { name: 'MySQL', level: 90, description: 'Expert', icon: '/images/skills/my-sql.png' },
        { name: 'MongoDB', level: 80, description: 'Advanced', icon: '/images/skills/mongoDB.png' },
        { name: 'Redis', level: 85, description: 'Advanced', icon: '/images/skills/redis.png' },
        { name: 'Elasticsearch', level: 85, description: 'Advanced', icon: '/images/skills/elasticsearch.png' },
        { name: 'Varnish', level: 80, description: 'Advanced', icon: '/images/skills/varnish-cache.png' },
      ],
    },
  ];

  return (
    <Box
      id="skills"
      sx={{
        py: 8,
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          {t('skills.title')}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          sx={{ mb: 6 }}
        >
          {t('skills.subtitle')}
        </Typography>

        <Grid container spacing={4}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mb: 3, color: theme.palette.primary.main }}
                >
                  {category.title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {category.skills.map((skill, skillIndex) => (
                    <Box key={skillIndex}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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
                              : { xs: 40, sm: 50, md: 60 }
                          }}
                        />
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontSize: category.title === 'CMS' ? '1.2rem' : '1.1rem',
                            fontWeight: 500 
                          }}
                        >
                          {skill.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        {skill.description}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={skill.level}
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
