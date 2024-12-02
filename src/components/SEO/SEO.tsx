import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

const SEO = ({ title, description, image, article = false }: SEOProps) => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            author
          }
        }
      }
    `
  );

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    author,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image || `${siteUrl}/images/profile.webp`,
    url: `${siteUrl}${pathname}`,
  };

  const alternateUrls = ['en', 'fr', 'es'].map(lang => ({
    lang,
    url: `${siteUrl}${pathname}${pathname.includes('?') ? '&' : '?'}lang=${lang}`,
  }));

  return (
    <>
      <html lang={i18n.language} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="author" content={author} />

      {/* Open Graph */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:locale" content={i18n.language} />
      {alternateUrls.map(({ lang }) => (
        <meta property="og:locale:alternate" content={lang} key={lang} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={author} />

      {/* Alternate language versions */}
      {alternateUrls.map(({ lang, url }) => (
        <link rel="alternate" hrefLang={lang} href={url} key={lang} />
      ))}
      <link rel="canonical" href={seo.url} />

      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#4A90E2" />
      <meta name="keywords" content="Magento Developer, E-commerce Expert, Tech Lead, Project Manager, Web Development, Full Stack Developer, Adobe Commerce" />
    </>
  );
};

export default SEO;
