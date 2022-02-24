/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  pathPrefix: `projects/Gatsby-test/`,
  /* Your site config here */
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Job Tracker`,
        short_name: `Jobz`,
        start_url: `https://joyreacher.com/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon:`src/images/icon.png`,
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
  ],
}
