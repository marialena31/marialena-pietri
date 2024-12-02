import type { GatsbyConfig } from "gatsby"
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Maria-Lena Pietri - Magento Developer`,
    description: `Tech Lead and Project Manager with over 15 years of experience in web development and e-commerce.`,
    author: `Maria-Lena Pietri`,
    siteUrl: `https://www.marialena-pietri.com`,
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
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
