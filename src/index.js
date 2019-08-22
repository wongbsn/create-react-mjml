import React from 'react';

const MJML = () => (
  <mjml>
    <mj-head>
      <mj-attributes>
        <mj-all font-family="Arial, Helvetica" font-size="16px" />
      </mj-attributes>
    </mj-head>
    <mj-body>
      <mj-section background-color="#f3f3f3">
        <mj-column>
          <mj-image width="300px" src="./images/example.jpeg" />
        </mj-column>
        <mj-column>
          <mj-text
            font-weight="bold"
            align="justify"
            font-size="24px"
            color="#000"
          >
            Article Title
          </mj-text>
          <mj-text align="justify" font-size="15px" color="#000">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            sit amet ipsum consequat.
          </mj-text>
          <mj-button
            align="left"
            background-color="#8ccaca"
            border-radius="40px"
            font-size="12px"
          >
            READ MORE
          </mj-button>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
);

export default MJML;
