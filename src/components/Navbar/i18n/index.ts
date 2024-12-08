import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';

// Initialize i18next if not already initialized
if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .init({
      lng: 'en', // default language
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // react already escapes values
      },
      resources: {
        en: { navbar: en },
        fr: { navbar: fr },
        es: { navbar: es },
      },
    });
}

// Add additional resources to existing i18n instance
i18next.addResourceBundle('en', 'navbar', en, true, true);
i18next.addResourceBundle('fr', 'navbar', fr, true, true);
i18next.addResourceBundle('es', 'navbar', es, true, true);

export default i18next;