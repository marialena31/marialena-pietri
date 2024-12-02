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
  useTheme,
  CircularProgress,
} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';
import SendIcon from '@mui/icons-material/Send';
import DOMPurify from 'dompurify';

const Contact = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const recaptchaSiteKey = process.env.GATSBY_RECAPTCHA_SITE_KEY;
  const [loading, setLoading] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [alert, setAlert] = useState<{
    show: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({
    show: false,
    severity: 'success',
    message: '',
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  const sanitizeInput = (input: string) => {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.value = sanitizeInput(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setMessageLength(value.length);
      e.target.value = sanitizeInput(value);
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    let isValid = true;

    const form = formRef.current;
    if (!form) return false;

    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();

    if (!name) {
      newErrors.name = t('contact.validation.nameRequired');
      isValid = false;
    }

    if (!email) {
      newErrors.email = t('contact.validation.emailRequired');
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = t('contact.validation.emailInvalid');
      isValid = false;
    }

    if (!subject) {
      newErrors.subject = t('contact.validation.subjectRequired');
      isValid = false;
    }

    if (!message) {
      newErrors.message = t('contact.validation.messageRequired');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const executeRecaptcha = async (): Promise<boolean> => {
    // If recaptcha is not configured, skip validation
    if (!recaptchaSiteKey) {
      return true;
    }

    try {
      const recaptcha = recaptchaRef.current;
      if (!recaptcha) {
        console.warn('reCAPTCHA component not mounted');
        return true;
      }

      const token = await recaptcha.executeAsync();
      if (!token) {
        throw new Error('reCAPTCHA validation failed');
      }
      return true;
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      setAlert({
        show: true,
        severity: 'error',
        message: t('contact.error.general'),
      });
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setAlert({ show: false, severity: 'success', message: '' });

    try {
      const recaptchaValid = await executeRecaptcha();
      if (!recaptchaValid) {
        setLoading(false);
        return;
      }

      // Sanitize form data
      const formData = new FormData(formRef.current!);
      const sanitizedData = new FormData();
      formData.forEach((value, key) => {
        if (typeof value === 'string') {
          sanitizedData.append(key, sanitizeInput(value));
        }
      });

      if (formRef.current) {
        const result = await emailjs.sendForm(
          process.env.GATSBY_EMAILJS_SERVICE_ID || '',
          process.env.GATSBY_EMAILJS_TEMPLATE_ID || '',
          formRef.current as HTMLFormElement,
          process.env.GATSBY_EMAILJS_PUBLIC_KEY || ''
        );

        if (result.text === 'OK') {
          setAlert({
            show: true,
            severity: 'success',
            message: t('contact.success'),
          });
          // Reset form and reCAPTCHA
          formRef.current?.reset();
          recaptchaRef.current?.reset();
          setMessageLength(0);
          setErrors({});
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setAlert({
        show: true,
        severity: 'error',
        message: t('contact.error'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 8,
        backgroundColor: theme.palette.grey[50],
        borderTop: `1px solid ${theme.palette.grey[100]}`,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ mb: 2 }}
        >
          {t('contact.title')}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          sx={{ mb: 6 }}
        >
          {t('contact.description')}
        </Typography>

        <Paper elevation={3} sx={{ p: 4 }}>
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label={t('contact.form.name')}
                  variant="outlined"
                  onChange={(e) => {
                    handleInputChange(e);
                    setErrors({ ...errors, name: undefined });
                  }}
                  error={!!errors.name}
                  helperText={errors.name}
                  inputProps={{
                    maxLength: 50
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label={t('contact.form.email')}
                  type="email"
                  variant="outlined"
                  onChange={(e) => {
                    handleInputChange(e);
                    setErrors({ ...errors, email: undefined });
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                  inputProps={{
                    maxLength: 100
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="subject"
                  label={t('contact.form.subject')}
                  variant="outlined"
                  onChange={(e) => {
                    handleInputChange(e);
                    setErrors({ ...errors, subject: undefined });
                  }}
                  error={!!errors.subject}
                  helperText={errors.subject}
                  inputProps={{
                    maxLength: 100
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="message"
                  label={t('contact.form.message')}
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={(e) => {
                    handleMessageChange(e);
                    setErrors({ ...errors, message: undefined });
                  }}
                  error={!!errors.message}
                  helperText={errors.message || `${messageLength}/1000 ${t('contact.form.characters')}`}
                  inputProps={{
                    maxLength: 1000,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {recaptchaSiteKey && (
                  <Box sx={{ display: 'none' }}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={recaptchaSiteKey}
                      size="invisible"
                      badge="bottomright"
                      theme={theme.palette.mode}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                >
                  {loading ? t('contact.form.sending') : t('contact.form.send')}
                </Button>
              </Grid>
            </Grid>
          </form>

          {alert.show && (
            <Box sx={{ mt: 2 }}>
              <Alert severity={alert.severity}>{alert.message}</Alert>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
