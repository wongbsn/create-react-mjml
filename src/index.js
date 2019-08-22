import React from 'react';
import Article from '~/sections/Article';

const MJML = () => (
  <mjml>
    <mj-head>
      <mj-attributes>
        <mj-all font-family="Arial, Helvetica" font-size="16px" />
      </mj-attributes>
    </mj-head>
    <mj-body>
      <Article />
    </mj-body>
  </mjml>
);

export default MJML;
