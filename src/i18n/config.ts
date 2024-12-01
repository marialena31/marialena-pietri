import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './data/en.json';
import es from './data/es.json';
import fr from './data/fr.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
