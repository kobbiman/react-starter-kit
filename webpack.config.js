/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';

import BrowsersyncPlugin from 'browser-sync-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default function ({ development }) {
  return {
    devtool: development ? 'inline-source-map' : 'source-map',
    entry: [
      path.resolve(__dirname, 'src/index'),
    ],
    target: 'web',
    output: development ? {
      path: path.resolve(__dirname, 'src'),
      publicPath: '/',
      filename: 'bundle.js',
    } : {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: development ? [
      new BrowsersyncPlugin({
        host: 'localhost',
        port: 9090,
        proxy: 'http://localhost:8080/',
      }),
      // Generate HTML file that contains references to generated bundles
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        inject: true,
      }),
    ] : [
      // Minify JS
      new webpack.optimize.UglifyJsPlugin(),
      // Generate HTML file that contains references to generated bundles
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        inject: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
}
