import fs from 'fs-extra';
import path from 'path';
import express from 'express';
import http from 'http';

// const webpack = require('webpack');
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';

import render from './render';


const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const router = express.Router();

config.entry.app.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');

//Add HMR plugin
config.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(config);

//Enable "webpack-dev-middleware"
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

//Enable "webpack-hot-middleware"
app.use(webpackHotMiddleware(compiler));


router.use('^/$', (req, res, next) => {
  fs.readFile(
    path.resolve('./public/index.html'),
    'utf8',
    (serverError, data) => {
      if (serverError) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      try {
        const { html, errors } = render();

        if (errors.length) {
          throw new Error(`Mjml parsing errors: ${JSON.stringify(errors)}`);
        }

        return res.send(
          data.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        );
      } catch (error) {
        return res.send(error.stack);
      }
    }
  );
});

router.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use(router);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// reload(app)
//   .then(function() {
//     server.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch(function(err) {
//     console.error(
//       'Reload could not start, could not start server/sample app',
//       err
//     );
//   });
