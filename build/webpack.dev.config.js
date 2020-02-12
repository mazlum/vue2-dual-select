const path = require('path');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config');


module.exports = merge(baseConfig, {
  entry: './dev/dev.js',
  output: {
    path: path.resolve(__dirname, '../dist-dev/')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dev/index.html',
      inject: true,
    }),
  ],
  optimization: {
    noEmitOnErrors: true,
  },
  devServer: {
    hot: true,
    hotOnly: true,
    open: true,
    inline: true,
    stats: {
      children: false,
      modules: false,
      chunks: false,
    },
    progress: true,
    port: 8080,
  },
});
