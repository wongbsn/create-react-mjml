const fs = require('fs-extra');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const format = require('js-beautify').html;
const babelConfig = require('../.babelrc');
const outputDir = path.join(__dirname, '../build');
const CWD = process.cwd();
const assetDir = argv.assetDir ? path.join(argv.assetDir, '/') : '';
const assetUri = argv.assetUri
  ? argv.assetUri.replace(/\/?$/, assetDir ? '/' : '')
  : '';

require('@babel/register')({
  ...babelConfig,
  plugins: [
    ...babelConfig.plugins,
    [
      'transform-assets-import-to-string',
      {
        baseDir: assetDir && assetUri ? assetDir : assetDir ? CWD : assetDir,
        baseUri: assetUri
      }
    ]
  ]
});

const render = require('../mjml/render');
const { mjml, html } = render();

const replaceImportPath = string => {
  const replaceRegExp = new RegExp(path.join(CWD, 'assets/'), 'g');
  const dir = assetUri ? '/' : assetDir ? assetDir : '';

  return string.replace(replaceRegExp, dir);
};

const outputMjml = replaceImportPath(mjml);
const outputHtml = replaceImportPath(html);

fs.removeSync(outputDir);

Promise.all([
  fs.outputFile(path.join(outputDir, 'index.mjml'), format(outputMjml)),
  fs.outputFile(path.join(outputDir, 'index.html'), format(outputHtml)),
  assetUri
    ? Promise.resolve()
    : fs.copy(path.join(__dirname, '../assets'), path.join(outputDir, assetDir))
]).then(() => {
  console.log(`Build successfully written to ${outputDir}`);
});
