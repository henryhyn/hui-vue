const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const config = require('./webpack.config.js');

config.devtool = false;

config.optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      extractComments: false
    }),
    new CssMinimizerPlugin()
  ],
  splitChunks: {
    minChunks: 2
  }
};

module.exports = config;
