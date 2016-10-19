// index.js is a convention that is used to create all reducers

import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';


// short hand es6 object notation (short hand property names)
// since the left and right side of 'courses' = courses,
// there is only need to define one side. the other side is implied
const rootReducer = combineReducers({
    courses,
    authors,
    ajaxCallsInProgress,
    routing: routerReducer

});

export default rootReducer;
