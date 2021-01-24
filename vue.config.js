module.exports = {
  publicPath: './',
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    },
    i18n: {
      locale: 'zh-cn',
      fallbackLocale: 'zh-cn',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
