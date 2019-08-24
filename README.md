# create-react-mjml

Develop MJML code using React.

```js
import React from 'react';
import Card from '~/components/Card';
import exampleImage from '@assets/example.jpeg';

const Mjml = () => (
  <mjml>
    <mj-head>
      <mj-attributes>
        <mj-all font-family="Arial, Helvetica" font-size="20px" />
      </mj-attributes>
      <mj-style>
      {`
        @media only screen and (max-width: 449px) {
          .card {
            display: none;
          }
        }
      `}
      </mj-style>
    </mj-head>
    <mj-body>
      <Card>
        <mj-image src={exampleImage} width="450px" alt="example" />
      </Card>
    </mj-body>
  </mjml>
);

export default Mjml;
```

## Install

Run `npm install`.

```bash
npm install
```

## Development

Run `npm run start` and start developing in `/src`. Place all assets in `/assets` - do not change the name of this directory. See [Build Asset Paths](#build-asset-paths) to modify the build paths for assets.

```bash
npm start
```

## Build

To get the resulting output for your code, run `npm run build`. This will create an `index.mjml` and an `index.html` file into the `/build` directory as well as copy all the assets from `/assets`.

```bash
npm run build
```

### Build asset paths

Your can changes the build asset path by passing in additional options.

#### Asset Directory

If you prefer your assets in a directory, pass in a directory name with `--assetDir`. This will change all paths and copy your assets in the specified directory name.

```bash
npm run build -- --assetDir images
```
```html
<!-- Prefixed with directory name -->
<mj-image src="images/example.jpeg" />
```
#### Asset URI

If your assets are external, you can pass in a `uri` to `--assetUri` to prefix all assets with this `url`.

```bash
npm run build -- --assetUri https://cdn.com
```
```html
<!-- Assets are prefixed with URI -->
<mj-image src="https://cdn.com/example.jpeg" />
```