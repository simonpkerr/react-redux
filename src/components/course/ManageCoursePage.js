import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
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

  saveCourse (event) {
    event.preventDefault();
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
      })
  }

  render () {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        errors={this.state.errors}
        onSave={this.saveCourse}
        course={this.state.course}
        saving={this.state.saving}
      />

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
    authors: formattedAuthors,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators (courseActions, dispatch)
  };
}

export default connect (mapStateToProps, mapDispatchToProps)(ManageCoursePage);
