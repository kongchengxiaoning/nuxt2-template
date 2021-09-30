import path from 'path'

export default {

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt2-template',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/index.scss',
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/svg-icon',
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: 'https://www.text.net',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: true, // webpack-bundle-analyzer
    extend(config) {
    // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
    // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [path.join(__dirname, 'assets/icons/svg')]
      // 添加loader规则
      config.module.rules.push({
        test: /\.svg$/, // 匹配.svg
        include: [path.join(__dirname, 'assets/icons/svg')], // 将存放svg的目录加入到loader处理目录
        use: [{ loader: 'svg-sprite-loader', options: { symbolId: 'icon-[name]' }}]
      })
    }
  },

  router: {
    middleware: 'router'
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:9527'
  },

  styleResources: {
    scss: [
      './assets/styles/global.scss', // 自己项目中的样式文件的路径
      './assets/styles/mixin.scss' // 自己项目中的样式文件的路径
    ]
  }
}
