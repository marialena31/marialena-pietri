import React from 'react';
import { useTranslation } from 'react-i18next';
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

interface SkillItem {
  title: string;
  description: string;
  level: number;
}

const getSkillIcon = (skillName: string): string => {
  const skillIconMap: { [key: string]: string } = {
    'HTML5/CSS3': 'HTML5',
    'JavaScript/TypeScript': 'JavaScript',
    'TypeScript': 'typescript',
    'React': 'reactjs',
    'Next.js': 'nextjs',
    'Node.js': 'nodejs',
    'Knockout.js': 'knockoutjs',
    'PHP': 'php',
    'MySQL/PostgreSQL': 'my-sql',
    'MongoDB': 'mongoDB',
    'GraphQL': 'graphql',
    'Git': 'git',
    'Docker': 'docker',
    'AWS': 'aws',
    'Redis': 'redis',
    'Elasticsearch': 'elasticsearch',
    'Magento 1/2': 'magento',
    'Adobe Commerce Cloud': 'Adobe-Commerce',
    'WordPress': 'wordpress',
    'WooCommerce': 'woo-commerce',
    'Shopify': 'shopify',
    'CSS3': 'css3',
    'SCSS': 'scss',
    'Varnish': 'varnish-cache',
    'New Relic': 'newrelic',
    'Datadog': 'datadog',
    'APIs REST': 'api-rest',
    'Design Responsive': 'responsive-design',
    'Accessibilité': 'accessibility',
    'Passerelles de Paiement': 'payment-gateway',
    'Intégration ERP': 'erp',
    'Systèmes PIM': 'pim',
    'Marketplaces': 'marketplace',
    'Solutions B2B': 'b2b',
    'Cybersécurité': 'security',
    'Optimisation des Performances': 'performance'
  };

  const mappedIcon = skillIconMap[skillName];
  console.log(`Processing skill: "${skillName}" -> ${mappedIcon || 'not found in map'}`);

  if (!mappedIcon) {
    if (skillName.includes('/')) {
      const firstPart = skillName.split('/')[0];
      return `/images/skills/${firstPart.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`;
    }
    return `/images/skills/${skillName.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`;
  }

  return `/images/skills/${mappedIcon}.png`;
};

const Skills = () => {
  const { t } = useTranslation('skills');
  const theme = useTheme();

  // Ensure we're getting an array by providing a default empty array
  const items = t('items', { returnObjects: true }) as SkillItem[] || [];

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
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {t('title')}
        </Typography>

        <Grid container spacing={3}>
          {Array.isArray(items) && items.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
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
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2 }}
                  >
                    {item.description}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={item.level}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.grey[200],
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
