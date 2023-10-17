import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Tic-Tac-Toe',
      meta: [
        { name: 'description', content: 'Tic-Tac-Toe game on vue + nuxt + ts'},
      ],
      link: [
        { rel: 'icon', href: 'public/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: 'public/apple-touch-icon.png' },
        { rel: 'icon', sizes: '32x32', href: 'public/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', href: 'public/favicon-16x16.png' },
      ],
    }
  },
  vite: {
    plugins: [
      svgLoader({
        defaultImport: 'component'
      })
    ]
  }
})
