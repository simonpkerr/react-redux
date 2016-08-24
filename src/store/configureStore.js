import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
//used for asynch calls to and from an api
import thunk from 'redux-thunk';

export default function configureStore (initialState) {
  return createStore (
    //rootReducer contains all the reducers mixed together
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      reduxImmutableStateInvariant()
    )
  );
}
