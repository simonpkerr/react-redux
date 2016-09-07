import React, { PropTypes } from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({ authors, courses, coursesByAuthor, onDelete }) => {

  function mapCoursesToAuthor (author) {
    if (courses.length > 0) {
      return courses.filter(c => c.authorId == author.id);
    }

    return [];

  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Courses</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {
          authors.map(author =>
            <AuthorListRow key={author.id} author={author} courses={coursesByAuthor(author)} onDelete={onDelete} />
          )
        }
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  coursesByAuthor: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorList;
