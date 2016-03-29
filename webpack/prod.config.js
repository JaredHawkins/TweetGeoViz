'use strict';

var config = require('./common.config.js');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var version = require('../package.json').version;

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compressor: {
      warnings: false
    }
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    APP_VERSION: JSON.stringify(version)
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './static/templates/index.html',
    inject: true,
    favicon: './static/images/favicon.ico'
  })
];

module.exports = config;
