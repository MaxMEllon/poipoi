'use strict';

const webpack = require('webpack');
const path = require('path');
const { name } = require('./package.json');
const pascalCase = require('pascal-case');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const configs = [{
  entry: {
    app: [
      './src/index',
    ],
  },
  output: {
    path: `${__dirname}/public/`,
    filename: `${name}.js`,
    publichPath: '/public/',
    library: pascalCase(name),
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json'],
  },
  devtool: 'eval',
  devServer: {
    contentBase: 'release',
    noInfo: true,
    quiet: true,
  },
}];

switch (process.env.NODE_ENV) {
  case 'production':
    configs[0].plugins = [
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ];

    configs[0].devtool = '#source-map';
    break;

  default:
    // configs[0].plugins = [
    //   new webpack.HotModuleReplacementPlugin()
    // ];
    configs[0].devtool = 'inline-source-map';
}

module.exports = configs;
