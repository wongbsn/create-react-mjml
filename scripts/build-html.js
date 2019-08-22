require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const fs = require('fs');
const path = require('path');
const format = require('js-beautify').html;
const { default: render } = require('../server/render');
const outputPath = path.join(__dirname, '../output/index.html');
const { html } = render();

fs.writeFileSync(outputPath, format(html));
console.log(`Html successfully written to ${outputPath}`);
