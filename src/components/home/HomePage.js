import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import  { connect } from 'react-redux';

import './home.css';

class HomePage extends React.Component {
  render() {
    return (
      <div className="header__panel">
        <h1>Admin for the courses</h1>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );

  }
}

function mapStateToProps (state) {
    return {};
}

export default connect(mapStateToProps)(HomePage);
