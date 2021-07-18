import React from 'react';

const UsersView = ({ blogs }) => {
  const usersInfo = blogs.reduce((users, blog) => {
    users[blog.user.username] = users[blog.user.username] || [];
    
    users[blog.user.username].push({
      blogTitle: blog.title,
      blogId: blog.id,
    });


    return users;
  }, {});

  console.log(usersInfo);


  return (
    <div>
      <h2>User Page</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(usersInfo).map((key) => {
                return (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{usersInfo[key].length}</td>
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
