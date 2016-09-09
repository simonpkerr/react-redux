import React from 'react';
import Helmet from 'react-helmet';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="About sheeeet" />
        <h1>About</h1>
        <p>This application uses a bunch o stuff</p>
      </div>
    );

  }
}

export default AboutPage;
