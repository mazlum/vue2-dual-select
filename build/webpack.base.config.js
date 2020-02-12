const path = require('path');
const webpack = require('webpack');
const eslintFriendFormatter = require('eslint-friendly-formatter');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const env = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development';

const devtool = env === 'production' ? 'source-map' : 'eval-source-map';

module.exports = {
  devtool,
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        // include: [resolve('src')],
        options: {
          formatter: eslintFriendFormatter,
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    }),
    new VueLoaderPlugin()
  ]
};


