import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({
    show: false,
    severity: 'success',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = formRef.current;
    if (!form) return;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      setAlert({
        show: true,
        severity: 'error',
        message: t('contact.error.required'),
      });
      return;
    }

    setLoading(true);

    try {
      const result = await emailjs.sendForm(
        process.env.GATSBY_EMAILJS_SERVICE_ID!,
        process.env.GATSBY_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.GATSBY_EMAILJS_PUBLIC_KEY!
      );

      if (result.text === 'OK') {
        setAlert({
          show: true,
          severity: 'success',
          message: t('contact.success'),
        });
        form.reset();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setAlert({
        show: true,
        severity: 'error',
        message: t('contact.error.general'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {t('contact.title')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('contact.description')}
        </Typography>

        <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label={t('contact.form.name')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label={t('contact.form.email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="subject"
                name="subject"
                label={t('contact.form.subject')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                id="message"
                name="message"
                label={t('contact.form.message')}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                endIcon={<SendIcon />}
                sx={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? t('contact.form.sending') : t('contact.form.submit')}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {alert.show && (
          <Alert
            severity={alert.severity}
            sx={{ mt: 3 }}
            onClose={() => setAlert({ ...alert, show: false })}
          >
            {alert.message}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default ContactForm;
