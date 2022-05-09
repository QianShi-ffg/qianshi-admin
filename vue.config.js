module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    port: 3422
  },
  configureWebpack: config => {
    // 配置 externals
    // 防止将某些 import 的包(package)打包到 bundle 中，
    // 而是在运行时(runtime)再去从外部获取这些扩展依赖
    config.externals = {
      // 模块名(from后边的名字): 构造函数名称(文件内部提供的全局变量名字)
      vue: 'Vue',
      axios: 'axios',
      'vue-router': 'VueRouter',
      echarts: 'echarts',
      nprogress: 'NProgress'
    }
  }
}
