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
      const element = document.querySelector('[data-cv-content]');
      if (!element) {
        console.error('CV content not found');
        return;
      }

      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#121212',
        windowWidth: 210 * 3.78, // Convert mm to px (1mm ≈ 3.78px)
        windowHeight: 297 * 3.78,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-cv-content]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.width = '210mm';
            clonedElement.style.height = 'auto';
            clonedElement.style.position = 'relative';
            clonedElement.style.opacity = '1';
            
            const images = clonedElement.getElementsByTagName('img');
            Array.from(images).forEach(img => {
              img.style.opacity = '1';
              img.style.visibility = 'visible';
            });
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('CV-Maria-Lena-Pietri.pdf');
    } catch (error) {
      console.error('Error generating CV:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div id="cv-container" style={{ 
        position: 'absolute', 
        left: '-9999px', 
        top: 0,
        width: '210mm',
        height: '297mm',
        background: '#121212',
      }}>
        <CVContent />
      </div>
      <Box
        id="home"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 12, md: 16 },
          pb: 8,
          background: 'rgba(18, 18, 18, 0.95)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 30% 40%, ${theme.palette.primary.dark}20, transparent 60%),
                      radial-gradient(circle at 70% 60%, ${theme.palette.secondary.dark}20, transparent 60%)`,
            opacity: 0.8,
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main}20, transparent)`,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: 'left',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-20%',
                    left: '-10%',
                    width: '120%',
                    height: '140%',
                    background: `radial-gradient(ellipse at center, ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main}20 0%, transparent 70%)`,
                    opacity: 0.5,
                    zIndex: -1,
                    filter: 'blur(40px)',
                    animation: 'pulse 8s ease-in-out infinite',
                  },
                  '@keyframes pulse': {
                    '0%, 100%': {
                      transform: 'scale(1)',
                      opacity: 0.5,
                    },
                    '50%': {
                      transform: 'scale(1.05)',
                      opacity: 0.7,
                    },
                  },
                }}
              >
                <Typography
                  variant="h1"
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
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    mb: 4,
                    maxWidth: '600px',
                    mx: { xs: 'auto', md: 0 },
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {t('description')}
                </Typography>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                  sx={{ 
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<CalendarMonthIcon />}
                    href="https://calendly.com/marialena-pietri/30min"
                    target="_blank"
                    sx={{
                      textTransform: 'none',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      boxShadow: `0 0 20px ${theme.palette.primary.main}40`,
                      '&:hover': {
                        boxShadow: `0 0 30px ${theme.palette.primary.main}60`,
                      },
                    }}
                  >
                    {t('schedule')}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={isGenerating ? <CircularProgress size={20} color="primary" /> : <DescriptionIcon />}
                    onClick={handleViewCV}
                    disabled={isGenerating}
                    sx={{
                      textTransform: 'none',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        boxShadow: `0 0 20px ${theme.palette.primary.main}40`,
                      },
                    }}
                  >
                    {isGenerating ? t('generatingCV') : t('viewCV')}
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
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle at center, ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main}20 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                    opacity: 0.6,
                    animation: 'float 6s ease-in-out infinite',
                  },
                  '@keyframes float': {
                    '0%, 100%': {
                      transform: 'translate(-50%, -50%) scale(1)',
                    },
                    '50%': {
                      transform: 'translate(-50%, -50%) scale(1.1)',
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src="/images/profile.webp"
                  alt="Maria-Lena Pietri"
                  sx={{
                    width: 256,
                    height: 256,
                    position: 'relative',
                    borderRadius: '50%',
                    border: '4px solid rgba(144, 202, 249, 0.5)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    background: 'linear-gradient(145deg, rgba(25, 25, 25, 0.9), rgba(35, 35, 35, 0.9))',
                    overflow: 'hidden',
                    mx: 'auto',
                    aspectRatio: '1',
                    minWidth: 256,
                    flexShrink: 0
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
