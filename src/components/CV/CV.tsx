import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';
import {
  Box,
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CV = () => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'fr');
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang) {
      setSelectedLanguage(savedLang);
      i18n.changeLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = async (event: any) => {
    const newLang = event.target.value;
    try {
      await i18n.changeLanguage(newLang);
      localStorage.setItem('i18nextLng', newLang);
      setSelectedLanguage(newLang);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const generatePDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      // Ensure language is fully loaded before generating PDF
      await i18n.changeLanguage(selectedLanguage);

      // Check if we have all required translations
      const requiredTranslations = [
        'cv.title',
        'cv.description',
        'cv.download.generating',
        'cv.download.button',
        'cv.download.error',
        'cv.sections.contact',
        'cv.sections.skills',
        'cv.sections.languages',
        'cv.sections.aboutMe',
        'cv.about.whoAmI.content',
        'cv.contact.email',
        'cv.contact.phone',
        'cv.contact.address.line1',
        'cv.contact.address.line2',
        'cv.contact.address.country',
        'cv.contact.linkedin'
      ];

      const missingTranslations = requiredTranslations.filter(key => !t(key));
      if (missingTranslations.length > 0) {
        throw new Error(`Missing translations: ${missingTranslations.join(', ')}`);
      }
      
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const colors = {
        primary: '#4A90E2',    // Blue accent
        secondary: '#757575',  // Gray text
        background: '#F5F5F5', // Light gray background
        text: '#333333',       // Dark text
        white: '#FFFFFF',      // White
        lightGray: '#FAFAFA'   // Very light gray
      };

      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Left sidebar background
      doc.setFillColor(colors.primary);
      doc.rect(0, 0, 70, pageHeight, 'F');

      // Main content area with diagonal cut
      doc.setFillColor(colors.lightGray);
      const points = [
        [70, 0],
        [pageWidth, 0],
        [pageWidth, pageHeight],
        [70, pageHeight],
        [70, 0]
      ];
      doc.setLineWidth(0);
      doc.lines(points, points[0][0], points[0][1]);

      // Add diagonal cut
      doc.setFillColor(colors.white);
      const diagonalPoints = [
        [70, 0],
        [120, 0],
        [70, 50],
        [70, 0]
      ];
      doc.lines(diagonalPoints, diagonalPoints[0][0], diagonalPoints[0][1], null, 'F');

      // Profile photo with circular mask
      try {
        const img = new Image();
        img.src = '/images/profile.webp';
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const size = Math.min(img.width, img.height);
            canvas.width = size;
            canvas.height = size;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Could not get canvas context'));
              return;
            }

            // Fill with sidebar color background
            ctx.fillStyle = colors.primary; // Using the same blue as sidebar
            ctx.fillRect(0, 0, size, size);

            // Create circular mask
            ctx.beginPath();
            ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.clip();

            // Calculate dimensions to maintain aspect ratio
            const scale = size / Math.min(img.width, img.height);
            const x = (size - img.width * scale) / 2;
            const y = (size - img.height * scale) / 2;

            // Draw the image centered
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            
            // Convert to JPEG data URL and add to PDF
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            doc.addImage(imgData, 'JPEG', 15, 15, 40, 40);
            resolve(true);
          };
          img.onerror = (e) => reject(new Error('Failed to load image: ' + e));
          setTimeout(() => reject(new Error('Image load timeout')), 5000);
        });
      } catch (error) {
        console.warn('Could not load profile image:', error);
      }

      // Name and title
      doc.setTextColor(colors.white);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      
      const name = t('cv.title');
      const nameWidth = (doc.getStringUnitWidth(name) * 18) / doc.internal.scaleFactor;
      const nameX = 35 - (nameWidth / 2);
      doc.text(name, nameX, 70);

      doc.setFontSize(14);
      const title = t('cv.description');
      const titleWidth = (doc.getStringUnitWidth(title) * 14) / doc.internal.scaleFactor;
      const titleX = 35 - (titleWidth / 2);
      doc.text(title, titleX, 80);

      // Contact information in sidebar
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const contactInfo = [
        { label: t('cv.sections.contact'), value: '' },
        { label: t('cv.contact.email'), value: 'pietri.marialena@gmail.com' },
        { label: t('cv.contact.phone'), value: '+33 6 59 87 61 28' },
        { label: t('cv.contact.address.line1'), value: '6 rue Léon Jouhaux' },
        { label: t('cv.contact.address.line2'), value: '75010 Paris' },
        { label: t('cv.contact.address.country'), value: 'France' },
        { label: t('cv.contact.linkedin'), value: 'linkedin.com/in/maria-lena-pietri/' }
      ];

      let yPos = 100;
      contactInfo.forEach((item, index) => {
        if (index === 0) {
          doc.setFont('helvetica', 'bold');
        } else {
          doc.setFont('helvetica', 'normal');
        }
        doc.text(item.label, 10, yPos);
        if (item.value) {
          yPos += 5;
          doc.text(item.value, 10, yPos);
          yPos += 10;
        } else {
          yPos += 8;
        }
      });

      // Skills section in sidebar
      yPos += 10;
      doc.setFont('helvetica', 'bold');
      doc.text(t('cv.sections.skills'), 10, yPos);
      yPos += 8;
      doc.setFont('helvetica', 'normal');

      const skills = [
        'Magento 2.x',
        'Adobe Commerce Cloud',
        'PHP',
        'JavaScript',
        'React',
        'Git',
        'Docker',
        'AWS'
      ];

      skills.forEach(skill => {
        doc.text('• ' + skill, 10, yPos);
        yPos += 6;
      });

      // Languages section in sidebar
      yPos += 10;
      doc.setFont('helvetica', 'bold');
      doc.text(t('cv.sections.languages'), 10, yPos);
      yPos += 8;
      doc.setFont('helvetica', 'normal');

      const languages = [
        { lang: 'Français', level: 'Natif' },
        { lang: 'English', level: 'Professional' },
        { lang: 'Español', level: 'Intermedio' }
      ];

      languages.forEach(lang => {
        doc.text(`${lang.lang} - ${lang.level}`, 10, yPos);
        yPos += 6;
      });

      // About Me section in main content
      doc.setTextColor(colors.text);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(t('cv.sections.aboutMe'), 80, 70);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const aboutMe = t('cv.about.whoAmI.content');
      const splitAboutMe = doc.splitTextToSize(aboutMe, pageWidth - 90);
      doc.text(splitAboutMe, 80, 80);

      // Save the PDF
      doc.save(`CV_Maria-Lena_Pietri_${selectedLanguage.toUpperCase()}.pdf`);
      setError(null);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError(err instanceof Error ? err.message : 'Error generating PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          {t('cv.title')}
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          {t('cv.description')}
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="language-select-label">{t('cv.languageSelector')}</InputLabel>
          <Select
            labelId="language-select-label"
            value={selectedLanguage}
            label={t('cv.languageSelector')}
            onChange={handleLanguageChange}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
            <MenuItem value="es">Español</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          startIcon={<PdfIcon />}
          onClick={generatePDF}
          disabled={isGenerating}
          sx={{ minWidth: 200 }}
        >
          {isGenerating ? t('cv.generatingButton') : t('cv.downloadButton')}
        </Button>
      </Box>

      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CV;
