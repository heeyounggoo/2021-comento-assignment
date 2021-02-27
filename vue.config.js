module.exports = {
  configureWebpack: {
    devtool: '#eval-source-map'
  },
  devServer: {
    https: false,
    proxy: {
      '/api': {
        target: 'https://problem.comento.kr'
      }
    }
  }
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       additionalData: `@import "~@/assets/style/global.scss";`
  //     }
  //   }
  // }
}
