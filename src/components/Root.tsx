import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';
import theme from '../theme';

interface WrapRootElementProps {
  element: React.ReactNode;
}

export const wrapRootElement = ({ element }: WrapRootElementProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {element}
      </ThemeProvider>
    </I18nextProvider>
  );
};
