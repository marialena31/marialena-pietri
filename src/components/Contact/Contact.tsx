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
  Alert,
  useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const { t } = useTranslation();
  const theme = useTheme();
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
      
      // Submit to Netlify's form handling
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      })
        .then(() => {
          setMessage({ type: 'success', text: t('contact.success') });
          form.reset();
        })
        .catch((error) => {
          console.error('Form submission error:', error);
          setMessage({ type: 'error', text: t('contact.error') });
        });
    } catch (error) {
      console.error('Form submission error:', error);
      setMessage({ type: 'error', text: t('contact.error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 8,
        backgroundColor: 'rgba(18, 18, 18, 0.95)',
        color: 'white',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.dark}15 0%, transparent 60%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.dark}15 0%, transparent 60%)`,
          opacity: 0.6,
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom 
          sx={{ 
            mb: 4,
            color: 'white',
            fontWeight: 600,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: '2px',
            }
          }}
        >
          {t('contact.title')}
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ 
            mb: 6,
            maxWidth: '800px',
            mx: 'auto',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.1rem',
          }}
        >
          {t('contact.subtitle')}
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={3}
              sx={{
                p: 4,
                maxWidth: 800,
                mx: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <form 
                onSubmit={handleSubmit}
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="contact" />
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
                      name="name"
                      label={t('contact.form.name')}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: `${theme.palette.primary.main}80`,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&.Mui-focused': {
                            color: theme.palette.primary.main,
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="email"
                      type="email"
                      label={t('contact.form.email')}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: `${theme.palette.primary.main}80`,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&.Mui-focused': {
                            color: theme.palette.primary.main,
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: `${theme.palette.primary.main}80`,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&.Mui-focused': {
                            color: theme.palette.primary.main,
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      name="message"
                      label={t('contact.form.message')}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: `${theme.palette.primary.main}80`,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&.Mui-focused': {
                            color: theme.palette.primary.main,
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                    />
                  </Grid>
                  {message && (
                    <Grid item xs={12}>
                      <Alert 
                        severity={message.type} 
                        sx={{ 
                          mb: 2,
                          backgroundColor: message.type === 'success' 
                            ? 'rgba(46, 125, 50, 0.1)'
                            : 'rgba(211, 47, 47, 0.1)',
                          color: message.type === 'success'
                            ? '#66bb6a'
                            : '#f44336',
                          border: `1px solid ${message.type === 'success' ? '#66bb6a40' : '#f4433640'}`,
                          '& .MuiAlert-icon': {
                            color: message.type === 'success' ? '#66bb6a' : '#f44336',
                          },
                        }}
                      >
                        {message.text}
                      </Alert>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      startIcon={<SendIcon />}
                      sx={{
                        minWidth: 200,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: 'white',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        padding: '12px 32px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
                        },
                        '&:disabled': {
                          background: 'rgba(255, 255, 255, 0.12)',
                          color: 'rgba(255, 255, 255, 0.3)',
                        },
                      }}
                    >
                      {loading ? t('contact.form.sending') : t('contact.form.send')}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
