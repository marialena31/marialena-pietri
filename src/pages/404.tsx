import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout/Layout';
import { Box, Container, Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            {t('404.title')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {t('404.description')}
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            size="large"
          >
            {t('404.backHome')}
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => (
  <>
    <title>404: Page Not Found | Maria-Lena Pietri</title>
    <meta name="description" content="Page not found" />
  </>
);
