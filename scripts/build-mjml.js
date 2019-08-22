require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const fs = require('fs');
const path = require('path');
const format = require('js-beautify').html;
const { default: render } = require('../server/render');
const outputPath = path.join(__dirname, '../output/index.mjml');
const { mjml } = render();

fs.writeFileSync(outputPath, format(mjml));
console.log(`Mjml successfully written to ${outputPath}`);
