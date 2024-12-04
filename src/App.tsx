import React from 'react';
import { Box } from '@mui/material';
import './i18n';  // Import root i18n configuration

import Layout from './components/Layout/Layout';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import References from './components/References/References';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Layout>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <References />
        <Contact />
      </Box>
      <Footer />
    </Layout>
  );
}

export default App;
