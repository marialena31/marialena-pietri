import React from 'react';
import CVPdf from '../components/CV/CVPdf';
import Layout from '../components/Layout/Layout';
import { Box } from '@mui/material';

const CVPage = () => {
  return (
    <Layout>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        py: 4,
      }}>
        <CVPdf />
      </Box>
    </Layout>
  );
};

export default CVPage;
