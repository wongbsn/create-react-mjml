import React from 'react';
import { renderToString } from 'react-dom/server';
import mjml2html from 'mjml';

import Mjml from '../src';

function render() {
  const mjml = renderToString(<Mjml />)
    // TODO: Use a better replace method - look only between <mj-raw></mj-raw>
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, `"`)
    .replace(/&#x27;/g, `'`)
    .replace(/&amp;/g, `&`);
  const { html, errors } = mjml2html(mjml);

  return { mjml, html: html.trim(), errors };
}

export default render;
