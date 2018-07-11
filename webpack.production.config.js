const webpack = require('webpack');
const config = require('./webpack.config.js');

config.devtool = false;

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  })
]);

module.exports = config;
