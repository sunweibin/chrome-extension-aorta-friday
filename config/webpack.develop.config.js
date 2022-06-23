const { merge } = require('webpack-merge');
const path = require('path');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 10000,
  //   ignored: /node_modules/,
  // },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
  },
  devtool: 'cheap-module-source-map'
});
