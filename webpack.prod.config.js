'use strict';

var webpack = require('webpack');
var config = require('./webpack.base.config.js');
var update = require('react/lib/update');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var CleanWebpackPlugin = require('clean-webpack-plugin');

var SCRIPTS_PATH = 'server/static/scripts';
var TEMPLATES_PATH = 'server/static';

config = update(config, {
  bail: { $set: true },

  entry: { $set: ['./client/entry'] },

  debug: { $set: false },

  profile: { $set: false },

  devtool: { $set: '#source-map' },

  output: {
    $set: {
      path: SCRIPTS_PATH,
      pathInfo: true,
      publicPath: '/static/scripts/',
      filename: 'bundle.[hash].min.js'
    }
  },

  plugins: {
    $push: [
      new CleanWebpackPlugin([SCRIPTS_PATH, TEMPLATES_PATH]),

      // new webpack.optimize.DedupePlugin(),
      
      // new webpack.optimize.UglifyJsPlugin({ 
      //   output: { comments: false },
      //   sourceMap: false,
      //   mangle: false 
      // }),

      // new webpack.optimize.UglifyJsPlugin({
      //     compress: {
      //         warnings: true
      //     }
      // }),
      new HtmlWebpackPlugin({
        inject: true,
        filename: '../../static/index.html',
        template: 'client/views/index.tpl'
      }),
    ]
  },

  module: {
    loaders: {
      $push: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'stage-0', 'react']
          }
        },
        {
          test: /\.scss$/,
          loaders: [
              'style',
              'css',
              'autoprefixer?browsers=last 3 versions',
              'sass?outputStyle=expanded'
          ]
        }
      ]
    }
  },

});

module.exports = config;
