module.exports = {
  plugins: [
    'gatsby-plugin-sass',
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
  ],
}
