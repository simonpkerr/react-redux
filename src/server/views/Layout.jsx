var React = require('react');

class Layout extends React.Component {

    createAppMarkup() {
        return { __html: this.props.body };
    }
    render() {
        return (
            <html>
            <head><title>Courses</title></head>
            <body>
                <div id="app" dangerouslySetInnerHTML={this.createAppMarkup()}></div>
                <script src="/bundle.js"></script>
            </body>
            </html>
        );
    }
}

module.exports = Layout;