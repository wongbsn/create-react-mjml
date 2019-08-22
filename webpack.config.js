const path = require('path');
const webpack = require('webpack');
const babelConfig = require('./.babelrc');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    host: `localhost`
  },
  entry: {
    app: ['webpack-hot-middleware/client?reload=true&timeout=1000', './src/index.js']
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
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig
          }
        ]
      }
    ]
  },
  plugins: [
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/')
    }
  }
};
