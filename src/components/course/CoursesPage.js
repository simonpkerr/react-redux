import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import { browserHistory } from 'react-router';

class CoursesPage extends React.Component {
  // initialises state
  constructor (props, context) {
    super(props, context);

    this.state = {
      course: { title: '' }
    };

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);

    //es6 doesn't handle binding so this needs setting up manually
    // this.onTitleChange = this.onTitleChange.bind(this);
    // this.onClickSave = this.onClickSave.bind(this);
  }

  redirectToAddCoursePage () {
    browserHistory.push('/course');
  }

  // onTitleChange (event) {
  //   const course = this.state.course;
  //   course.title = event.target.value;
  //   this.setState({ course : course });
  // }

  // onClickSave () {
  //   // connect injects a dispatch prop if there is no mapDispatchToProps function defined
  //   // dispatches a call. reducer intercepts, gets current state, deep clones then returns new state object
  //   this.props.actions.createCourse(this.state.course);
  // }

  // courseRow (course, index) {
  //   return <div key={index}>{course.title}</div>;
  // }

  // normally container components should only
  // call child dumb components
  render() {
    const { courses } = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
          value="Add course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage} />
        <CourseList courses={ courses } />
      </div>
    );
  }
}

// validation for props
// CoursesPage.propTypes = {
//   courses: PropTypes.array.isRequired,
//   actions: PropTypes.object.isRequired
// };

//state.courses is defined in the root reducer
function mapStateToProps (state, ownProps) {
  return {
    courses: state.courses
  };
}

// used to wrap functions to the dispatcher so that
// in the component, a simple function call is used instead of
// directly calling the dispatcher
function mapDispatchToProps (dispatch) {
  return {
    // this method binds all actions found in the 'courseActions' actions file and wraps
    // them in calls to the dispatcher
    actions: bindActionCreators(courseActions, dispatch)

    // this method allows manual creation of actions wrapped in a call to the dispatcher
    // createCourse: course => dispatch (courseActions.createCourse(course))
  };
}

// if 'mapDispatchToProps' is defined, redux no longer injects it
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
