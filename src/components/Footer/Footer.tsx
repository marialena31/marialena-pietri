import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import {
  Box,
  Container,
  Grid,
  Link,
  IconButton,
  Typography,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LegalModal from './LegalModal';

interface FooterItem {
  title: string;
  link: string;
}

interface SocialItem extends FooterItem {
  icon: string;
}

const Footer = () => {
  const { t, i18n } = useTranslation('footer');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'legal' | 'privacy' | 'terms'>('legal');

  useEffect(() => {
    // Initialize i18n if not already initialized
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, [i18n]);

  const items = t('items', { returnObjects: true }) as FooterItem[] || [];
  const socialItems = t('social', { returnObjects: true }) as SocialItem[] || [];

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'linkedin':
        return <LinkedInIcon />;
      case 'github':
        return <GitHubIcon />;
      case 'twitter':
        return <TwitterIcon />;
      case 'facebook':
        return <FacebookIcon />;
      default:
        return null;
    }
  };

  const handleLinkClick = (link: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const type = link.replace('#', '') as 'legal' | 'privacy' | 'terms';
    setModalType(type);
    setModalOpen(true);
    console.log('Opening modal:', type);
  };

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        padding: '2rem',
        backgroundColor: 'background.paper',
        color: 'text.secondary',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center">
          {/* Legal Links */}
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {Array.isArray(items) && items.map((item, index) => (
              <Link
                key={index}
                component="button"
                underline="none"
                onClick={(e) => handleLinkClick(item.link, e)}
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  font: 'inherit',
                  textDecoration: 'none !important',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transform: 'translateY(-1px)',
                    textDecoration: 'none !important',
                  },
                }}
              >
                {item.title}
              </Link>
            ))}
          </Stack>

          {/* Social Icons and Copyright */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {Array.isArray(socialItems) && socialItems.map((item, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {getSocialIcon(item.icon)}
                </IconButton>
              ))}
            </Stack>

            <Typography
              variant="body2"
              align="center"
              sx={{
                opacity: 0.7,
                fontSize: '0.875rem',
              }}
            >
              &copy;{t('copyright')}
            </Typography>
          </Stack>
        </Stack>
      </Container>

      <LegalModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </Box>
  );
};

export default Footer;
