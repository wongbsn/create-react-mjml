import fs from 'fs-extra';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { html as format } from 'js-beautify';
import he from 'he';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config';
import parse from '../mjml/parse';

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
router.post('/parse', (req, res, next) => {
  const formattedMjml = format(req.body.mjml).replace(
    / data-reactroot=""/g,
    ''
  );
  const result = parse(formattedMjml);

  if (result.errors.length) {
    result.errors = result.errors.map(({ line, tagName, message }) => {
      const linesToPrint = formattedMjml.split('\n').splice(line - 2, 3);
      const leastSpaces = linesToPrint.reduce((lowest, l, i) => {
        let spaces = 0;

        while (l[spaces] === ' ') {
          spaces += 1;
        }

        return i ? Math.min(lowest, spaces) : spaces;
      }, null);

      return {
        line,
        tagName,
        message,
        sample: linesToPrint.map((string, index) => {
          let output = `[${line - 1 + index}]: ${he.encode(
            string.replace(new RegExp(`^\\s{${leastSpaces}}`), '')
          )}`;

          if (index === 1) {
            output = `<b>${output}</b>`;
          }

          return output;
        })
      };
    });
  }

  return res.send({
    ...result,
    mjml: formattedMjml
  });
});

router.use('^/*$', (req, res, next) =>
  res.send(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>Create React MJML</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            html, body, #root {
              width: 100%;
              height: 100%;
              margin: 0;
            }

            body {
              overflow: hidden;
            }

            .app {
              overflow: scroll;
            }

            .markup {
              background-color: #141414;
            }

            pre {
              margin: 0 !important;
              border: none !important;
              border-radius: 0 !important;
              min-height: 100%;
            }

            code {
              font-size: 14px !important;
              transform: translateZ(0) !important;
            }
          </style>
        </head>
        <body >
          <div id="root"></div>
          <script src="app.js"></script>
        </body>
      </html>`
  )
);

router.use(express.static(path.resolve(__dirname, '..', 'public')));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
