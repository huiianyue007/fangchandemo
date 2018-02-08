module.exports = {
  /*
  ** Headers of the page
  */
  build: {
    vendor: ['vuex-i18n'],
    extend(config, { isClient }) {
      if (isClient) {
        config.entry.vendor.push('babel-polyfill')
      }
    }
  },
  router: {
    middleware: 'i18n'
  },
  plugins: [
    { src: '~plugins/i18n.js', injectAs: 'i18n' },
    {src: '~plugins/init.js'}
  ],
  head: {
    title: '验证demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '房产验证demo' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
