import expect from 'react';
import * as courseActions from './courseActions';
import * as types from './actionTypes';
import thunk from 'redux-thunk';
// mock node library
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe ('Async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it ('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', () => {
    // this can be used to call an endpoint but return a specified payload
    // nock('http://localhost:3000')
    //   .get('/courses')
    //   .reply(200, {
    //     body: {
    //       course: [{ id: 1, firstName: 'Si', lastName: 'K'}]
    //     }
    //   });

    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.LOAD_COURSES_SUCCESS, body: { courses: [ { id:'clean-code', title: 'Clean Code' } ] }}
    ];

    const store = mockStore({ courses: []}, expectedActions);
    store.dispatch(courseActions.loadCourses()).then(() => {
      const actions = store.getActions();
      expect (actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect (actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
      // done();
    });

  });

});
