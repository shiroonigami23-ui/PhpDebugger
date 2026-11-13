import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  srcDir: 'app/',
  ssr: false,
  devtools: { enabled: false },
  css: ['@/assets/styles/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
  tailwindcss: {
    configPath: './tailwind.config.ts'
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  vite: {
    build: {
      minify: 'terser'
    }
  },
  app: {
    baseURL: '/',
    head: {
      title: 'PHP Debugger Forensics',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Chrome extension that makes silent PHP/SQL backend failures visible.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  }
})
