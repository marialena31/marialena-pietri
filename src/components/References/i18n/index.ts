import i18next from 'i18next';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';

const resources = {
  en: { references: en },
  fr: { references: fr },
  es: { references: es },
};

i18next.addResourceBundle('en', 'references', resources.en.references, true, true);
i18next.addResourceBundle('fr', 'references', resources.fr.references, true, true);
i18next.addResourceBundle('es', 'references', resources.es.references, true, true);
