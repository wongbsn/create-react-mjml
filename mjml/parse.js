import mjml2html from 'mjml';

function parse(reactMjml) {
  const mjml = reactMjml
    // TODO: Use a better replace method - look only between <mj-raw></mj-raw>
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, `"`)
    .replace(/&#x27;/g, `'`)
    .replace(/&amp;/g, `&`);
  const { html, errors } = mjml2html(mjml);

  return { mjml, html: html.trim(), errors };
}

export default parse;
