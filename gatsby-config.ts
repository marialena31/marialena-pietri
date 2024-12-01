import type { GatsbyConfig } from "gatsby"
import dotenv from 'dotenv'

// Load environment variables from .env
dotenv.config()

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Maria-Lena Pietri - Magento Developer`,
    description: `Professional Magento developer with over 15 years of experience in e-commerce solutions`,
    author: `Maria-Lena Pietri`,
    siteUrl: `https://your-domain.com`,
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/public/images`,
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
