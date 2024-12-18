import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';  // Import root i18n configuration
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
