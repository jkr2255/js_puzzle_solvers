'use strict';

const base = require('./webpack.config.base');

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const merge = require('webpack-merge');

module.exports = merge(base, {
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.optimize.AggressiveMergingPlugin,
    new UglifyJSPlugin({test: /(\.js|\.tag)$/})
  ]
});
