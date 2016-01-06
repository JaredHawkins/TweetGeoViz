var webpack = require('webpack');
var devConfig = require('./webpack.config.js');

devConfig.plugins = devConfig.plugins || [];

devConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());

devConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
}));

devConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compressor: {
    warnings: false
  }
}));

module.exports = devConfig;
