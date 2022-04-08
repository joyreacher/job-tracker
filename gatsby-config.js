/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  pathPrefix: `projects/jobby/`,
  /* Your site config here */
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Job Tracker`,
        short_name: `Jobby`,
        start_url: `/`,
        background_color: `#1A181B`,
        theme_color: `#F7F4F3`,
        display: `standalone`,
        icon:`src/images/favicon.png`,
        caches_busting_mode: `none`
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/index/`],
        workboxConfig: {
          globPatterns: ['**/*.{js,jpg,png,html,css,icon-path}']
        }
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: ` #F7F4F3`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
  ],
}
