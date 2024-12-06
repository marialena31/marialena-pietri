import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';
import './i18n';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface NavItem {
  label: string;
  href: string;
}

const Navbar = () => {
  const { t, i18n } = useTranslation('navbar');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState(i18n.language);
  
  // Ensure we get an array of NavItems
  const items = t('items', { returnObjects: true });
  const menuItems: NavItem[] = Array.isArray(items) ? items : [];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const scrollToSection = (href: string) => {
    if (!href || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (isMobile) {
        setMobileOpen(false);
      }
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (isMobile) {
        setMobileOpen(false);
      }
    }
  };

  const drawer = (
    <List sx={{ pt: 8 }}>
      {menuItems.map(({ label, href }) => (
        <ListItem
          key={href}
          onClick={() => setMobileOpen(false)}
          sx={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }
          }}
        >
          <Link
            to={href}
            style={{
              textDecoration: 'none',
              width: '100%',
              color: 'inherit'
            }}
          >
            <ListItemText
              primary={label}
              sx={{
                '.MuiListItemText-primary': {
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: 'white'
                }
              }}
            />
          </Link>
        </ListItem>
      ))}
      <ListItem
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          }
        }}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          href="https://calendly.com/pietri-marialena/contact-30"
          target="_blank"
          startIcon={<CalendarMonthIcon />}
          sx={{
            py: 1.5,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            }
          }}
        >
          {t('actions.bookMeeting')}
        </Button>
      </ListItem>
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControl variant="standard" sx={{ minWidth: 'unset' }}>
                  <Select
                    value={language}
                    onChange={handleLanguageChange}
                    id="language-select"
                    inputProps={{
                      'aria-label': t('language.select')
                    }}
                    sx={{
                      color: 'white',
                      '&:before': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:after': {
                        borderColor: theme.palette.primary.main,
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'white',
                      },
                    }}
                  >
                    <MenuItem value="en">{t('language.en')}</MenuItem>
                    <MenuItem value="fr">{t('language.fr')}</MenuItem>
                    <MenuItem value="es">{t('language.es')}</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  href="https://calendly.com/pietri-marialena/contact-30"
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
                  {t('actions.bookMeeting')}
                </Button>

                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => setMobileOpen(true)}
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{
                  sx: {
                    width: '100%',
                    maxWidth: '300px',
                    background: 'rgba(18, 18, 18, 0.95)',
                    backdropFilter: 'blur(10px)',
                  }
                }}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, ml: 'auto' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  component={Link}
                  to={item.href}
                  color="inherit"
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

              <FormControl variant="standard" sx={{ minWidth: 'unset' }}>
                <Select
                  value={language}
                  onChange={handleLanguageChange}
                  id="language-select"
                  inputProps={{
                    'aria-label': t('language.select')
                  }}
                  sx={{
                    color: 'white',
                    '&:before': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:after': {
                      borderColor: theme.palette.primary.main,
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                >
                  <MenuItem value="en">{t('language.en')}</MenuItem>
                  <MenuItem value="fr">{t('language.fr')}</MenuItem>
                  <MenuItem value="es">{t('language.es')}</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                href="https://calendly.com/pietri-marialena/contact-30"
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
                {t('actions.bookMeeting')}
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
