import React from 'react';
import { Box, Typography, Stack, Link, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './i18n';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface CVContentProps {
  containerRef?: React.RefObject<HTMLDivElement>;
}

const CVContent: React.FC<CVContentProps> = () => {
  const { t } = useTranslation('cv');
  const categories = t('categories', { returnObjects: true }) || {};
  const languages = t('languagesList', { returnObjects: true }) || [];
  const projects = t('projects.items', { returnObjects: true }) || [];

  return (
    <Box 
      data-cv-content
      component="article"
      role="article"
      aria-label="CV Content"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        py: 6,
        px: 4,
        width: '100%',
        bgcolor: '#121212',
        '@media print': {
          padding: '20mm',
          margin: 0,
          height: '297mm'
        }
      }}
    >
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        sx={{ 
          width: '100%',
          flex: 1,
          alignItems: 'flex-start'
        }}
      >
        {/* Left Column */}
        <Box 
          component="aside"
          role="complementary"
          sx={{ 
            width: { xs: '100%', sm: '30%' },
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {/* Profile Photo */}
          <Box 
            component="figure"
            sx={{ 
              mb: 2, 
              display: 'flex', 
              justifyContent: 'center',
              height: '300px',
              minHeight: '300px',
              flexShrink: 0,
              alignItems: 'center',
              margin: 0
            }}
          >
            <Box
              sx={{
                width: '200px !important',
                height: '200px !important',
                position: 'relative',
                borderRadius: '50%',
                border: '4px solid rgba(144, 202, 249, 0.5)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                background: 'linear-gradient(145deg, rgba(25, 25, 25, 0.9), rgba(35, 35, 35, 0.9))',
                overflow: 'hidden',
                flexShrink: 0,
                flex: 'none'
              }}
            >
              <Box
                component="img"
                src="/images/profile.webp"
                alt="Maria Lena Pietri profile photo"
                loading="eager"
                width={200}
                height={200}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
          </Box>

          {/* Contact Info */}
          <Box 
            component="section"
            aria-label="Contact Information"
            sx={{
              mb: 2,
              p: 2.5,
              borderRadius: '12px',
              background: 'linear-gradient(145deg, rgba(25, 25, 25, 0.9), rgba(35, 35, 35, 0.9))',
              backdropFilter: 'blur(5px)',
            }}
          >
            <Typography variant="h6" component="h2" sx={{ 
              color: '#90caf9', 
              mb: 2, 
              fontWeight: 600,
              fontSize: '1rem' 
            }}>
              {t('contact')}
            </Typography>
            <Stack spacing={1.5} component="address" sx={{ fontStyle: 'normal' }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneIcon sx={{ color: '#90caf9', fontSize: '1.1rem' }} aria-hidden="true" />
                <Link
                  href="tel:+33076181101"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': { color: '#90caf9' },
                    fontSize: '0.875rem'
                  }}
                >
                  +33 07 61 81 11 01
                </Link>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <EmailIcon sx={{ color: '#90caf9', fontSize: '1.1rem' }} aria-hidden="true" />
                <Link 
                  href="mailto:contact@marialena-pietri.fr"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': { color: '#90caf9' },
                    fontSize: '0.875rem'
                  }}
                >
                  contact@marialena-pietri.fr
                </Link>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon sx={{ color: '#90caf9', fontSize: '1.1rem' }} aria-hidden="true" />
                <Typography sx={{ fontSize: '0.875rem' }}>Colomiers, France</Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Technical Skills */}
          <Box 
            component="section"
            aria-label="Technical Skills"
            sx={{
              mb: 2,
              p: 3,
              width: '100%',
              borderRadius: '12px',
              background: 'linear-gradient(145deg, rgba(25, 25, 25, 0.9), rgba(35, 35, 35, 0.9))',
              backdropFilter: 'blur(5px)',
            }}
          >
            <Typography variant="h5" component="h2" sx={{ 
              color: '#90caf9',
              mb: 3,
              fontWeight: 600,
              fontSize: '1.1rem'
            }}>
              {t('technicalSkills')}
            </Typography>
            <Stack spacing={3} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {Object.entries(categories).map(([key, category]: [string, any]) => (
                <Box component="li" key={key}>
                  <Typography component="h3" sx={{ 
                    color: '#90caf9',
                    mb: 1.5,
                    fontWeight: 500,
                    fontSize: '0.95rem'
                  }}>
                    {category.title}
                  </Typography>
                  <Box 
                    component="ul"
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 1.5,
                      p: 0,
                      m: 0,
                      listStyle: 'none'
                    }}
                  >
                    {Array.isArray(category.skills) && category.skills.map((skill: string) => {
                      const skillMap: { [key: string]: string } = {
                        'HTML5/CSS3': 'html5',
                        'JavaScript/TypeScript': 'javascript',
                        'React': 'reactjs',
                        'Next.js': 'nextjs',
                        'SCSS': 'scss',
                        'Knockout.js': 'knockoutjs',
                        'Accessibilité': 'accessibility',
                        'Accesibilidad': 'accessibility',
                        'Accessibility': 'accessibility',
                        'Node.js': 'nodejs',
                        'PHP': 'php',
                        'GraphQL': 'graphql',
                        'MongoDB': 'mongodb',
                        'Redis': 'redis',
                        'Elasticsearch': 'elasticsearch',
                        'APIs REST': 'rest-api',
                        'REST APIs': 'rest-api',
                        'APIs REST': 'rest-api',
                        'Magento': 'magento',
                        'Adobe Commerce Cloud': 'adobe-commerce',
                        'Git': 'git',
                        'Docker': 'docker',
                        'AWS': 'aws',
                        'New Relic': 'newrelic',
                        'Datadog': 'datadog',
                        'Performance Optimization': 'performance',
                        'Optimisation des performances': 'performance',
                        'Optimización de rendimiento': 'performance'
                      };

                      const iconName = skillMap[skill] || skill.toLowerCase().replace(/[^a-z0-9]/g, '');
                      const iconPath = `/images/skills/${iconName}.png`;

                      return (
                        <Box
                          component="li"
                          key={skill}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1,
                            borderRadius: '6px',
                            bgcolor: 'white',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              bgcolor: 'rgba(255, 255, 255, 0.9)',
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={iconPath}
                            alt={`${skill} icon`}
                            loading="lazy"
                            width={24}
                            height={24}
                            sx={{
                              width: '24px',
                              height: '24px',
                              objectFit: 'contain'
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Languages */}
          <Box 
            component="section"
            aria-label="Language Skills"
            sx={{
              p: 2.5,
              borderRadius: '12px',
              background: 'linear-gradient(145deg, rgba(25, 25, 25, 0.9), rgba(35, 35, 35, 0.9))',
              backdropFilter: 'blur(5px)',
            }}
          >
            <Typography variant="h6" component="h2" sx={{ 
              color: '#90caf9', 
              mb: 2, 
              fontWeight: 600,
              fontSize: '1rem' 
            }}>
              {t('languages')}
            </Typography>
            <Stack spacing={2} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {Array.isArray(languages) && languages.map((lang: any, index: number) => (
                <Box component="li" key={index}>
                  <Typography component="h3" sx={{ 
                    fontSize: '0.875rem',
                    mb: 0.5
                  }}>
                    {lang.language}
                  </Typography>
                  <Box 
                    role="progressbar"
                    aria-valuenow={lang.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${lang.language} proficiency: ${lang.progress}%`}
                    sx={{ 
                      width: '100%', 
                      height: '4px',
                      bgcolor: 'rgba(144, 202, 249, 0.1)',
                      borderRadius: '2px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: `${lang.progress}%`,
                      bgcolor: '#90caf9',
                      borderRadius: '2px',
                      transition: 'width 1s ease-in-out'
                    }} />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Right Column */}
        <Box 
          component="main"
          sx={{ width: { xs: '100%', sm: '70%' }, pl: { sm: 2 } }}
        >
          {/* Header */}
          <Box component="header" sx={{ mb: 5, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h1" sx={{
              color: '#90caf9',
              fontWeight: 600,
              mb: 1,
              fontSize: { xs: '1.8rem', sm: '2rem' }
            }}>
              {t('hero.title')}
            </Typography>
            <Typography variant="h2" sx={{
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}>
              {t('hero.subtitle')}
            </Typography>
          </Box>

          {/* About */}
          <Box 
            component="section"
            aria-label="About Me"
            sx={{
              mb: 5,
              p: 4,
              width: '100%',
              borderRadius: '12px',
              background: 'linear-gradient(145deg, rgba(25, 25, 25, 0.9), rgba(35, 35, 35, 0.9))',
              backdropFilter: 'blur(5px)',
            }}
          >
            <Typography paragraph sx={{ 
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.6,
              mb: 0,
              fontSize: '0.9rem'
            }}>
              {t('about.content')}
            </Typography>
          </Box>

          {/* Projects */}
          <Box 
            component="section"
            aria-label="Projects"
            sx={{
              p: 4,
              width: '100%',
              borderRadius: '12px',
              background: 'linear-gradient(145deg, rgba(25, 25, 25, 0.9), rgba(35, 35, 35, 0.9))',
              backdropFilter: 'blur(5px)',
            }}
          >
            <Typography variant="h2" sx={{ 
              color: '#90caf9',
              mb: 3,
              fontWeight: 600,
              fontSize: '1.1rem'
            }}>
              {t('projects.title')}
            </Typography>
            <Stack spacing={2} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {Array.isArray(projects) && projects.map((project: any, index: number) => (
                <Box
                  component="li"
                  key={index}
                  sx={{
                    p: 2.5,
                    width: '100%',
                    borderRadius: '8px',
                    bgcolor: 'rgba(144, 202, 249, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(144, 202, 249, 0.15)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                    <Typography component="h3" sx={{ 
                      color: '#90caf9', 
                      fontWeight: 600,
                      fontSize: '0.95rem'
                    }}>
                      {project?.title}
                    </Typography>
                    <Typography 
                      component="time"
                      dateTime={project?.date}
                      sx={{ 
                        color: '#90caf9', 
                        opacity: 0.8,
                        fontSize: '0.8rem'
                      }}
                    >
                      {project?.date}
                    </Typography>
                  </Box>
                  <Typography sx={{ 
                    color: '#90caf9', 
                    opacity: 0.9, 
                    mb: 1,
                    fontSize: '0.85rem'
                  }}>
                    {project?.company}
                  </Typography>
                  <Typography sx={{ 
                    mb: 2,
                    fontSize: '0.85rem'
                  }}>
                    {project?.description}
                  </Typography>
                  <Box 
                    component="ul"
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 1,
                      p: 0,
                      m: 0,
                      listStyle: 'none'
                    }}
                  >
                    {Array.isArray(project?.tags) && project.tags.map((tag: string) => (
                      <Box component="li" key={tag}>
                        <Chip
                          label={t(`projects.tags.${tag}`)}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(144, 202, 249, 0.1)',
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(144, 202, 249, 0.2)' },
                            fontSize: '0.75rem',
                            height: '24px'
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default CVContent;
