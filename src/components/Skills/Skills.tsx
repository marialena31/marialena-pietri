import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
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
  icon: string;
}

interface SkillObject {
  name: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const Skills = () => {
  const { t, i18n } = useTranslation('skills');
  const theme = useTheme();

  const getSkillIcon = (skillName: string): string => {
    const skillIconMap: { [key: string]: string } = {
      'HTML5/CSS3': 'html5',
      'JavaScript/TypeScript': 'javascript',
      'React': 'reactjs',
      'Next.js': 'nextjs',
      'SCSS': 'scss',
      'Knockout.js': 'knockoutjs',
      'Accessibilité': 'accessibility',
      
      // Backend
      'Node.js': 'nodejs',
      'PHP': 'php',
      'GraphQL': 'graphql',
      'MongoDB': 'mongodb',
      'Redis': 'redis',
      'Elasticsearch': 'elasticsearch',
      'APIs REST': 'rest-api',
      
      // E-commerce
      'Magento 1/2': 'magento',
      'Adobe Commerce Cloud': 'adobe-commerce',
      
      // DevOps
      'Git': 'git',
      'Docker': 'docker',
      'AWS': 'aws',
      'New Relic': 'newrelic',
      'Datadog': 'datadog',
      'Performance Optimization': 'performance'
    };

    const mappedIcon = skillIconMap[skillName];

    let iconPath;
    if (!mappedIcon) {
      if (skillName.includes('/')) {
        const firstPart = skillName.split('/')[0];
        iconPath = `/images/skills/${firstPart.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`;
      } else {
        iconPath = `/images/skills/${skillName.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`;
      }
    } else {
      iconPath = `/images/skills/${mappedIcon}.png`;
    }
    
    return iconPath;
  };

  const getSkillsForCategory = (category: string): Skill[] => {
    const skills = t(`categories.${category}.skills`, { returnObjects: true });
    
    if (!Array.isArray(skills)) {
      return [];
    }
    
    const mappedSkills = skills.map((skill: string | Skill | object) => {
      let skillObj;
      if (typeof skill === 'string') {
        skillObj = {
          name: skill,
          icon: getSkillIcon(skill)
        };
      } else {
        skillObj = {
          name: skill.name,
          icon: skill.icon
        };
      }
      return skillObj;
    });
    
    return mappedSkills;
  };

  const categories = ['frontend', 'backend', 'ecommerce', 'devops'];
  const skillCategories: SkillCategory[] = categories.map(category => {
    const categoryData = {
      title: t(`categories.${category}.title`),
      skills: getSkillsForCategory(category)
    };
    return categoryData;
  });

  return (
    <Box
      component="section"
      id="skills"
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
          {skillCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
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
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                    mb: 3,
                    pb: 2,
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    width: '100%',
                  }}
                >
                  {category.title}
                </Typography>
                <Grid container spacing={2}>
                  {category.skills.map((skill, skillIndex) => (
                    <Grid item xs={6} key={skillIndex}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          height: '100%',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 64,
                            height: 64,
                            mb: 1,
                            backgroundColor: '#FFFFFF',
                            borderRadius: '12px',
                            boxShadow: 1,
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={skill.icon}
                            alt=""
                            aria-hidden="true"
                            onError={(e) => {
                              console.error(`Error loading icon for ${skill.name}:`, e);
                              console.log('Icon path:', skill.icon);
                            }}
                            sx={{
                              maxWidth: '75%',
                              maxHeight: '75%',
                              objectFit: 'contain',
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                            fontSize: '0.875rem',
                            lineHeight: 1.2,
                            wordBreak: 'break-word',
                            minHeight: '2.4em',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {skill.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;