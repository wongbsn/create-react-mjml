import React from 'react';
import { renderToString } from 'react-dom/server';
import parse from './parse';

import Mjml from '../src/Mjml';

function render() {
  const reactMjml = renderToString(<Mjml />);
  const { mjml, html, errors } = parse(reactMjml);

  if (errors.length) {
    throw new Error(`Mjml parsing errors: ${JSON.stringify(errors)}`);
  }

  return { html, mjml };
}

export default render;
