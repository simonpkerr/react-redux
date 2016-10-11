import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../components/App';
import HomePage from '../components/home/HomePage';
import AboutPage from '../components/about/AboutPage';
import CoursesPage from '../components/course/CoursesPage';
import ManageCoursePage from '../components/course/ManageCoursePage'; // eslint-disable-line import/no-named-as-default
import ManageAuthorPage from '../components/author/ManageAuthorPage'; // eslint-disable-line import/no-named-as-default
import AuthorsPage from '../components/author/AuthorsPage';
import NotFound from '../components/common/NotFound';

//always load the app component as the base container
//for all other components.
export default function (history) {

    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage}/>
                <Route path="about" component={AboutPage}/>
                <Route path="courses" component={CoursesPage}/>
                <Route path="course" component={ManageCoursePage}/>
                <Route path="course/:id" component={ManageCoursePage}/>
                <Route path="authors" component={AuthorsPage}/>
                <Route path="author" component={ManageAuthorPage}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    );

}
