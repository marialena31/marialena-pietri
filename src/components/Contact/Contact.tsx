import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: t('contact.success') });
        form.reset();
      } else {
        setMessage({ type: 'error', text: t('contact.form.error') });
      }
    } catch (error) {
      setMessage({ type: 'error', text: t('contact.form.error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 8,
        backgroundColor: 'grey.50',
        borderTop: `1px solid grey.100`,
        borderBottom: `1px solid grey.100`,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          {t('contact.title')}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          sx={{ mb: 6 }}
        >
          {t('contact.subtitle')}
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                backgroundColor: 'white',
              }}
            >
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                {/* Hidden input for Netlify Forms */}
                <input type="hidden" name="form-name" value="contact" />
                {/* Hidden honeypot field to prevent spam */}
                <p hidden>
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

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
                      type="email"
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
                      color="primary"
                      fullWidth
                      size="large"
                      disabled={loading}
                      sx={{
                        mt: 3,
                        opacity: loading ? 0.7 : 1,
                      }}
                    >
                      {loading ? t('contact.form.sending') : t('contact.form.send')}
                    </Button>
                  </Grid>
                </Grid>
              </form>

              {message && (
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: message.type === 'success' ? 'success.light' : 'error.light',
                    color: message.type === 'success' ? 'success.dark' : 'error.dark',
                    borderRadius: 1,
                  }}
                >
                  <Typography>{message.text}</Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
