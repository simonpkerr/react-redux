/* eslint-disable no-console */
import express from 'express';
import open from 'open';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
var ReactEngine = require('express-react-engine');
import {useRouterHistory, RouterContext, match} from 'react-router';
import {createMemoryHistory, useQueries} from 'history';

import webpack from 'webpack';
var config = require('../../webpack.config.dev');

import configureStore from '../store/configureStore';
import createRoutes from '../routes';

import {Provider} from 'react-redux';

const port = 3000;
let server = express();
let scriptSrcs;
let styleSrc;

// scriptSrcs = [
//     'http://localhost:3001/static/app.js',
//     'http://localhost:3001/static/dev.js',
//     'http://localhost:3001/static/bundle.js'
// ];
// styleSrc = '/styles.css';

process.env.ON_SERVER = true;

const compiler = webpack(config);
server.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
server.use(require('webpack-hot-middleware')(compiler));

server.set('views', __dirname + '/views');
server.engine('jsx', ReactEngine());

server.get('*', (req, res, next) => {
    let history = useRouterHistory(useQueries(createMemoryHistory))();
    let store = configureStore();
    let routes = createRoutes(history);
    let location = history.createLocation(req.url);

    //from react-router
    match({routes, location}, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.status(500).send(error.message);
        } else if (renderProps == null) {
            res.status(404).send('not found');
        } else {

            // let [getCurrentUrl]

            // get the required data from all required components (global and page level) that matched the route
            Promise.all(getReduxPromise()).then(() => {
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
                //renderProps contains a list of all rendered components including global and page specific ones
                let globalComponent = renderProps.components[1].WrappedComponent;
                let pageComponent = renderProps.components[renderProps.components.length - 1].WrappedComponent;

                let globalPromise = globalComponent.fetchData ?
                    globalComponent.fetchData({query, params, store, history}) :
                    Promise.resolve();

                let pagePromise = pageComponent.fetchData ?
                    pageComponent.fetchData({query, params, store, history}) :
                    Promise.resolve();

                return [globalPromise, pagePromise];

                // return promise;
            }
        }
    });


    // res.sendFile(path.join( __dirname, '../src/index.html'));
});

server.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('listening on port ' + port);
        open(`http://localhost:${port}`);
    }
});


// server.get('/api/courses/')