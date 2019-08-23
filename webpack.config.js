const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    host: `localhost`
  },
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true&timeout=1000',
      './src/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: `[name].js`
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/')
    }
  }
};
