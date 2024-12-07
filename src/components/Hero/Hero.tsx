import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Stack,
  CircularProgress,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CVContent from '../CV/CVContent';

const Hero = () => {
  const { t, i18n } = useTranslation('hero');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const cvRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleViewCV = async () => {
    try {
      setIsGenerating(true);
      const element = document.querySelector('#cv-container [data-cv-content]');
      if (!element) {
        console.error('CV content not found');
        return;
      }

      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#121212',
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-cv-content]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.width = '210mm';
            clonedElement.style.height = 'auto';
            clonedElement.style.position = 'relative';
            clonedElement.style.opacity = '1';
          }
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CV-Maria-Lena-Pietri-${i18n.language}.pdf`);
    } catch (error) {
      console.error('Error generating CV:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div 
        id="cv-container" 
        aria-hidden="true"
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          top: 0,
          width: '210mm',
          height: '297mm',
          background: '#121212',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <CVContent />
      </div>
      <Box
        component="section"
        id="hero"
        aria-labelledby="hero-title"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 12, md: 16 },
          pb: 8,
          background: theme.palette.mode === 'dark' 
            ? 'rgba(18, 18, 18, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          color: theme.palette.text.primary,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark'
              ? `radial-gradient(circle at 30% 40%, ${theme.palette.primary.dark}20, transparent 60%),
                 radial-gradient(circle at 70% 60%, ${theme.palette.secondary.dark}20, transparent 60%)`
              : `radial-gradient(circle at 30% 40%, ${theme.palette.primary.light}20, transparent 60%),
                 radial-gradient(circle at 70% 60%, ${theme.palette.secondary.light}20, transparent 60%)`,
            opacity: 0.8,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: 'left',
                  position: 'relative',
                }}
              >
                <Typography
                  variant="h1"
                  id="hero-title"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    textAlign: 'left',
                    mb: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: `0 0 20px ${theme.palette.primary.main}40`
                  }}
                >
                  {t('title')}
                </Typography>
                <Typography
                  variant="h2"
                  component="p"
                  sx={{
                    fontWeight: 400,
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                    textAlign: 'left',
                    mb: 4,
                    color: 'text.secondary',
                    maxWidth: '800px'
                  }}
                >
                  {t('subtitle')}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    mb: 4,
                    maxWidth: '600px',
                    mx: { xs: 'auto', md: 0 },
                    color: theme.palette.text.secondary,
                  }}
                >
                  {t('description')}
                </Typography>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  sx={{ 
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    mb: { xs: 4, md: 0 }
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<CalendarMonthIcon />}
                    onClick={handleViewCV}
                    disabled={isGenerating}
                    sx={{
                      minWidth: 200,
                      position: 'relative',
                    }}
                  >
                    {isGenerating ? (
                      <>
                        <CircularProgress
                          size={24}
                          sx={{
                            position: 'absolute',
                            left: '50%',
                            marginLeft: '-12px',
                            color: 'inherit'
                          }}
                        />
                        <span style={{ visibility: 'hidden' }}>{t('generatingCV')}</span>
                      </>
                    ) : (
                      t('downloadCV')
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<DescriptionIcon />}
                    href="#contact"
                    sx={{ minWidth: 200 }}
                  >
                    {t('contactMe')}
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  src="/images/profile.webp"
                  alt={t('profileImageAlt')}
                  loading="eager"
                  width={256}
                  height={256}
                  sx={{
                    width: 256,
                    height: 256,
                    position: 'relative',
                    borderRadius: '50%',
                    border: `4px solid ${theme.palette.primary.main}40`,
                    boxShadow: theme.shadows[8],
                    background: theme.palette.background.paper,
                    overflow: 'hidden',
                    mx: 'auto',
                    aspectRatio: '1',
                    minWidth: 256,
                    flexShrink: 0,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Hero;
