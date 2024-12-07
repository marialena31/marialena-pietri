import type { GatsbyConfig } from "gatsby"
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const config: GatsbyConfig = {
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,
    PARTIAL_HYDRATION: false,  // Disable experimental partial hydration
    DETECT_NODE_MUTATIONS: true,
    FAST_DEV: true  // Enable faster development server startup
  },
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
          "script-src": "'self' 'sha256-egpbluqkD8NT0bY3bWy7raM9tRIMkfUWboq0Y8KqsFk=' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://*.netlify.app https://*.netlify.com",
          "script-src-elem": "'self' 'sha256-v1oYH69RcooFs6F5XhMTzHiWlftYwnuQHDxIz0suNeo=' https://*.netlify.app https://*.netlify.com",
          "style-src": "'self' 'sha256-Ext49gspPHCvQnkZPoRZMwmNL03mSa1YCzbtXrbKjec=' https://fonts.googleapis.com https://*.netlify.app https://*.netlify.com",
          "img-src": "'self' data: https: blob:",
          "font-src": "'self' data: https://fonts.gstatic.com",
          "connect-src": "'self' https://mail-server-api-nu.vercel.app http://localhost:3000 https://*.netlify.app https://*.netlify.com",
          "frame-src": "https://www.google.com/recaptcha/ https://*.netlify.app https://*.netlify.com",
          "base-uri": "'self'",
          "form-action": "'self'",
          "object-src": "'none'",
          "manifest-src": "'self'",
          "media-src": "'self'",
          "worker-src": "'self' blob: data:",
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
        allowList: ['GATSBY_TO_EMAIL_ADDRESS', 'GATSBY_API_URL', 'GATSBY_API_KEY']
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
}

export default config
