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
    port: 4000,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'https://nslc-mange.dev.lishicloud.com',
        changeOrigin: true,
      },
    },
  },
})
