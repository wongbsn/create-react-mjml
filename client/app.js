import React from 'react';
import PrismJS from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import { renderToString } from 'react-dom/server';
import axios from 'axios';

import MJML from '../src/Mjml';

const highlightCode = code =>
  `<pre class="language-html"><code class="language-html">${PrismJS.highlight(
    code,
    PrismJS.languages.html
  )}</code></pre>`;

const directRender = html => {
  document.open();
  document.write(html);
  document.close();
};

const renderApp = () =>
  axios
    .post('/parse', { mjml: renderToString(<MJML />) })
    .then(({ data: { html, mjml, errors } }) => {
      const { pathname } = window.location;
      const root = document.getElementById('root');

      if(root) {
        root.classList.add('app');
      }
      
      if (errors.length) {
        directRender(`<h1 style="color:black;font-size:20px;margin:30px 0 10px;">Mjml Parsing Errors:</h1>
            <pre style="display:inline-block;border: 3px solid black;color:red;font-size:16px;padding:20px 25px;background:#efefef;">${JSON.stringify(
              errors,
              null,
              2
            )}</pre>`);
      } else {
        switch (pathname) {
          case '/mjml':
            root.innerHTML = highlightCode(mjml);
            break;
          case '/html':
            root.innerHTML = highlightCode(html);
            break;
          default:
            directRender(html);
        }
      }
    });

export default renderApp;
