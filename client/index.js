import renderContainer from './container';
import renderApp from './app';

if(window.location.pathname === '/') {
  renderContainer();
} else {
  renderApp();
}

if (module.hot) {
  module.hot.accept();
}
