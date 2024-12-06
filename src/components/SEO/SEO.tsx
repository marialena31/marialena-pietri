import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

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
            titleTemplate
            twitterUsername
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
    titleTemplate,
    twitterUsername,
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
    <Helmet
      htmlAttributes={{
        lang: i18n.language,
      }}
      title={seo.title}
      titleTemplate={titleTemplate}
      meta={[
        {
          name: 'description',
          content: seo.description,
        },
        {
          name: 'image',
          content: seo.image,
        },
        {
          property: 'og:title',
          content: seo.title,
        },
        {
          property: 'og:description',
          content: seo.description,
        },
        {
          property: 'og:image',
          content: seo.image,
        },
        {
          property: 'og:url',
          content: seo.url,
        },
        {
          property: 'og:type',
          content: article ? 'article' : 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:creator',
          content: twitterUsername,
        },
        {
          name: 'twitter:title',
          content: seo.title,
        },
        {
          name: 'twitter:description',
          content: seo.description,
        },
        {
          name: 'twitter:image',
          content: seo.image,
        },
        {
          name: 'theme-color',
          content: '#4A90E2',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
      ]}
      link={[
        {
          rel: 'canonical',
          href: seo.url,
        },
        ...alternateUrls.map(({ lang, url }) => ({
          rel: 'alternate',
          hrefLang: lang,
          href: url,
        })),
      ]}
    />
  );
};

export default SEO;
