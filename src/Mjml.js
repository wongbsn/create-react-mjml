import React from 'react';
import Article from '~/sections/Article';

const Mjml = () => (
  <mjml>
    <mj-head>
      <mj-attributes>
        <mj-all font-family="Arial, Helvetica" font-size="20px" />
      </mj-attributes>
    </mj-head>
    <mj-body>
      <Article />
    </mj-body>
  </mjml>
);

export default Mjml;