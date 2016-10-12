import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';
import Helmet from 'react-helmet';

// a second export that is not linked to 'connect' which can be used as a named import from test files
export class ManageAuthorPage extends React.Component {
  constructor (props, context) {
    super (props, context);

    this.state = {
      author: Object.assign({}, props.author),
      errors: {},
      saving: false
    };

    // ensure that the 'this' object inside the functions is always the
    // container component
    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  //life-cycle function called any time the props changes
  componentWillReceiveProps (nextProps) {
    if (this.props.author.id != nextProps.author.id) {
      this.setState({
        author: Object.assign({}, nextProps.author)
      });
    }
  }

  updateAuthorState (event) {
    const field = event.target.name;
    let author = this.state.author;
    let errors = this.state.errors;
    author[field] = event.target.value;

    return this.setState({author: author});
  }

  isValid () {
    let formIsValid = true;
    let errors = {};

    if (this.state.author.firstName.length < 5) {
      errors.firstName = 'First name must be at least 5 characters long';
      formIsValid = false;
    }

    if (this.state.author.lastName.length < 5) {
      errors.lastName = 'Last name must be at least 5 characters long';
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  saveAuthor (event) {
    event.preventDefault();

    if (!this.isValid()) {
      return;
    }

    this.setState({ saving: true });
    // all create actions are already in this.props.actions (from mapDispatchToProps)
    this.props.actions.saveAuthor(this.state.author)
      .then(() => {
        toastr.success('Author was saved mo fo!');
        this.setState({ saving: false });
        this.context.router.push('/authors');
      })
      .catch(error => {
        this.setState({ saving: false });
        toastr.error(error);
      });
  }

  render () {
    return (

      <div>
        <Helmet title={this.state.author.firstName || 'New author'} />
        <AuthorForm
            onChange={this.updateAuthorState}
            errors={this.state.errors}
            onSave={this.saveAuthor}
            author={this.state.author}
            saving={this.state.saving}
          />
      </div>
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

function getAuthorById (authors, id) {
  const author = authors.filter(author => author.id === id)[0] || null;
  return author;
}

function mapStateToProps (state, props) {
  // props passed in from the url
  const authorId = props.params.id;
  let author = {
    id: '',
    watchHref: '',
    firstName: '',
    lastName: '',
    authorId: ''
  };

  if (authorId && state.authors.length > 0) {
    author = getAuthorById(state.authors, authorId);
  }

  const formattedAuthors = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    author: author,
    authors: formattedAuthors
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators (authorActions, dispatch)
  };
}

export default connect (mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
