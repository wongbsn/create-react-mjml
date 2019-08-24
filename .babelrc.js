const path = require('path');

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '~': './src',
          '@assets': path.join(__dirname, 'assets')
        }
      }
    ]
  ]
};
