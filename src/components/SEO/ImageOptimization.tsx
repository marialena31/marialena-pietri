import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

export const ImageOptimization = () => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            gatsbyImageData(
              formats: [AUTO, WEBP, AVIF]
              placeholder: BLURRED
              quality: 90
              breakpoints: [320, 480, 768, 1024, 1366]
            )
          }
        }
      }
    }
  `);

  return null; // This component is for query only
};

export default ImageOptimization;
