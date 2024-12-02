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
            sx={{ color: isScrolled ? 'text.primary' : 'white' }} 
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        boxShadow: isScrolled ? 1 : 'none',
        transition: 'all 0.3s ease-in-out',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        height: { xs: '70px', md: '80px' }
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
                cursor: 'pointer'
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
                    color: isScrolled ? 'text.primary' : 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: isScrolled ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.5)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: isScrolled ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.7)'
                    },
                    '.MuiSvgIcon-root': {
                      color: isScrolled ? 'text.primary' : 'white'
                    }
                  }}
                >
                  {['en', 'fr', 'es'].map((lang) => (
                    <MenuItem key={lang} value={lang}>
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
                    backgroundColor: isScrolled ? theme.palette.primary.main : 'white',
                    color: isScrolled ? 'white' : theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: isScrolled ? theme.palette.primary.dark : 'rgba(255, 255, 255, 0.9)'
                    }
                  }}
                >
                  {t('nav.bookMeeting')}
                </Button>
                <IconButton
                  color={isScrolled ? "default" : "inherit"}
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ color: isScrolled ? 'text.primary' : 'white' }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
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
                      color: isScrolled ? 'text.primary' : 'white',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '0',
                        height: '2px',
                        bottom: '0',
                        left: '50%',
                        background: isScrolled ? theme.palette.primary.main : 'white',
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
                    color: isScrolled ? 'text.primary' : 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: isScrolled ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.5)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: isScrolled ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.7)'
                    },
                    '.MuiSvgIcon-root': {
                      color: isScrolled ? 'text.primary' : 'white'
                    }
                  }}
                >
                  {['en', 'fr', 'es'].map((lang) => (
                    <MenuItem key={lang} value={lang}>
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
                    backgroundColor: isScrolled ? theme.palette.primary.main : 'white',
                    color: isScrolled ? 'white' : theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: isScrolled ? theme.palette.primary.dark : 'rgba(255, 255, 255, 0.9)'
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
