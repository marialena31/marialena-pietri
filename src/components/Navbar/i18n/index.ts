import i18n from 'i18next';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';

// Add resources to existing i18n instance
i18n.addResourceBundle('en', 'navbar', en, true, true);
i18n.addResourceBundle('fr', 'navbar', fr, true, true);
i18n.addResourceBundle('es', 'navbar', es, true, true);

export default i18n;