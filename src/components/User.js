import React from 'react';
import { useParams } from 'react-router-dom';

const User = ({ blogs }) => {
  const id = useParams().id;
  console.log('userId: ', id);
  console.log(blogs);

  const blogsOwnedByUser = blogs.filter((blog) => {
    return blog.user.id === id;
  })

  console.log(blogsOwnedByUser)

  // The solution for refresh the page for an individual user.
  if (blogsOwnedByUser.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>{blogsOwnedByUser[0].user.name}</h2>
      <h3>added blogs</h3>
      <div>
        <ul>
          {blogsOwnedByUser.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default User;
