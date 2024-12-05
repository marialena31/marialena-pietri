import i18n from 'i18next';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';

// Add resources to existing i18n instance
i18n.addResourceBundle('en', 'skills', en, true, true);
i18n.addResourceBundle('fr', 'skills', fr, true, true);
i18n.addResourceBundle('es', 'skills', es, true, true);

export default i18n;