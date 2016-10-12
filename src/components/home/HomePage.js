import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import  { connect } from 'react-redux';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Admin</h1>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );

  }
}

function mapStateToProps (state) {
    return {};
}

export default connect(mapStateToProps)(HomePage);
