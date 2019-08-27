const mjml2html = require('mjml');
const he = require('he');

// Children under these tags will have their html entites
// replaced with their corresponding character
const templateTags = ['mj-raw', 'mj-style'];
const getTagRegExp = tag =>
  new RegExp(`<${tag}(?:.*?)>(\\s|.)*?<\\/${tag}>`, 'g');

function parse(reactMjml, options) {
  let mjml = reactMjml.replace(/ data-reactroot=""/g, '');

  templateTags.forEach(tag => {
    const tagRegExp = getTagRegExp(tag);
    const matches = mjml.match(tagRegExp);

    if (matches) {
      matches.forEach(match => {
        mjml = mjml.replace(match, he.decode(match));
      });
    }
  });

  const { html, errors } = mjml2html(mjml, options);

  return { mjml, html: html.trim(), errors };
}

module.exports = parse;
