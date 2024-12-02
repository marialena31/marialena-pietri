import React from 'react';
import { useTranslation } from 'react-i18next';

const StructuredData = () => {
  const { t, i18n } = useTranslation();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Maria-Lena Pietri',
    jobTitle: 'Expert Magento & E-commerce',
    url: 'https://marialena-pietri.fr',
    image: 'https://marialena-pietri.fr/images/profile.webp',
    sameAs: [
      'https://www.linkedin.com/in/marialena-pietri',
      'https://github.com/mlpietri',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    knowsAbout: [
      'Magento Development',
      'E-commerce Solutions',
      'Web Development',
      'Project Management',
      'Technical Leadership',
      'Adobe Commerce',
      'B2B E-commerce',
      'B2C E-commerce',
    ],
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'French',
        alternateName: 'fr',
      },
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
      {
        '@type': 'Language',
        name: 'Spanish',
        alternateName: 'es',
      },
    ],
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
};

export default StructuredData;
