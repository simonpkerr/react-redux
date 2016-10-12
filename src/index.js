/* eslint-disable import/default */
/* eslint-disable no-console */

import 'babel-polyfill';  //used for es6 features that can't be transpiled
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
//uses pushState for modern browsers to avoid # urls
import {Router, browserHistory} from 'react-router';
import routes from './routes/index';

import Immutable from 'immutable';
import _ from 'lodash';

import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';

import './styles/styles.css'; //import css files into the page
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

//where is REDUX_STATE set?
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
            reduxState[key] = Immutable.fromJS(val);
        });
    } catch (e) {
        console.log(e);
    }
}

//could pass in initialState to the store here if
// getting updated state from server or localStorage
const store = configureStore(reduxState);
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

//provider hooks up all components with the main store automatically
render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);
