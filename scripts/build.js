require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const fs = require('fs-extra');
const path = require('path');
const format = require('js-beautify').html;
const { render } = require('../mjml');
const outputDir = path.join(__dirname, '../build');

const { mjml, html } = render();

Promise.all([
  fs.outputFile(path.join(outputDir, 'index.mjml'), format(mjml)),
  fs.outputFile(path.join(outputDir, 'index.html'), format(html)),
  fs.copy('./public/images', path.join(outputDir, 'images'))
]).then(() => {
  console.log(`Build successfully written to ${outputDir}`);
});
