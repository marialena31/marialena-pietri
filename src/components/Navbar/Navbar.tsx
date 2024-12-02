import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  SelectChangeEvent,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.references'), href: '#references' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (href: string) => {
    // If href is just "#" or empty, scroll to top
    if (!href || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (isMobile) {
        setMobileOpen(false);
      }
      return;
    }

    // Otherwise, try to find and scroll to the section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (isMobile) {
        setMobileOpen(false);
      }
    }
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          button 
          key={item.href}
          onClick={() => scrollToSection(item.href)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              scrollToSection(item.href);
            }
          }}
          role="menuitem"
          tabIndex={0}
          aria-label={item.label}
        >
          <ListItemText 
            primary={item.label} 
            sx={{ color: 'white' }} 
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{
        backgroundColor: isScrolled 
          ? 'rgba(18, 18, 18, 0.85)' 
          : 'transparent',
        boxShadow: isScrolled 
          ? '0 4px 30px rgba(0, 0, 0, 0.1)' 
          : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        height: { xs: '70px', md: '80px' },
        borderBottom: isScrolled 
          ? '1px solid rgba(255, 255, 255, 0.1)' 
          : 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: isScrolled 
            ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)'
            : 'none',
          pointerEvents: 'none',
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between',
            minHeight: { xs: '70px', md: '80px' },
            padding: '0 !important'
          }}
        >
          <Link 
            to="/"
            style={{ 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center' 
            }}
          >
            <Box
              component="img"
              src="/images/logo.jpg"
              alt="Maria-Lena Pietri Logo"
              sx={{
                height: { xs: '40px', md: '50px' },
                cursor: 'pointer',
                filter: isScrolled ? 'brightness(1.1)' : 'none',
                transition: 'filter 0.3s ease',
              }}
            />
          </Link>

          {isMobile ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', gap: 1 }}>
                <Select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  size="small"
                  sx={{ 
                    minWidth: 100,
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      transition: 'border-color 0.3s ease'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main
                    },
                    '.MuiSvgIcon-root': {
                      color: 'white'
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {['en', 'fr', 'es'].map((lang) => (
                    <MenuItem 
                      key={lang} 
                      value={lang}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={`/images/flags/${lang === 'en' ? 'england' : lang === 'fr' ? 'france' : 'spain'}.png`}
                        alt={lang}
                        sx={{ width: 24, mr: 1 }}
                      />
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  variant="contained"
                  color="primary"
                  href="https://calendly.com/pietri-marialena/contact-30?month=2024-12"
                  target="_blank"
                  size="small"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                    '&:active': {
                      transform: 'translateY(1px)',
                    }
                  }}
                >
                  {t('nav.bookMeeting')}
                </Button>
                <IconButton
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ 
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(4px)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                  sx: {
                    width: 250,
                    backgroundColor: 'rgba(18, 18, 18, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, ml: 'auto' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    sx={{
                      color: 'white',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '0',
                        height: '2px',
                        bottom: '0',
                        left: '50%',
                        background: theme.palette.primary.main,
                        transition: 'all 0.3s ease-in-out',
                        transform: 'translateX(-50%)',
                      },
                      '&:hover': {
                        backgroundColor: 'transparent',
                        '&::after': {
                          width: '80%',
                        },
                      },
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 500,
                      px: 2
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                <Select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  size="small"
                  sx={{ 
                    minWidth: 100,
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      transition: 'border-color 0.3s ease'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main
                    },
                    '.MuiSvgIcon-root': {
                      color: 'white'
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {['en', 'fr', 'es'].map((lang) => (
                    <MenuItem 
                      key={lang} 
                      value={lang}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={`/images/flags/${lang === 'en' ? 'england' : lang === 'fr' ? 'france' : 'spain'}.png`}
                        alt={lang}
                        sx={{ width: 24, mr: 1 }}
                      />
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  variant="contained"
                  color="primary"
                  href="https://calendly.com/pietri-marialena/contact-30?month=2024-12"
                  target="_blank"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                    '&:active': {
                      transform: 'translateY(1px)',
                    }
                  }}
                >
                  {t('nav.bookMeeting')}
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
