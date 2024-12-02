import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSanitize } from '../../hooks/useSanitize';
import {
  Box,
  Container,
  Grid,
  Link,
  IconButton,
  Modal,
  Typography,
  useTheme,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const { t } = useTranslation('footer');
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const sanitize = useSanitize();

  const [modalContent, setModalContent] = useState<{
    title: string;
    content: string;
    open: boolean;
  }>({
    title: '',
    content: '',
    open: false,
  });

  const socialLinks = [
    {
      icon: <LinkedInIcon />,
      href: 'https://www.linkedin.com/in/maria-lena-pietri/',
      label: t('social.linkedin'),
    },
    {
      icon: <FacebookIcon />,
      href: 'https://www.facebook.com/marialena.pietri.consultante',
      label: t('social.facebook'),
    },
    {
      icon: <TwitterIcon />,
      href: 'https://x.com/mlpietri',
      label: t('social.twitter'),
    },
  ];

  const handleModalOpen = (type: 'legal' | 'terms' | 'privacy') => {
    let modalTitle = '';
    let modalContent = '';

    switch (type) {
      case 'legal':
        modalTitle = t('legal.title');
        const legalSections = [
          'identity',
          'publication',
          'hosting',
          'cookies',
          'cnil',
          'intellectual',
          'credits'
        ];
        
        modalContent = legalSections
          .map(section => 
            `${t(`legal.sections.${section}.title`)}\n${t(`legal.sections.${section}.content`)}`
          )
          .join('\n\n');
        break;

      case 'terms':
        modalTitle = t('terms.title');
        const servicesList = t('terms.services.list', { returnObjects: true }) as string[];
        const paymentMethods = t('terms.payment.methods', { returnObjects: true }) as string[];
        const liabilityList = t('terms.liability.list', { returnObjects: true }) as string[];
        
        modalContent = [
          `${t('terms.preamble.title')}\n${t('terms.preamble.content')}\n`,
          `${t('terms.provider.title')}\n${t('terms.provider.name')}\n${t('terms.provider.address')}\n${t('terms.provider.email')}\n`,
          `${t('terms.services.title')}\n${servicesList.join('\n')}\n`,
          `${t('terms.pricing.title')}\n${t('terms.pricing.content')}\n`,
          `${t('terms.payment.title')}\n${paymentMethods.join('\n')}\n`,
          `${t('terms.execution.title')}\n${t('terms.execution.content')}\n`,
          `${t('terms.withdrawal.title')}\n${t('terms.withdrawal.content')}\n`,
          `${t('terms.liability.title')}\n${liabilityList.join('\n')}\n`,
          `${t('terms.property.title')}\n${t('terms.property.content')}\n`,
          `${t('terms.disputes.title')}\n${t('terms.disputes.content')}`
        ].join('\n\n');
        break;

      case 'privacy':
        modalTitle = t('privacy.title');
        const purposes = t('privacy.collection.purposes', { returnObjects: true }) as string[];
        const rightsList = t('privacy.rights.list', { returnObjects: true }) as string[];
        
        modalContent = [
          `${t('privacy.collection.title')}\n${t('privacy.collection.description')}\n${purposes.join('\n')}\n`,
          `${t('privacy.legal_basis.title')}\n${t('privacy.legal_basis.content')}\n`,
          `${t('privacy.retention.title')}\n${t('privacy.retention.content')}\n`,
          `${t('privacy.sharing.title')}\n${t('privacy.sharing.content')}\n`,
          `${t('privacy.rights.title')}\n${rightsList.join('\n')}\n${t('privacy.rights.contact')}\n`,
          `${t('privacy.security.title')}\n${t('privacy.security.content')}`
        ].join('\n\n');
        break;
    }

    setModalContent({
      title: modalTitle,
      content: modalContent,
      open: true,
    });
  };

  const handleModalClose = () => {
    setModalContent(prev => ({ ...prev, open: false }));
  };

  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '80%', md: '60%' },
    bgcolor: 'rgba(18, 18, 18, 0.95)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    backdropFilter: 'blur(8px)',
    p: 4,
    maxHeight: '90vh',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '4px',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.4)',
      },
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: 'rgba(18, 18, 18, 0.95)',
        color: 'white',
        position: 'relative',
        backdropFilter: 'blur(8px)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main}00 0%, ${theme.palette.primary.main}40 50%, ${theme.palette.primary.main}00 100%)`,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.dark}15 0%, transparent 60%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.dark}15 0%, transparent 60%)`,
          opacity: 0.4,
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 300,
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              {t('copyright')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: { xs: 'center', sm: 'flex-end' }, 
              gap: 3,
              alignItems: 'center'
            }}>
              {socialLinks.map((link, index) => (
                <IconButton
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    padding: '8px',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateY(-2px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                    '& svg': {
                      fontSize: '1.5rem',
                    }
                  }}
                >
                  {link.icon}
                </IconButton>
              ))}
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                '& > button': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontSize: '0.875rem',
                  fontWeight: 300,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 12px',
                  borderRadius: '8px',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0',
                    height: '2px',
                    bottom: '-2px',
                    left: '50%',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateX(-50%)',
                    opacity: 0,
                  },
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    '&::after': {
                      width: '80%',
                      opacity: 1,
                    },
                  },
                }
              }}>
                <button onClick={() => handleModalOpen('legal')}>
                  {t('links.legal')}
                </button>
                <button onClick={() => handleModalOpen('terms')}>
                  {t('links.terms')}
                </button>
                <button onClick={() => handleModalOpen('privacy')}>
                  {t('links.privacy')}
                </button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Modal
        open={modalContent.open}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
      >
        <Box sx={{
          ...modalStyle,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }
        }}>
          <Typography
            id="modal-title"
            variant="h5"
            component="h2"
            sx={{
              mb: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 600,
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              pb: 2
            }}
          >
            {modalContent.title}
          </Typography>
          <Typography
            id="modal-description"
            sx={{
              whiteSpace: 'pre-wrap',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              letterSpacing: '0.3px',
              '& strong': {
                color: theme.palette.primary.light,
                fontWeight: 500
              }
            }}
          >
            {sanitize(modalContent.content)}
          </Typography>
          <Box sx={{ 
            mt: 4, 
            display: 'flex', 
            justifyContent: 'flex-end' 
          }}>
            <button
              onClick={handleModalClose}
              style={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}40, ${theme.palette.secondary.main}40)`,
                border: `1px solid ${theme.palette.primary.main}40`,
                color: 'white',
                padding: '10px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${theme.palette.primary.main}60, ${theme.palette.secondary.main}60)`;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${theme.palette.primary.main}20`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${theme.palette.primary.main}40, ${theme.palette.secondary.main}40)`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {t('common.close')}
            </button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Footer;
