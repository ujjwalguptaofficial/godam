const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.css?$/,
      use: 'css-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bin/')
  },
  plugins: [
    new HtmlWebPackPlugin({
      cache: true,
      hash: true,
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    })
  ]
};