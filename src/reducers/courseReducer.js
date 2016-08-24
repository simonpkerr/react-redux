import * as types from '../actions/actionTypes';
import initialState from './initialState';

//uses default es6 default parameters
export default function courseReducer (state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course)
      ];

    case types.UPDATE_COURSE_SUCCESS:
      //filter the courses excluding the course that was passed in to the action,
      // update that course and add it back in
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    // case types.CREATE_COURSE:
      //... effectively explodes the array using es6 then
      // creates a deep clone of the state object

      // create a new array by exploding existing state array
      // and adding a deep clone of the course object
      // return [...state,
      //   Object.assign({}, action.course)
      // ];
      // not immutable
      // state.push(action.course);
      // return state;
    default:
      return state;
  }
}
