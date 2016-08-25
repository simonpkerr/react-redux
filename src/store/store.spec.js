import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe ('Store', () => {
  it ('should handle creating stores', () => {
    const store = createStore(rootReducer, initialState);
    const course = {
      title: 'clean code'
    };

    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    const actual = store.getState().courses[0];
    const expected = Object.assign({}, course);

    expect(actual).toEqual(expected);
  });
});
