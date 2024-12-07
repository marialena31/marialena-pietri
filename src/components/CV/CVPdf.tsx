import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Box, Button, CircularProgress } from '@mui/material';
import CVContent from './CVContent';

const CVPdf = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdf = async () => {
    const element = document.querySelector('[data-cv-content]');
    if (!element) {
      console.error('CV content not found');
      return;
    }

    setIsGenerating(true);

    try {
      // Wait for all images to load
      const images = element.getElementsByTagName('img');
      await Promise.all(
        Array.from(images).map(
          img =>
            new Promise((resolve, reject) => {
              if (img.complete) {
                resolve(null);
              } else {
                img.onload = () => resolve(null);
                img.onerror = reject;
              }
            })
        )
      );

      // Additional wait for fonts and dynamic content
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#121212',
        windowWidth: 210 * 3.78, // Convert mm to px (1mm ≈ 3.78px)
        windowHeight: 297 * 3.78,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-cv-content]') as HTMLElement;
          if (clonedElement) {
            // Ensure all images have explicit dimensions
            const clonedImages = clonedElement.getElementsByTagName('img');
            Array.from(clonedImages).forEach(img => {
              img.style.width = img.getAttribute('width') || '24px';
              img.style.height = img.getAttribute('height') || '24px';
            });

            clonedElement.style.transform = 'none';
            clonedElement.style.width = '210mm';
            clonedElement.style.height = 'auto';
            clonedElement.style.position = 'relative';
            clonedElement.style.opacity = '1';
          }
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
      pdf.save('CV-Maria-Lena-Pietri.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box 
      component="main"
      role="main"
      sx={{ 
        width: '100%', 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        p: 4
      }}
    >
      <Box
        data-cv-content
        component="article"
        role="article"
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
          disabled={isGenerating}
          aria-label={isGenerating ? "Generating PDF..." : "Download CV as PDF"}
          sx={{
            backgroundColor: '#90caf9',
            color: '#121212',
            '&:hover': {
              backgroundColor: '#64b5f6'
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(144, 202, 249, 0.5)'
            }
          }}
        >
          {isGenerating ? (
            <>
              <CircularProgress
                size={20}
                sx={{
                  color: '#121212',
                  mr: 1
                }}
                aria-hidden="true"
              />
              Generating...
            </>
          ) : (
            'Download PDF'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default CVPdf;
