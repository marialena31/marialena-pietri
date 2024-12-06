import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
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
import axios from 'axios';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const { t, i18n } = useTranslation('contact');
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>( {});

  const fetchCsrfToken = async () => {
    try {
      const API_URL = process.env.GATSBY_API_URL || 'http://localhost:3000';
      const response = await axios.get(`${API_URL}/api/csrf-token`, {
        withCredentials: false
      });
      
      if (response.headers['x-csrf-token']) {
        return response.headers['x-csrf-token'];
      } else if (response.data && response.data.token) {
        return response.data.token;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name) {
      newErrors.name = t('form.name.required');
    } else if (formData.name.length < 2) {
      newErrors.name = t('form.name.minLength');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = t('form.email.required');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('form.email.invalid');
    }

    if (!formData.subject) {
      newErrors.subject = t('form.subject.required');
    } else if (formData.subject.length < 5) {
      newErrors.subject = t('form.subject.minLength');
    }

    if (!formData.message) {
      newErrors.message = t('form.message.required');
    } else if (formData.message.length < 10) {
      newErrors.message = t('form.message.minLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const token = await fetchCsrfToken();
      if (!token) {
        throw new Error('Failed to get security token');
      }

      const API_URL = process.env.GATSBY_API_URL || 'http://localhost:3000';
      const API_KEY = process.env.GATSBY_API_KEY;
      const TO_EMAIL = process.env.GATSBY_TO_EMAIL_ADDRESS;

      const response = await axios({
        method: 'post',
        url: `${API_URL}/api/mail/send`,
        data: {
          to: TO_EMAIL,
          subject: `Contact Form: Message from ${formData.name}`,
          text: `
            Name: ${formData.name}
            Email: ${formData.email}
            Subject: ${formData.subject}
            Message: ${formData.message}
          `
        },
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': token
        },
        withCredentials: false
      });

      setMessage({ type: 'success', text: t('form.success') });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      if (error.response?.status === 429) {
        setMessage({ 
          type: 'error', 
          text: 'Too many requests. Please wait a moment before trying again.'
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: error.response?.data?.message || error.message || t('error.message')
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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
          component="h2"
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
          {t('title')}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          align="center"
          sx={{
            mb: 6,
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 400,
          }}
        >
          {t('subtitle')}
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
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                noValidate
                aria-label={t('form.aria.formLabel')}
              >
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </div>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="name"
                      label={t('form.name.label')}
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
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
                      label={t('form.email.label')}
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
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
                      label={t('form.subject.label')}
                      variant="outlined"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
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
                      label={t('form.message.label')}
                      variant="outlined"
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
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
                      aria-label={t('form.aria.submitLabel')}
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
                      {loading ? t('form.sending') : t('form.submit')}
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
