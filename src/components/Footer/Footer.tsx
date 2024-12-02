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
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const { t } = useTranslation();
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
      label: 'LinkedIn',
    },
    {
      icon: <FacebookIcon />,
      href: 'https://www.facebook.com/marialena.pietri.consultante',
      label: 'Facebook',
    },
    {
      icon: <TwitterIcon />,
      href: 'https://x.com/mlpietri',
      label: 'Twitter',
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
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflow: 'auto',
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#000',
        color: 'white',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((link) => (
                <IconButton
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link
                component="button"
                onClick={() => handleModalOpen('legal')}
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0',
                    height: '2px',
                    bottom: '0',
                    left: '50%',
                    background: 'white',
                    transition: 'all 0.3s ease-in-out',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    '&::after': {
                      width: '80%',
                    },
                  },
                }}
              >
                {t('footer.legal')}
              </Link>
              <Link
                component="button"
                onClick={() => handleModalOpen('terms')}
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0',
                    height: '2px',
                    bottom: '0',
                    left: '50%',
                    background: 'white',
                    transition: 'all 0.3s ease-in-out',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    '&::after': {
                      width: '80%',
                    },
                  },
                }}
              >
                {t('footer.terms')}
              </Link>
              <Link
                component="button"
                onClick={() => handleModalOpen('privacy')}
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0',
                    height: '2px',
                    bottom: '0',
                    left: '50%',
                    background: 'white',
                    transition: 'all 0.3s ease-in-out',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    '&::after': {
                      width: '80%',
                    },
                  },
                }}
              >
                {t('footer.privacy')}
              </Link>
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="white">
              {t('footer.copyright')} {currentYear}
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Modal
        open={modalContent.open}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            {modalContent.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              fontSize: '0.875rem',
            }}
            dangerouslySetInnerHTML={{
              __html: sanitize(modalContent.content.replace(/\n/g, '<br />'))
            }}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              component="button"
              onClick={handleModalClose}
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {t('common.close')}
            </Link>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Footer;
