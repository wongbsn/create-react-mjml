const React = require('react');
const { renderToString } = require('react-dom/server');
const parse = require('./parse');

const { default: Mjml } = require('../src/Mjml');

function render() {
  const reactMjml = renderToString(<Mjml />);
  const { mjml, html, errors } = parse(reactMjml);

  if (errors.length) {
    throw new Error(`Mjml parsing errors: ${JSON.stringify(errors)}`);
  }

  return { html, mjml };
}

module.exports = render;
