import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import * as courseActions from '../../actions/courseActions';
import AuthorList from './AuthorList';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import Helmet from 'react-helmet';

class AuthorsPage extends React.Component {
  // initialises state
  constructor (props, context) {
    super(props, context);

    this.state = {
      saving: false
    };

    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.coursesByAuthor = this.coursesByAuthor.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  redirectToAddAuthorPage () {
    browserHistory.push('/author');
  }

  coursesByAuthor (author) {
    //const author = event.target.author;
    return this.props.courses.filter(c => c.authorId == author.id);
  }

  deleteAuthor (author) {

    if (this.coursesByAuthor(author).length > 0) {
      toastr.error('Cannot delete author with associated courses');
    } else {
      this.setState({ saving: true });
      this.props.actions.deleteAuthor(author)
        .then (() => {
          toastr.success('Author deleted');
          this.setState({ saving: false });
        })
        .catch (error => {
          this.setState({ saving: false });
          toastr.error(error);
        });


    }


  }

  // normally container components should only
  // call child dumb components
  render() {
    //const { authors } = this.props;
    return (
      <div>
        <Helmet title="Authors" />
        <h1>Authors</h1>
        <input type="submit"
          value="Add author"
          className="btn btn-primary"
          onClick={this.redirectToAddAuthorPage} />
        <AuthorList
          authors={this.props.authors}
          courses={this.props.courses}
          coursesByAuthor={this.coursesByAuthor}
          onDelete={this.deleteAuthor} />
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array,
  courses: PropTypes.array
};

//state.courses is defined in the root reducer
function mapStateToProps (state, ownProps) {
  return {
    authors: state.authors,
    courses: state.courses
  };
}

// used to wrap functions to the dispatcher so that
// in the component, a simple function call is used instead of
// directly calling the dispatcher
function mapDispatchToProps (dispatch) {
  return {
    // this method binds all actions found in the 'authorActions' actions file and wraps
    // them in calls to the dispatcher
    actions: bindActionCreators(authorActions, dispatch)

    // this method allows manual creation of actions wrapped in a call to the dispatcher
    // createCourse: course => dispatch (courseActions.createCourse(course))
  };
}

// if 'mapDispatchToProps' is defined, redux no longer injects it
export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
