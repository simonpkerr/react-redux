// require("../../styles/styles.css");
var React = require('react');

class Layout extends React.Component {

    createAppMarkup() {
        return { __html: this.props.html };
    }

    render() {
        return (
            <html>
            <head><title>Courses</title></head>
            <body>
                <div id="app" dangerouslySetInnerHTML={this.createAppMarkup()}></div>
                <script dangerouslySetInnerHTML={{__html: `window.__REDUX_STATE__ = '${this.props.reduxState}'`}} />

                <script src="/bundle.js"></script>

            </body>
            </html>
        );
    }
}

module.exports = Layout;