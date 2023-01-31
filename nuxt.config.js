module.exports = {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Global Styles (Do not import actual styles)
   ** https://www.npmjs.com/package/@nuxtjs/style-resources
   */
  styleResources: {
    scss: [
      /*
       * Vendor
       */
      // > Bootstrap Vendor
      'bootstrap/scss/_functions.scss',
      'bootstrap/scss/_variables.scss',
      'bootstrap/scss/_mixins.scss',
      /*
       * Overrides (This overrides not includes actual styles. | variables, mixins etc.)
       */
      // > Bootstrap Overrides
      '~/assets/style/scss/overrides/bootstrap/_grid.override.scss',
      '~/assets/style/scss/overrides/bootstrap/_spacing.override.scss',
      // Plugins
      // --
      // Functions
      '~/assets/style/scss/functions/_center.scss',
      '~/assets/style/scss/functions/_triangle.scss',
      // Variables
      //--
      // Mixins
      '~/assets/style/scss/mixins/_font.scss',
      '~/assets/style/scss/mixins/_gradient.scss'
    ]
  },

  /*
   ** Global Styles (Actual styles)
   */
  css: [
    // Actual styles entry point (as import management)
    '~/assets/style/scss/app.scss'
    // 3rds
    // ---
  ],

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // https://vuesax.com
    {
      src: '@/plugins/vuesax.js',
      ssr: true
    },
    // https://docs.iconify.design/icon-components/vue
    {
      src: '~/plugins/iconify.js',
      ssr: false
    }
  ],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: false,

  /*
   ** Router configuration
   ** https://nuxtjs.org/docs/configuration-glossary/configuration-router
   */
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'index',
        path: '/',
        component: resolve(__dirname, 'pages/Home/index.vue')
      })
    }
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // https://composition-api.nuxtjs.org
    '@nuxtjs/composition-api/module',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://github.com/nuxt-community/eslint-module
    [
      '@nuxtjs/eslint-module',
      {
        // eslint module options
      }
    ],
    // https://github.com/nuxt-community/stylelint-module
    [
      '@nuxtjs/stylelint-module',
      {
        // stylelint module options
        files: ['{assets/style,components,layouts,pages}/**/*.{css,sass,scss,less,stylus,vue}']
      }
    ]
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // https://i18n.nuxtjs.org
    [
      '@nuxtjs/i18n',
      {
        lazy: true,
        locales: [
          {
            name: 'English',
            title: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en.js'
          },
          {
            name: 'Turkish',
            title: 'Türkçe',
            code: 'tr',
            iso: 'tr-TR',
            file: 'tr.js'
          }
        ],
        langDir: 'locales/',
        defaultLocale: 'tr',
        strategy: 'no_prefix',
        detectBrowserLanguage: false,
        parsePages: false
      }
    ]
  ],

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extractCSS: process.env.NODE_ENV === 'production'
  },

  /*
   ** Server configuration
   ** See https://nuxtjs.org/api/configuration-server/
   */
  server: {
    host: '0.0.0.0', // default: localhost,
    timing: false,
    port: 8080
  }
}
