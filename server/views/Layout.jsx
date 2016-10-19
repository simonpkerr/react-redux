// require("../../styles/styles.css");
var React = require('react');

class Layout extends React.Component {

    createAppMarkup() {
        return { __html: this.props.html };
    }

    render() {
        return (
            <html>
            <head>
                <title>Course admin</title>
                <link rel='stylesheet' type='text/css' href='/public/style.css' />
            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={this.createAppMarkup()}></div>
                <script dangerouslySetInnerHTML={{__html: `window.__REDUX_STATE__ = '${this.props.reduxState}'`}} />

                <script src="/public/vendor.js"></script>
                <script src="/public/bundle.js"></script>

            </body>
            </html>
        );
    }
}

module.exports = Layout;