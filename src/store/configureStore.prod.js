import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
//used for asynch calls to and from an api
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';


export default function configureStore(memoryHistory, initialState) {
    const reducer = combineReducers({
        rootReducer,
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
