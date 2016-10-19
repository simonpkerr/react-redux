/* eslint-disable import/default */
/* eslint-disable no-console */

import 'babel-polyfill';  //used for es6 features that can't be transpiled
import React from 'react';
import ReactDOM from 'react-dom';
// import configureStore from './store/configureStore';
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux';
//uses pushState for modern browsers to avoid # urls
import {Router, browserHistory} from 'react-router';
import { createLogger } from 'redux-logger';
// import useScroll from 'scroll-behavior/lib/useStandardScroll'

import rootReducer from './reducers';
import routes from './routes';
// import createRoutes from './routes/index';

import Immutable from 'immutable';
import _ from 'lodash';

// import '../styles/styles'; //import css files into the page
// import '../../node_modules/bootstrap/dist/css/bootstrap.min';
// import '../../node_modules/toastr/build/toastr.min';

/*
the server.js gets the store from the server with no initial state.
on the client side, it checks if the redux state variable has been populated
if it has, no need to go and get it again
 */
let reduxState = {};
if (window.__REDUX_STATE__) {
    try {
        let plain = JSON.parse(unescape(__REDUX_STATE__));
        _.each(plain, (val, key)=> {
            // reduxState[key] = Immutable.fromJS(val);
            reduxState[key] = val;
        });
    } catch (e) {
        console.log(e);
    }
}

const logger = createLogger({
    predicate: (getState, action) => action.type !== 'FETCHING'
})

// const reducer = combineReducers({
//     ...reducers,
//     routing: routerReducer
// })

const store = createStore(rootReducer, reduxState, applyMiddleware(thunk, logger))
const scrollHistory = useScroll(() => browserHistory)()
const history = syncHistoryWithStore(scrollHistory, store)


// uses redux state populated from server to get initial state
// const store = configureStore(reduxState);

//provider hooks up all components with the main store automatically
ReactDOM.render((
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>
    ),
    document.getElementById('app'));


//{ createRoutes(browserHistory) }