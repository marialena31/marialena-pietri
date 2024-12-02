import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
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
        'hero.title',
        'hero.subtitle',
        'resume.sections.contact',
        'resume.sections.skills',
        'resume.sections.languages',
        'resume.sections.aboutMe',
        'about.whoAmI.content',
        'contact.email',
        'contact.phone',
        'contact.address.line1',
        'contact.address.line2',
        'contact.address.country',
        'contact.linkedin'
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

      // Name and title (centered in sidebar, adjusted spacing)
      doc.setTextColor(colors.white);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      
      const name = t('hero.title');
      const nameWidth = doc.getTextWidth(name);
      doc.text(name, 35 - (nameWidth/2), 80); // Moved down slightly

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const titleLines = doc.splitTextToSize(t('hero.subtitle'), 60);
      titleLines.forEach((line: string, index: number) => {
        const lineWidth = doc.getTextWidth(line);
        doc.text(line, 35 - (lineWidth/2), 87 + (index * 5));
      });

      // Contact section (without icons)
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(t('resume.sections.contact'), 10, 110);

      const email = t('contact.email', 'contact@marialena-pietri.fr');
      const phone = t('contact.phone', '+33 07 61 81 11 01');
      const addressLine1 = t('contact.address.line1', '30 allée de la Gâtine');
      const addressLine2 = t('contact.address.line2', '31770 Colomiers');
      const country = t('contact.address.country', 'France');
      const linkedin = t('contact.linkedin', 'linkedin.com/in/marialena-pietri');

      const contactInfo = [
        email,
        phone,
        addressLine1,
        `${addressLine2}, ${country}`,
        linkedin
      ];

      doc.setFontSize(8);
      contactInfo.forEach((info, index) => {
        const y = 120 + (index * 6);
        doc.text(info, 10, y);
      });

      // Skills section (without bullet points)
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(t('resume.sections.skills'), 10, 160);

      // Get translated skills and ensure it's an array
      const skillsList = t('resume.skills.list', { returnObjects: true });
      const skills = Array.isArray(skillsList) ? skillsList : [];
      let skillsY = 170;

      doc.setFontSize(8);
      skills.forEach((skill, index) => {
        const y = skillsY + (index * 6);
        doc.text(skill, 10, y);
      });

      // Languages with modern progress bars
      doc.setFont('helvetica', 'bold');
      doc.text(t('resume.sections.languages'), 10, pageHeight - 40);

      const languages = t('resume.languages.list', { returnObjects: true });
      const languagesArray = Array.isArray(languages) ? languages : [];
      let langY = pageHeight - 30;

      languagesArray.forEach((lang: any) => {
        if (!lang || typeof lang !== 'object') return;
        
        doc.setFontSize(8);
        doc.text(lang.language || '', 10, langY);

        // Modern progress bar
        const barWidth = 50;
        const barHeight = 3;
        
        // Background
        doc.setFillColor('#E0E0E0');
        doc.roundedRect(10, langY + 2, barWidth, barHeight, 1, 1, 'F');
        
        // Progress based on proficiency value
        const progress = (lang.proficiency || 0) / 100;
        
        doc.setFillColor(colors.white);
        doc.roundedRect(10, langY + 2, barWidth * progress, barHeight, 1, 1, 'F');

        langY += 10;
      });

      // About Me section
      doc.setTextColor(colors.text);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(t('resume.sections.aboutMe'), 80, 25);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const aboutText = t('about.whoAmI.content')
        .replace(/<\/?[^>]+(>|$)/g, '')
        .split('.')
        .filter(sentence => sentence.trim())
        .map(sentence => sentence.trim() + '.');
      
      let aboutY = 35;
      aboutText.forEach((sentence, index) => {
        const lines = doc.splitTextToSize(sentence, pageWidth - 100);
        doc.text(lines, 80, aboutY);
        aboutY += lines.length * 4 + 2;
      });

      // Add extra space after About section
      aboutY += 10;

      // Experience section with increased spacing
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(t('resume.sections.experience'), 80, aboutY + 5);

      let yPos = aboutY + 15;
      
      const projects = [
        { key: 'eram', period: '2024' },
        { key: 'whisky', period: '2024' },
        { key: 'marjane', period: '2023' },
        { key: 'valrhona', period: '2018' },
        { key: 'legrand', period: '2016 - 2019' },
        { key: 'chausson', period: '2010 - 2014' }
      ];

      projects.forEach((project) => {
        // Timeline dot
        doc.setFillColor(colors.primary);
        doc.circle(75, yPos - 1, 1, 'F');
        
        // Vertical timeline line
        if (yPos < pageHeight - 30) {
          doc.setDrawColor(colors.primary);
          doc.setLineWidth(0.5);
          doc.line(75, yPos + 2, 75, yPos + 15); // Extended line
        }

        // Company and role
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(t(`portfolio.projects.${project.key}.title`), 80, yPos);
        
        // Period
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(colors.secondary);
        const periodWidth = doc.getTextWidth(project.period);
        doc.text(project.period, pageWidth - 20 - periodWidth, yPos);

        // Description
        doc.setTextColor(colors.text);
        const description = doc.splitTextToSize(
          t(`portfolio.projects.${project.key}.projet`).replace(/<\/?[^>]+(>|$)/g, ''),
          pageWidth - 100
        );
        doc.text(description, 80, yPos + 5);

        yPos += Math.max(20, description.length * 4 + 10); // Increased spacing between experiences
      });

      // Save the PDF
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}`;
      doc.save(`CV_Maria-Lena_Pietri_${selectedLanguage}_${formattedDate}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(error instanceof Error ? error.message : 'Error generating PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        p: 4,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 3,
          }}
        >
          {t('cv.title')}
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          justifyContent: 'center', 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <FormControl sx={{ minWidth: 200 }}>
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
            size="large"
            onClick={generatePDF}
            disabled={isGenerating}
            startIcon={isGenerating ? <CircularProgress size={20} /> : <PdfIcon />}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              letterSpacing: 0.5,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                transform: 'translateY(-1px)',
              }
            }}
          >
            {isGenerating ? t('cv.generatingButton') : t('cv.downloadButton')}
          </Button>
        </Box>
      </Box>
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CV;
