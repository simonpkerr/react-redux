import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../../webpack.config.dev';
import open from 'open';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
var ReactEngine = require('express-react-engine');
import { useRouterHistory, RouterContext, match } from 'react-router';
import { createMemoryHistory, useQueries } from 'history';

import configureStore from '../store/configureStore';
import createRoutes from '../routes';

import { Provider } from 'react-redux';

/* eslint-disable no-console */

const port = 3000;
let server = express();
let scriptSrcs;
let styleSrc;

process.env.ON_SERVER = true;


//extract this out to the webpack.server.js file
const compiler = webpack(config);
server.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
//server.use(require('webpack-hot-middleware')(compiler));

// server.set('views', path.join(__dirname, 'views'));
// server.set('view engine', 'jsx');
server.set('views', __dirname + '/views');
server.engine('jsx', ReactEngine());

server.get('*', (req, res, next) => {
    let history = useRouterHistory(useQueries(createMemoryHistory))();
    let store = configureStore();
    let routes = createRoutes(history);
    let location = history.createLocation(req.url);

    //from react-router
    match({ routes, location }, (error, redirectLocation, renderProps) => {
    //    do other stuff like error checking redirection etc
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.status(500).send(error.message);
        } else if (renderProps == null) {
            res.status(404).send('not found');
        } else {

            // let [ getCurrentUrl]

            // get the required data from the component that matched the route
            getReduxPromise().then(() => {
                let reduxState = escape(JSON.stringify(store.getState()));
                let html = ReactDOMServer.renderToString(
                    <Provider store={store}>
                        { <RouterContext {...renderProps } /> }
                    </Provider>
                );

                res.render('Layout.jsx', {html, scriptSrcs, reduxState, styleSrc});

            });
            function getReduxPromise() {
                /*
                 uses destructured arguments
                 https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
                 allows the result of an assignment to be put in specific objects or arrays

                 below...
                 renderProps returns an object with at least 2 properties
                 'query' becomes the first property
                 'params' becomes the second property
                 */
                let {query, params} = renderProps;

                // need to check if component is actually wrapped or not, some may not need connect
                let component = renderProps.components[renderProps.components.length - 1].WrappedComponent;

                let promise = component.fetchData ?
                    component.fetchData({query, params, store, history}) :
                    Promise.resolve();

                return promise;
            }
        }
    });


    // res.sendFile(path.join( __dirname, '../src/index.html'));
});

server.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});


// server.get('/api/courses/')