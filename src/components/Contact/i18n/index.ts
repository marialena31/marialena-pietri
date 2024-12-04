import i18n from 'i18next';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';

const resources = {
  en: { contact: en },
  fr: { contact: fr },
  es: { contact: es },
};

i18n.addResourceBundle('en', 'contact', resources.en.contact, true, true);
i18n.addResourceBundle('fr', 'contact', resources.fr.contact, true, true);
i18n.addResourceBundle('es', 'contact', resources.es.contact, true, true);

export default i18n;