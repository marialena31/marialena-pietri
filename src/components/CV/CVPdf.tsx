import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Box, Button } from '@mui/material';
import CVContent from './CVContent';

const CVPdf = () => {
  const generatePdf = async () => {
    const element = document.querySelector('[data-cv-content]');
    if (!element) {
      console.error('CV content not found');
      return;
    }

    try {
      // Wait for images and fonts to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#121212',
        windowWidth: 210 * 3.78, // Convert mm to px (1mm ≈ 3.78px)
        windowHeight: 297 * 3.78,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-cv-content]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.width = '210mm';
            clonedElement.style.height = 'auto';
            clonedElement.style.position = 'relative';
            clonedElement.style.opacity = '1';
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('CV-Maria-Lena-Pietri.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      p: 4
    }}>
      <Box
        data-cv-content
        sx={{
          width: '210mm',
          minHeight: '297mm',
          bgcolor: '#121212',
          position: 'relative',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          '@media print': {
            margin: 0,
            boxShadow: 'none',
            width: '210mm',
            height: '297mm',
          }
        }}
      >
        <CVContent />
      </Box>
      <Box sx={{ 
        position: 'fixed', 
        bottom: 20, 
        right: 20, 
        zIndex: 1000 
      }}>
        <Button
          variant="contained"
          onClick={generatePdf}
          sx={{
            backgroundColor: '#90caf9',
            color: '#121212',
            '&:hover': {
              backgroundColor: '#64b5f6'
            }
          }}
        >
          Download PDF
        </Button>
      </Box>
    </Box>
  );
};

export default CVPdf;
