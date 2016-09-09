import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from './common/Header';
import Helmet from 'react-helmet';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Helmet
          titleTemplate="%s - Courses by mwa"
          defaultTitle="Courses by mwa"
        />
        <Header loading={this.props.loading} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps (state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
