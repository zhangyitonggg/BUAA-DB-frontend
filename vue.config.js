const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/]
              }
            }
          ]
        },
        {
          test: /\.d\.ts$/,
          use: 'raw-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.vue']
    }
  }
});