import * as types from '../actions/actionTypes';
import initialState from './initialState';

//once a thunk completes, it dispatches an action with a suffix of 'SUCCESS'
// which can be picked up here
function actionTypeEndsInSuccess (type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer (state = initialState.ajaxCallsInProgress, action) {
  if (action.type == types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type) || action.type === types.AJAX_CALL_ERROR) {
    return state - 1;
  }

  return state;
}
