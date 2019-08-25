import React from 'react';
import { renderToString } from 'react-dom/server';
import axios from 'axios';

import MJML from '../src/Mjml';

const render = () =>
  axios
    .post('/mjml', { mjml: renderToString(<MJML />) })
    .then(({ data: { html, errors } }) => {
      let result = html;

      
      if (errors.length) {
        window.lll = errors;
      
        result = `<h1 style="color:black;font-size:20px;margin:30px 0 10px;">Mjml Parsing Errors:</h1>
        <pre style="display:inline-block;border: 3px solid black;color:red;font-size:16px;padding:20px 25px;background:#efefef;">${JSON.stringify(
          errors,
          null,
          2
        )}</pre>`;
      }

      document.open();
      document.write(result);
      document.close();
    });

render();

if (module.hot) {
  module.hot.accept();
}
