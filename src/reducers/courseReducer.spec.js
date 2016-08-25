import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe ('Course reducer', () => {
  it ('should add course when passed CREATE_COURSE_SUCCESS', () => {
    const initialState = [
      { title: 'a' },
      { title: 'b' }
    ];
    const c = { title: 'c' };
    const action = actions.createCourseSuccess(c);

    const newState = courseReducer(initialState, action);

    expect (newState.length).toEqual(3);
    expect (newState[0].title).toEqual('a');
  });
});
