import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, handleUpdateBlogLikes, handleRemoveBlog, loggedUserUsername }) => {
  return (
    <div>
      {
        blogs && blogs.sort((a, b) => {
          // larger likes comes to the first
          // (Sort the array in descending order)
          return b.likes - a.likes
        })
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={handleUpdateBlogLikes}
              removeBlog={handleRemoveBlog}
              loginUsername={loggedUserUsername}
            />
          )
      }
    </div>
  )
}

export default BlogList;
