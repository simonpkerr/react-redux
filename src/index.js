import 'babel-polyfill';  //used for es6 features that can't be transpiled
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
//uses pushState for modern browsers to avoid # urls
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import { loadCourses } from './actions/courseActions';
import { loadAuthors } from './actions/authorActions';

import './styles/styles.css'; //import css files into the page
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

//could pass in initialState to the store here if
// getting updated state from server or localStorage
const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

//provider hooks up all components with the main store automatically
render (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
