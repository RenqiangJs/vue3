const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.ts',
    },
  },
  configureWebpack: {
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
    module: {
      rules: [
        // 从这里复制下面的代码就可以了
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'ts-loader',
        },
      ],
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://vue.ruoyi.vip',
        changeOrigin: true,
      },
    },
  },
})
