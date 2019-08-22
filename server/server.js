import fs from 'fs-extra';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import mjml2html from 'mjml';

import config from '../webpack.config';

import render from './render';

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const router = express.Router();

// Configure webpack with HMR
config.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

// Transforms mjml data and returns html
router.post('/mjml', (req, res, next) => res.send(mjml2html(req.body.mjml)));

router.use('^/$', (req, res, next) => {
  fs.readFile(path.resolve('./public/index.html'), 'utf8', (serverError, data) => {
    if (serverError) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      const { html, errors } = render();

      if (errors.length) {
        throw new Error(`Mjml parsing errors: ${JSON.stringify(errors)}`);
      }

      return res.send(data.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
    } catch (error) {
      return res.send(error.stack);
    }
  });
});

router.use(express.static(path.resolve(__dirname, '..', 'public')));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
