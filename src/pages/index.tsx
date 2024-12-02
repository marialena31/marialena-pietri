import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeadFC } from 'gatsby';
import Layout from '../components/Layout/Layout';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Services from '../components/Services/Services';
import Projects from '../components/Projects/Projects';
import References from '../components/References/References';
import Contact from '../components/Contact/Contact';
import { Box } from '@mui/material';
import '../i18n/config';

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Box component="div">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <References />
        <Contact />
      </Box>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <html lang="fr" />
    <title>Maria-Lena Pietri | Magento Developer & E-commerce Consultant</title>
    <meta name="description" content="Senior Magento Developer and E-commerce Consultant with expertise in custom development, performance optimization, and e-commerce strategy." />
    <meta name="keywords" content="Magento Developer, E-commerce Consultant, Adobe Commerce, Custom Module Development, Performance Optimization" />
    <meta property="og:title" content="Maria-Lena Pietri | Magento Developer & E-commerce Consultant" />
    <meta property="og:description" content="Senior Magento Developer and E-commerce Consultant with expertise in custom development, performance optimization, and e-commerce strategy." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Maria-Lena Pietri | Magento Developer & E-commerce Consultant" />
    <meta name="twitter:description" content="Senior Magento Developer and E-commerce Consultant with expertise in custom development, performance optimization, and e-commerce strategy." />
  </>
);
