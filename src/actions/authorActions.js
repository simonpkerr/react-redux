import * as types from './actionTypes';
// to change this to a real api, simply change the dependency
import AuthorApi from '../api/mockAuthorApi';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadAuthorsSuccess (authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors () {
  return function (dispatch) {
    dispatch (beginAjaxCall())
    // uses thunk which uses promises
    return AuthorApi.getAllAuthors()
      .then (authors => {
        dispatch (loadAuthorsSuccess(authors));
      })
      .catch (error => {
        throw (error);
      });
  }
}
