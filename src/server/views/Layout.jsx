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
                { this.props.reduxState }
                {  this.props.scriptSrcs.length }
                {
                    this.props.scriptSrcs.forEach(script => {
                        <p>script is: { script }</p>
                        {/*<script src={script}></script>*/}
                    })
                }
            </body>
            </html>
        );
    }
}

module.exports = Layout;