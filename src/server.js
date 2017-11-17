import express from 'express';   
import qs from 'qs';     
const app = express();                 
import bodyParser from 'body-parser';
import cors from 'cors';
import template from './serverTemplate.js';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter , Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import saga from './sagas';

import {Routes} from './routes';

import path from 'path';

// import './polyfill';
import configureStore from './configureStore';

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(cors());
// app.use('/',express.static(path.join(__dirname, '../')));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '/')));
var port = process.env.PORT || 3083;       

// ROUTES
// =============================================================================
var router = express.Router();              

router.use(function(req, res, next) {
    next();
});

app.get('/*', function(req, res) {
  const store = configureStore({});
  const context = {};
  const app = <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Routes/>
      </StaticRouter>
    </Provider>;

  store.runSaga(saga).done.then(() => {
    const html = renderToString(app);

    if (context.url) {
      return res.redirect(context.url);
    }

    const preloadedState = store.getState();

    return res.send(template({html, preloadedState}));
  });

  renderToString(app);

  store.close();
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server OK, port ' + port);


