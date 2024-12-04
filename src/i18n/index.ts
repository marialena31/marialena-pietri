import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import component translations
import heroEN from '../components/Hero/i18n/en.json';
import heroFR from '../components/Hero/i18n/fr.json';
import heroES from '../components/Hero/i18n/es.json';

import aboutEN from '../components/About/i18n/en.json';
import aboutFR from '../components/About/i18n/fr.json';
import aboutES from '../components/About/i18n/es.json';

import skillsEN from '../components/Skills/i18n/en.json';
import skillsFR from '../components/Skills/i18n/fr.json';
import skillsES from '../components/Skills/i18n/es.json';

import footerEN from '../components/Footer/i18n/en.json';
import footerFR from '../components/Footer/i18n/fr.json';
import footerES from '../components/Footer/i18n/es.json';

const resources = {
  en: {
    hero: heroEN,
    about: aboutEN,
    skills: skillsEN,
    footer: footerEN,
  },
  fr: {
    hero: heroFR,
    about: aboutFR,
    skills: skillsFR,
    footer: footerFR,
  },
  es: {
    hero: heroES,
    about: aboutES,
    skills: skillsES,
    footer: footerES,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'es'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
