module.exports = {
  plugins: [
    "gatsby-plugin-sass",
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdowns`,
        path: `${__dirname}/src/markdowns`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `imagesTravel`,
        path: `${__dirname}/src/images/travel`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ercancicek`,
        short_name: `ercancicek`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#5cdb95`,
        display: `standalone`,
        icon: `src/images/logo_original.png`
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-109465574-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
      },
    },
  ],
}
