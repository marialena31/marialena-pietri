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
  const { t } = useTranslation('footer');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (open) {
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const renderContent = () => {
    const modalData = t(`${type}`, { returnObjects: true });

    if (!modalData || typeof modalData !== 'object') {
      return <Typography>Content not available</Typography>;
    }

    return (
      <>
        <Typography variant="h5" component="div" gutterBottom>
          {modalData.title}
        </Typography>
        
        {/* Handle sections if they exist */}
        {modalData.sections && typeof modalData.sections === 'object' && (
          Object.entries(modalData.sections).map(([key, section]: [string, any]) => (
            <Box key={key} sx={{ mb: 3 }}>
              <Typography variant="h6" component="div" gutterBottom>
                {section.title}
              </Typography>
              <Typography component="div" paragraph>
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
              {section.title && (
                <Typography variant="h6" component="div" gutterBottom>
                  {section.title}
                </Typography>
              )}

              {section.content && (
                <Typography component="div" paragraph>
                  {section.content}
                </Typography>
              )}

              {section.description && (
                <Typography component="div" paragraph>
                  {section.description}
                </Typography>
              )}

              {(section.list || section.purposes || section.methods) && (
                <List>
                  {(section.list || section.purposes || section.methods)?.map((item: string, index: number) => (
                    <ListItem key={index}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              )}

              {section.contact && (
                <Typography component="div" paragraph sx={{ mt: 1 }}>
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
      aria-labelledby="legal-modal-title"
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
        id="legal-modal-title"
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" component="div">
          {t(`${type}.title`)}
        </Typography>
        <IconButton
          ref={closeButtonRef}
          aria-label={t('common.close')}
          onClick={onClose}
          sx={{
            color: 'text.primary',
            '&:hover': {
              color: 'primary.main',
            },
            '&:focus': {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: '2px',
            },
            '&:focus:not(:focus-visible)': {
              outline: 'none',
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
            '&:focus': {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: '2px',
            },
            '&:focus:not(:focus-visible)': {
              outline: 'none',
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
