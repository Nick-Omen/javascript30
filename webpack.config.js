const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const entries = fs.readdirSync('./src/days/').reduce((obj, dir) => {
  obj[`days/${dir}/index`] = path.resolve(__dirname, 'src', 'days', dir, 'index.js');
  return obj;
}, {
  index: './src/index.js',
});

module.exports = {
  entry: entries,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: ['last 2 versions', '> 2%']
                }
              }]
            ],
            plugins: ['syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.(png|svg|jpe?g|gif|wav)$/,
        exclude: /node_modules/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};