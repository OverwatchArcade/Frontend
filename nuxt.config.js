export default {
  target: 'static',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Overwatch arcade gamemodes - daily updated and get notified easily',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Discover daily Overwatch arcade gamemodes without having to login to Overwatch. Arcade modes are posted daily. Also get notified by following the Overwatch arcade Twitter or Discord server. Overwatch arcade today also provides a free API so you can create your own implementation. Special thanks to all the contributors' },
      { hid: 'keywords', name: 'keywords', content: 'Overwatch, arcade, today, gamemode, modes, arcademodes, daily, gamemodes, discord, twitter, ow' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/style'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome',
    '@nuxtjs/pwa'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    ['nuxt-i18n', {
      detectBrowserLanguage: false
    }]
  ],

  pwa: {
    manifest: {
      name: 'OverwatchArcade.Today',
      short_name: 'OWArcade',
      description: 'Discover daily Overwatch arcade gamemodes without having to login to Overwatch. Arcade modes are posted daily. Also get notified by following the Overwatch arcade Twitter or Discord server. Overwatch arcade today also provides a free API so you can create your own implementation. Special thanks to all the contributors'
    }
  },

  fontawesome: {
    icons: {
      solid: ['faQuestionCircle', 'faKey', 'faSignInAlt', 'faPlusCircle'],
      regular: [],
      light: [],
      duotone: [],
      brands: ['faDiscord', 'faBattleNet', 'faTwitter', 'faSteam', 'faGithub']
    }
  },

  axios: {
    baseURL: process.env.API_HOST || 'https://localhost:7125'
  },

  publicRuntimeConfig: {
    discord_clientid: process.env.DISCORD_CLIENTID,
    discord_redirecturi: process.env.DISCORD_REDIRECTURI
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  i18n: {
    locales: [
      { code: 'us', name: 'English', file: 'us.json' },
      { code: 'cn', name: 'Chinese', file: 'cn.json' },
      { code: 'de', name: 'German', file: 'de.json' },
      { code: 'es', name: 'Spanish', file: 'es.json' },
      { code: 'fr', name: 'French', file: 'fr.json' },
      { code: 'it', name: 'Italian', file: 'it.json' },
      { code: 'jp', name: 'Japanese', file: 'jp.json' },
      { code: 'kr', name: 'Korean', file: 'kr.json' },
      { code: 'mx', name: 'Mexican', file: 'mx.json' },
      { code: 'pl', name: 'Polish', file: 'pl.json' },
      { code: 'br', name: 'Portuguese', file: 'br.json' },
      { code: 'tw', name: 'Taiwanese', file: 'tw.json' },
      { code: 'ru', name: 'Russian', file: 'ru.json' }
    ],
    lazy: true,
    defaultLocale: 'us',
    langDir: 'i18n/',
    strategy: 'no_prefix'
  },

  auth: {
    cookie: false,
    redirect: {
      callback: '/auth/callback'
    },
    strategies: {
      local: {
        scheme: 'local',
        token: {
          property: 'data',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'data',
          autoFetch: true
        },
        autoLogout: true,
        endpoints: {
          login: { url: '/api/v1/contributor/auth/login', method: 'post' },
          refresh: false,
          logout: { url: '/api/v1/contributor/auth/logout', method: 'post' },
          user: {
            url: '/api/v1/contributor/auth/info',
            method: 'get'
          }
        }
      }
    }
  }
}
