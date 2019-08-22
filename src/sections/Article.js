import React from 'react';
import Button from '~/components/Button';

const Article = () => (
  <mj-section background-color="#f3f3f3">
    <mj-column>
      <mj-image width="300px" src="./images/example.jpeg" />
    </mj-column>
    <mj-column>
      <mj-text font-weight="bold" align="justify" font-size="24px" color="#000">
        Article Title
      </mj-text>
      <mj-text align="justify" font-size="15px" color="#000">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet ipsum consequat.
      </mj-text>
      <Button align="left">
        READ MORE
      </Button>
    </mj-column>
  </mj-section>
);

export default Article;
