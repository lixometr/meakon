require('dotenv').config()
const config = require('../common/config/config.development')
export default {
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: "robots", content: "noindex, nofollow" }
    ],
    script: [
      {
        type: 'text/javascript',
        src: '/assets/js/swiper-bundle.min.js',
        body: false
      },
      {
        type: 'text/javascript',
        src: '/assets/js/jquery.min.js',
        body: false
      },

      {
        type: 'text/javascript',
        src: '/assets/js/main.js',
        body: true
      },

    ],
    link: [
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap-grid.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap-reboot.min.css' },
      { rel: 'stylesheet', href: 'assets/css/swiper-bundle.min.css' },
      { rel: "preload", href: "/assets/fonts/Federov2.ttf", as: "font" },
      { rel: "preload", href: "https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap", as: 'font' },
      { rel: "stylesheet", href: "/assets/fonts/fonts.css", },
      { rel: "stylesheet", href: "/assets/css/main.css", },
      { rel: "stylesheet", href: "/assets/css/media.css", },
      { rel: "icon", href: "/favicon.png", type: "image/png" }


    ]
  },


  /*
 ** Global CSS
 */
  css: [
    // "~assets/css/style.scss"
  ],
  loading: {
    // color: '#2D64F1'
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/error' },

    { src: '@/plugins/api' },
    { src: "@/plugins/url" },
    { src: "@/plugins/sticky-directive", mode: 'client' },
    { src: "@/plugins/click-outside", },
    { src: "@/plugins/modal", },
    { src: "@/plugins/swiper", },
    { src: "@/plugins/language", },
    { src: "@/plugins/load-script", mode: 'client'},

  ],
  router: {
    scrollToTop: true,
    middleware: ['language'],

  },
  scrollToTop: true,
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [

  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    "@nuxtjs/style-resources",
    "nuxt-svg-loader",
    'cookie-universal-nuxt',

  ],
  styleResources: {
    // scss: ["~assets/scss/_const.scss", "~assets/scss/_mixin.scss"]
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    development: process.env.NODE_ENV !== 'production',
    NODE_ENV: process.env.NODE_ENV
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
