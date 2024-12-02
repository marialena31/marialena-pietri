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
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
                        <Box>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontSize: category.title === 'CMS' ? '1.2rem' : '1.1rem',
                              fontWeight: 500 
                            }}
                          >
                            {skill.name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="textSecondary"
                            sx={{ mt: 0.5 }}
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
