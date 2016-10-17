/* eslint-disable no-console */
import express from 'express';
import open from 'open';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
// var ReactEngine = require('express-react-engine');
// import {useRouterHistory, RouterContext, match} from 'react-router';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

// import {createMemoryHistory, useQueries} from 'history';
import {useQueries} from 'history';

// import webpack from 'webpack';
// var config = require('../../webpack.config.dev');

import configureStore from '../store/configureStore';
import createRoutes from '../routes';

import {Provider} from 'react-redux';

const port = 3000;

let app = express();
app.use('/public', express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//set up api endpoints??


// const compiler = webpack(config);
// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));
// app.use(require('webpack-hot-middleware')(compiler));

// app.set('views', __dirname + '/views');
// app.engine('jsx', ReactEngine());

const HTML = ({content, store}) => (
    <html>
    <head>
        <link rel='stylesheet' type='text/css' href='/public/style.css'/>
    </head>
    <body>
        <div id='root' dangerouslySetInnerHTML={{__html: content}}/>
        <script dangerouslySetInnerHTML={{__html: `window.__REDUX_STATE__=${JSON.stringify(store.getState())};`}}/>
        <script src='/public/vendor.js'/>
        <script src='/public/bundle.js'/>
    </body>
    </html>
)

app.use(function (req, res) {
    // let history = useRouterHistory(useQueries(createMemoryHistory))();
    const memoryHistory = createMemoryHistory(req.path);
    let store = configureStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store)

    let routes = createRoutes(history);
    // let location = history.createLocation(req.url);

    //from react-router
    match({ history, routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.status(500).send(error.message);
        } else if (renderProps == null) {
            res.status(404).send('not found');
        } else {

            // let [getCurrentUrl]

            // get the required data from all required components (global and page level) that matched the route
            Promise.all(getReduxPromises()).then(() => {
                // let reduxState = escape(JSON.stringify(store.getState()));
                let content = ReactDOMServer.renderToString(
                    <Provider store={store}>
                        { <RouterContext {...renderProps } /> }
                    </Provider>
                );

                // res.render('Layout.jsx', {html, reduxState});
                res.send('<!doctype html>\n' + ReactDOMServer.renderToString(<HTML content={content} store={store}/>));


            }).catch(function (error) {
                console.log(error.stack);
            });
            function getReduxPromises() {
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

                return [...globalPromise, pagePromise];

                // return promise;
            }
        }
    });


    // res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});


// app.get('/api/courses/')