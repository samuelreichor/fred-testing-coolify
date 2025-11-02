// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { convertUrlsToOrigin } from './app/utils/helper'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({

  modules: [
    '@query-api/nuxt',
    '@nuxt/eslint',
    '@hypernym/nuxt-gsap',
    'lenis/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'nuxt-shiki',
  ],

  $production: {
    routeRules: {
      '/**': {
        cache: {
          swr: true,
          staleMaxAge: 600,
        },
      },
    },
  },

  components: [
    '~/components',
    { path: 'sections', prefix: 'Section' },
  ],

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
          href: '/fonts/PPNeueMontreal-Medium.woff2',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon/favicon-96x96.png',
          sizes: '96x96',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon/favicon.svg',
        },
        {
          rel: 'shortcut icon',
          href: '/favicon/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/favicon/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'theme-color',
          content: '#ffffff',
          id: 'theme-color-meta',
        },
      ],
      script: [
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PZRPS5BK');`,
        },
      ],
    },
  },

  css: ['~/assets/css/app.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    storage: 'sessionStorage',
    dataValue: 'theme',
  },

  runtimeConfig: {
    public: {
      environment: 'production',
    },
  },

  devServer: {
    host: '0.0.0.0',
    port: 4000,
  },

  compatibilityDate: '2024-04-03',

  vite: {
    plugins: [tailwindcss(), svgLoader()],
    server: {
      hmr: {
        protocol: 'wss',
      },
      allowedHosts: convertUrlsToOrigin([process.env.NUXT_PRIMARY_SITE_URL!]),
    },
  },

  craftcms: {
    baseUrl: process.env.NUXT_PRIMARY_SITE_URL,
    authToken: process.env.NUXT_CRAFT_TOKEN,
    siteMap: [
      {
        handle: 'de',
        origin: process.env.NUXT_PRIMARY_SITE_URL!,
        path: '/',
        id: 1,
        lang: 'de',
        label: 'De',
      },
    ],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  gsap: {
    composables: true,
    provide: false,
    clubPlugins: {
      splitText: true,
    },
    extraPlugins: {
      scrollTrigger: true,
      scrollTo: true,
    },
  },

  shiki: {
    bundledThemes: ['github-light', 'github-dark'],
    bundledLangs: ['html', 'liquid', 'javascript', 'php', 'bash', 'vue'],
  },
})
