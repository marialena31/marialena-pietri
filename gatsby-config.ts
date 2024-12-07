import type { GatsbyConfig } from "gatsby"
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Maria-Lena Pietri - Expert Magento & E-commerce`,
    titleTemplate: `%s | Maria-Lena Pietri`,
    description: `Expert Magento avec plus de 15 ans d'expérience en développement web et e-commerce. Spécialisée dans les solutions e-commerce B2B et B2C, l'optimisation des performances et la sécurité.`,
    author: `Maria-Lena Pietri`,
    siteUrl: `https://marialena-pietri.fr`,
    image: '/images/profile.webp',
    twitterUsername: '@mlpietri',
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-csp',
      options: {
        mergeDefaultDirectives: true,
        directives: {
          "default-src": "'self'",
          "script-src": "'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
          "style-src": "'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src": "'self' data: https:",
          "font-src": "'self' https://fonts.gstatic.com",
          "connect-src": process.env.GATSBY_API_URL ? `'self' https://api.mailgun.net ${process.env.GATSBY_API_URL}` : "'self' https://api.mailgun.net",
          "frame-src": "'self' https://www.google.com/recaptcha/",
          "base-uri": "'self'",
          "form-action": "'self'",
          "frame-ancestors": "'none'",
          "object-src": "'none'",
          "upgrade-insecure-requests": true
        }
      }
    },
    {
      resolve: 'gatsby-plugin-react-helmet',
      options: {
        htmlAttributes: {
          lang: 'fr'
        }
      }
    },
    {
      resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
      options: {
        fields: ['title', 'description', 'content'],
        resolvers: {
          SitePage: {
            title: node => node.context?.title,
            description: node => node.context?.description,
            content: node => node.context?.content,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Maria-Lena Pietri - Expert Magento`,
        short_name: `ML Pietri`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4A90E2`,
        display: `minimal-ui`,
        icon: `static/images/logo.jpg`,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'fr'
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://marialena-pietri.fr',
        sitemap: 'https://marialena-pietri.fr/sitemap/sitemap-index.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        allowList: ['MAILGUN_API_KEY', 'MAILGUN_DOMAIN', 'MAILGUN_URL', 'TO_EMAIL_ADDRESS', 'GATSBY_API_URL']
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `i18n`,
        path: `${__dirname}/src/i18n/data`,
      },
    },
  ],
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,
    PARTIAL_HYDRATION: true,
    DETECT_NODE_MUTATIONS: true
  }
}

export default config
