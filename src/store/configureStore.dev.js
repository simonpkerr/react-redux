import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
//used for asynch calls to and from an api
import thunk from 'redux-thunk';

// reduxImmutableStateInvariant is  dev middleware so that warnings are given if any code
// tries to mutate state.
// In production this should be removed

const composeEnhancers = typeof window === 'object' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
// const middleware = { thunk, reduxImmutableStateInvariant };

export default function configureStore(initialState) {
    return createStore(
        //rootReducer contains all the reducers mixed together
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk, reduxImmutableStateInvariant())
        )
        // applyMiddleware(
        //     thunk,
        //     reduxImmutableStateInvariant()
        // )
    );
}
