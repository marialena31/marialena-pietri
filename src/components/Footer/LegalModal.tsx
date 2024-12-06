import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface LegalModalProps {
  open: boolean;
  onClose: () => void;
  type: 'legal' | 'privacy' | 'terms';
}

const LegalModal: React.FC<LegalModalProps> = ({ open, onClose, type }) => {
  const { t, i18n } = useTranslation('footer');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const renderContent = () => {
    console.log('Rendering modal type:', type);
    const modalData = t(`${type}`, { returnObjects: true });
    console.log('Modal data:', modalData);

    if (!modalData || typeof modalData !== 'object') {
      console.error('Invalid modal data:', modalData);
      return <Typography>Content not available</Typography>;
    }

    return (
      <>
        <Typography variant="h5" component="h2" gutterBottom>
          {modalData.title}
        </Typography>
        
        {/* Handle sections if they exist */}
        {modalData.sections && typeof modalData.sections === 'object' && (
          Object.entries(modalData.sections).map(([key, section]: [string, any]) => (
            <Box key={key} sx={{ mb: 3 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                {section.title}
              </Typography>
              <Typography paragraph>
                {section.content}
              </Typography>
            </Box>
          ))
        )}

        {/* Handle direct content if no sections */}
        {!modalData.sections && Object.entries(modalData).map(([key, section]: [string, any]) => {
          if (key === 'title') return null;
          if (typeof section !== 'object') return null;

          return (
            <Box key={key} sx={{ mb: 3 }}>
              {/* Section Title */}
              {section.title && (
                <Typography variant="h6" component="h3" gutterBottom>
                  {section.title}
                </Typography>
              )}

              {/* Section Content */}
              {section.content && (
                <Typography paragraph>
                  {section.content}
                </Typography>
              )}

              {/* Section Description */}
              {section.description && (
                <Typography paragraph>
                  {section.description}
                </Typography>
              )}

              {/* Handle different types of lists */}
              {(section.list || section.purposes || section.methods) && (
                <List>
                  {(section.list || section.purposes || section.methods)?.map((item: string, index: number) => (
                    <ListItem key={index}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              )}

              {/* Special handling for contact info */}
              {section.contact && (
                <Typography paragraph sx={{ mt: 1 }}>
                  {section.contact}
                </Typography>
              )}
            </Box>
          );
        })}
      </>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          boxShadow: 24,
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" component="h2">
          {t(`${type}.title`)}
        </Typography>
        <IconButton
          aria-label={t('common.close')}
          onClick={onClose}
          sx={{
            color: 'text.primary',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {renderContent()}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          {t('common.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LegalModal;
