import React from 'react';
import { hydrate } from 'react-dom';
import MJML from './Mjml';

// console.log('HERE');

// const renderApp = () =>
//   console.log('=========>') || hydrate(<MJML />, document.getElementById('root'));

// renderApp();

if (module.hot) {
  module.hot.accept('./Mjml', () => {
    console.log('HERE')
  });
}

if(global.window) {
  // global.window.location.reload();
}
