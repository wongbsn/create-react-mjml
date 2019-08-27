const path = require('path');
const babelConfig = require('./.babelrc');

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
      './client/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelConfig
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
      '@assets': path.resolve(__dirname, 'assets/')
    }
  }
};
