var React = require('react');

class DefaultLayout extends React.Component {

    createAppMarkup() {
        return { __html: 'the content'};
    }
    render() {
        return (
            <html>
            <head><title></title></head>
            <body>
                <div id="app" dangerouslySetInnerHTML={this.createAppMarkup()}></div>
                <script src="/bundle.js"></script>
            </body>
            </html>
        );
    }
}

module.exports = DefaultLayout;