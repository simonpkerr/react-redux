import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AuthorListRow = ({ author, courses, onDelete }) => {
  return (
    <tr>
      <td><Link to={'author' + '/' + author.id}>{author.firstName}</Link></td>
      <td>{author.lastName}</td>
      <td><ul>{courses.map(c =>
            <li key={c.id}><Link to={'/course' + '/' + c.id}>{c.title}</Link></li>)}
          </ul>
      </td>
      <td><input type="submit"
        value="delete"
        className="btn btn-warning"
        onClick={onDelete} /></td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorListRow;
