'use strict';

const base = require('./webpack.config.base');

const merge = require('webpack-merge');

module.exports = merge(base, {
  watch: true,
  devtool: 'source-map'
});
