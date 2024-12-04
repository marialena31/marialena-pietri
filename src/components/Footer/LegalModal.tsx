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
    const content = t(`${type}.sections`, { returnObjects: true });
    console.log('Modal content:', content);

    if (!content || typeof content !== 'object') {
      console.error('Invalid content structure:', content);
      return <Typography>Content not available</Typography>;
    }

    return Object.entries(content).map(([key, section]: [string, any]) => (
      <Box key={key} sx={{ mb: 3 }}>
        <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
          {section.title}
        </Typography>
        <Typography paragraph>
          {section.content}
        </Typography>
        {section.list && Array.isArray(section.list) && (
          <List>
            {section.list.map((item: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        )}
        <Divider sx={{ mt: 2 }} />
      </Box>
    ));
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
