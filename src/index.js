import React from 'react';
import { render } from 'react-dom';
import { app } from './main';
import { AppContainer } from 'react-hot-loader';

const rootEl = document.getElementById('root');

render(
  <AppContainer>
    { app }
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./main', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./main').app;

    render(
      <AppContainer>
         { NextApp }
      </AppContainer>,
      rootEl
    );
  });
}
