const mjml2html = require('mjml');

// Children under these tags will have their html entites
// replaced with their corresponding character
const templateTags = ['mj-raw', 'mj-style'];
const characterEntityMap = {
  '&gt;': `>`,
  '&lt;': `<`,
  '&quot;': `"`,
  '&#x27;': `'`,
  '&amp;': `&`
};
const entities = Object.keys(characterEntityMap);
const getTagRegExp = tag =>
  new RegExp(`<${tag}(?:.*?)>(\\s|.)*?<\\/${tag}>`, 'g');
const getEntityRegExp = entity => new RegExp(entity, 'g');

function parse(reactMjml, options) {
  let mjml = reactMjml;

  templateTags.forEach(tag => {
    const tagRegExp = getTagRegExp(tag);
    const matches = mjml.match(tagRegExp);

    if (matches) {
      matches.forEach(match => {
        const replacementString = entities.reduce(
          (result, entity) =>
            result.replace(getEntityRegExp(entity), characterEntityMap[entity]),
          match
        );

        mjml = mjml.replace(match, replacementString);
      });
    }
  });

  const { html, errors } = mjml2html(mjml, options);

  return { mjml, html: html.trim(), errors };
}

module.exports = parse;
