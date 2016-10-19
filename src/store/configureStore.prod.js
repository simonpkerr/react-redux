import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import rootReducer from '../reducers';
import * as reducers from '../reducers';
//used for asynch calls to and from an api
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';


export default function configureStore (memoryHistory, initialState) {
    console.log('configging store');
    const reducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });
    return createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(thunk, routerMiddleware(memoryHistory))
        )


    );
}
