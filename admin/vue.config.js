const webpack = require('webpack')
module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    entry: ['@babel/polyfill', './src/main.js'],
    resolve: {
      symlinks: false
    },
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
    ]
  },
  devServer: {
    port: 8083
  },
  transpileDependencies: [
    '@coreui/utils'
  ]
}
