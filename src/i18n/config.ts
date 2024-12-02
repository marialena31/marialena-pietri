import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import en from './data/en.json';
import es from './data/es.json';
import fr from './data/fr.json';

import servicesEn from '../components/Services/i18n/en.json';
import servicesEs from '../components/Services/i18n/es.json';
import servicesFr from '../components/Services/i18n/fr.json';

import footerEn from '../components/Footer/i18n/en.json';
import footerEs from '../components/Footer/i18n/es.json';
import footerFr from '../components/Footer/i18n/fr.json';

const resources = {
  en: {
    translation: en,
    services: servicesEn,
    footer: footerEn
  },
  es: {
    translation: es,
    services: servicesEs,
    footer: footerEs
  },
  fr: {
    translation: fr,
    services: servicesFr,
    footer: footerFr
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', 
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    ns: ['translation', 'services', 'footer'],
    defaultNS: 'translation'
  });

export default i18n;
