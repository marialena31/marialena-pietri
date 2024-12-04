import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';

const resources = {
  en: {
    skills: en,
  },
  fr: {
    skills: fr,
  },
  es: {
    skills: es,
  },
};

i18next
  .use(initReactI18next)
  .init({
    ns: ['skills'],
  defaultNS: 'skills',
  resources,
  });

export default i18next;
