var path = require('path');
var webpack = require('webpack');
require('babel-polyfill');

module.exports =
{
  watch: true,

  entry: './source/app/index.js',

  output: {
    path: path.join(__dirname, 'build/app'),
    filename: 'index.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unsafe: false
      },
      comments: false
    }),
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'source/app'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-1'],
        cacheDirectory: true
      },
      exclude: /node_modules/
    }]
  },

  resolve: {
    alias: {
    },
    modules: [
      'node_modules',
      path.join(__dirname, 'source', 'app'),
    ],
    extensions: ['.js'],
  },
};