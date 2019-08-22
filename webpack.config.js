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
    app: ['./src/index.js']
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
  plugins: [],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/')
    }
  }
};
