import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import Helmet from 'react-helmet';

// a second export that is not linked to 'connect' which can be used as a named import from test files
export class ManageCoursePage extends React.Component {
  constructor (props, context) {
    super (props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    // ensure that the 'this' object inside the functions is always the
    // container component
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  //life-cycle function called any time the props changes
  componentWillReceiveProps (nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      this.setState({
        course: Object.assign({}, nextProps.course)
      });
    }
  }

  updateCourseState (event) {
    const field = event.target.name;
    let course = this.state.course;
    let errors = this.state.errors;
    // if (event.target.value.length === 0) {
    //   errors[field] = 'field cannot be empty';
    // } else {
    course[field] = event.target.value;
    // }


    return this.setState({course: course});
  }

  isValid () {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters long';
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  saveCourse (event) {
    event.preventDefault();

    if (!this.isValid()) {
      return;
    }

    this.setState({ saving: true });
    // all create actions are already in this.props.actions (from mapDispatchToProps)
    this.props.actions.saveCourse(this.state.course)
      .then(() => {
        toastr.success('Course was saved mo fo!');
        this.setState({ saving: false });
        this.context.router.push('/courses');
      })
      .catch(error => {
        this.setState({ saving: false });
        toastr.error(error);
      });
  }

  render () {
    return (
      <div>
        <Helmet title={this.state.course.title || 'New course'} />
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          errors={this.state.errors}
          onSave={this.saveCourse}
          course={this.state.course}
          saving={this.state.saving}
        />
      </div>

    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById (courses, id) {
  const course = courses.filter(course => course.id === id)[0] || null;
  return course;
}

function mapStateToProps (state, props) {
  // props passed in from the url
  const courseId = props.params.id;
  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const formattedAuthors = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: formattedAuthors
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators (courseActions, dispatch)
  };
}

export default connect (mapStateToProps, mapDispatchToProps)(ManageCoursePage);
