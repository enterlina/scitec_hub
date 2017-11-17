import 'whatwg-fetch';
import './polyfill';

import React from "react";
import ReactDOM, {hydrate} from 'react-dom';
import { AppContainer } from "react-hot-loader";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import {Routes} from './routes';

require("./components/scss/fonts.scss");
require("./components/scss/core.scss");
require("./components/scss/utils.scss");
require("./components/scss/layout.scss");
require("./components/scss/header.scss");
require("./components/scss/footer-to-bottom.scss");
require("./components/scss/normalize.scss");

const rootEl = document.getElementById("root");
const history = createHistory();

import configureStore from './configureStore';

history.listen(() => {
  window.scrollTo(0, 0);
})

import reducer from './reducers';

const store = configureStore(window.__PRELOADED_STATE__);

delete window.__PRELOADED_STATE__;

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter >
  </Provider>,
  rootEl
);



