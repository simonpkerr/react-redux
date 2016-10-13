import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from './common/Header';
import Helmet from 'react-helmet';
import {bindActionCreators} from 'redux';

import * as courseActions from '../actions/courseActions';
import * as authorActions from '../actions/authorActions';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            authors: []
        };
    }

    static fetchData({ store, params, history }) {
        return store.dispatch(courseActions.loadCourses());
    }

    render() {
        return (
            <div className="container-fluid">
                <Helmet
                    titleTemplate="%s - Courses by mwa"
                    defaultTitle="Courses by mwa"
                />
                <Header loading={this.props.loading}/>
                {this.props.children}
            </div>
        );
    }

    // componentWillReceiveProps (nextProps) {
    //     // if (!this.props.courses.length) {
    //         this.setState({
    //             courses: nextProps.courses
    //         });
    //     // }
    // }

    componentDidMount() {

        if (this.props.courses.length === 0) {
            console.log('loading courses client side');
            this.props.courseActions.loadCourses();
        }
        if (this.props.authors.length === 0) {
            this.props.authorActions.loadAuthors();
        }

    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0,
        courses: state.courses,
        authors: state.authors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        courseActions: bindActionCreators(courseActions, dispatch),
        authorActions: bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
