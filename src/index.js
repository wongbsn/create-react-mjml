import React from 'react';
import { renderToString } from 'react-dom/server';
import axios from 'axios';

import MJML from './Mjml';

const renderApp = () =>
  axios.post('/mjml', { mjml: renderToString(<MJML />) }).then(res => {
    document.open();
    document.write(res.data.html);
    document.close();
  });

renderApp();

if (module.hot) {
  module.hot.accept();
}
