import React from "react";
import { Link } from "react-router-dom";
import "./UserView.scss";

const UsersView = ({ blogs }) => {
  const usersInfo = blogs.reduce((users, blog) => {
    users[blog.user.username] = users[blog.user.username] || {};
    users[blog.user.username].id = blog.user.id;

    users[blog.user.username].blogs = users[blog.user.username].blogs || [];
    users[blog.user.username].blogs.push({
      blogTitle: blog.title,
      blogId: blog.id,
    });

    return users;
  }, {});

  return (
    <div className="UserView">
      <h2 className="UserView__headline">User Page</h2>
      <div>
        <table className="UserView__table">
          <thead>
            <tr>
              <th className="UserView__table-th">username</th>
              <th className="UserView__table-th">blogs created</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(usersInfo).map((key) => {
              return (
                <tr key={key}>
                  <td>
                    <Link
                      className="UserView__table-username"
                      to={`/users/${usersInfo[key].id}`}
                    >
                      {key}
                    </Link>
                  </td>
                  <td className="UserView__table-blog-number">
                    {usersInfo[key].blogs.length}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersView;
