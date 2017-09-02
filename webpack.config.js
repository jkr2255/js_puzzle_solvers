'use strict';

const path = require('path');
const globSync = require('glob').sync;
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const entries = {};

const basepath = path.resolve(__dirname, "src");

globSync('./*.js', {cwd: basepath}).forEach((name) => {
  const key = /\/(.*)\.js$/.exec(name)[1];
  entries[key] = name;
});

module.exports = {
  context: basepath,
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'gen')
  },
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /(\.js|\.tag)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tag$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        query: {
          hot: false
        }
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  },
  resolve: {
    extensions: [".js", ".tag"]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.optimize.AggressiveMergingPlugin,
    new UglifyJSPlugin({test: /(\.js|\.tag)$/})
  ],
  cache: true
};
