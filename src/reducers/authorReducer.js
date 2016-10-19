import * as types from '../actions/actionTypes';
import initialState from './initialState';

//uses default es6 default parameters
export default function (state = initialState.authors, action) {

  const sortAuthors = (authors) => {
    return authors.sort((a,b) => {
      let aName = a.firstName.toLowerCase();
      let bName = b.firstName.toLowerCase();
      if (aName < bName) {
        return -1;
      }
      if (aName > bName) {
        return 1;
      }
      return 0;
    });
  };

  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return sortAuthors(action.authors);

    case types.CREATE_AUTHOR_SUCCESS:
      return sortAuthors([
        ...state,
        Object.assign({}, action.author)
      ]);

    case types.UPDATE_AUTHOR_SUCCESS:
      return sortAuthors([
        ...state.filter(author => author.id !== action.author.id),
        Object.assign({}, action.author)
      ]);

    case types.DELETE_AUTHOR_SUCCESS:
      return sortAuthors([
        ...state.filter(author => author.id !== action.author.id)
      ]);

    default:
      return state;
  }
}
