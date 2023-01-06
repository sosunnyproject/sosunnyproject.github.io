/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 * 
 */

module.exports = {
  flags: {
    DEV_SSR: true
  },
  /* Your site config here */
  siteMetadata:{
    title: 'sosunnyproject | Personal Website · Portfolio · Dev Blog · Contact',
    author: 'So Sun Park | sosunnyproject', // titleTemplate: "%s · The Real Hero",
    description: 'creative coder, frontend developer, artist who code, interactive media art | 크리에이티브 코딩, 프론트엔드 개발자, 코딩하는 아티스트, 예술과 기술, 인터렉티브 미디어 아트',
    siteUrl: 'https://sosunnyproject.github.io', // No trailing slash allowed!
    keywords: [`blog`, `portfolio`, `reviews`, `frontend`]
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sitemap',
      options:{
        query: `{
          site {
            siteMetadata {
              description
              title
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                excerpt
                headings {
                  value
                }
              }
            }
          }
        }`,
        resolvePages: ({
          allSitePage: { nodes: allPages },
        }) => {
          return allPages.map(page => {
            return { ...page }
          })
        },
        serialize: ({ path }) => {
          return {
            url: path,
            changefreq: `daily`,
            priority: 0.7
          }
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://sosunnyproject.github.io',
        sitemap: 'https://sosunnyproject.github.io/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "UA-178004297-2", // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-adsense`,
    //   options: {
    //     publisherId: `ca-pub-2903194989953506`
    //   },
    // },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `sosunnyproject-gitblog`
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Rubik', 'Montserrat', 'Brawler', 'Open Sans', 'Poppins', 'Source Sans Pro', 'Heebo', 'Roboto', 'Quicksand', 'Rock Salt', 'Raleway', 'Bungee Shade', 'Black Han Sans', 'Noto Serif KR',]
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `portfolio`,
        path: `${__dirname}/content/portfolio`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `styles`,
        path: `${__dirname}/src/styles`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `templates`,
        path: `${__dirname}/src/templates`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-instagram-embed`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 768,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "sosunnyrproject website",
        short_name: "sosunnyproject",
        start_url: "/",
        // background_color: "#6b37bf",
        // theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        // display: "standalone",
        icon: "src/images/sosunny_logo.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
