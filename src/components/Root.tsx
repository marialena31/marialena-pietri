import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import theme from '../theme';

interface WrapRootElementProps {
  element: React.ReactNode;
}

export const wrapRootElement = ({ element }: WrapRootElementProps) => {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {element}
      </ThemeProvider>
  );
};
