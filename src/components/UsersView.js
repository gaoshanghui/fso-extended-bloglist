import React from 'react';
import { Link } from 'react-router-dom';

const UsersView = ({ blogs }) => {
  const usersInfo = blogs.reduce((users, blog) => {
    users[blog.user.username] = users[blog.user.username] || {};
    users[blog.user.username].id = blog.user.id;

    users[blog.user.username].blogs = users[blog.user.username].blogs || [];
    users[blog.user.username].blogs.push({
      blogTitle: blog.title,
      blogId: blog.id,  
    })

    return users;
  }, {});

  return (
    <div>
      <h2>User Page</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(usersInfo).map((key) => {
                return (
                  <tr key={key}>
                    <td><Link to={`/users/${usersInfo[key].id}`}>{key}</Link></td>
                    <td>{usersInfo[key].blogs.length}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersView;
