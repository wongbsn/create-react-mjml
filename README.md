# create-react-mjml

Develop MJML code using React.

## Install

Run `npm install`.

```bash
npm install
```

## Development

Run `npm run start` and start developing in `/src`. Place all assets in `/assets` - do not change the name of this directory. See [Asset Directory Name](#asset-directory-name) to modify the output of paths for assets.

```bash
npm start
```

## Build

To get the resulting output for your code, run `npm run build`. This will create an `index.mjml` and an `index.html` file into the `/build` directory as well as copy all the assets from `/assets`.

```bash
npm run build
```

### Asset Directory Name

If you prefer your assets in a directory, pass in a directory name with `--assetDir`. This will change all paths and copy your assets in the specified directory name.

```bash
yarn build --assetDir images
```
```html
<!-- Changed directory -->
<mj-image src="images/example.jpeg" />
```

If your assets are external, you can pass in a `url` to `--assetUri` to prefix all assets with this `url`.

```bash
yarn build --assetUri https://cdn.com
```
```html
<!-- Changed directory -->
<mj-image src="https://cdn.com/example.jpeg" />
```

```bash
yarn build --assetPath images --assetUri https://cdn.com
```
```html
<!-- Changed directory -->
<mj-image src="https://cdn.com/example.jpeg" />
```