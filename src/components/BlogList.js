import React from 'react';
// import Blog from './Blog';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  return (
    <div>
      {
        blogs && blogs.sort((a, b) => {
          // larger likes comes to the first
          // (Sort the array in descending order)
          return b.likes - a.likes
        })
          .map(blog => {
            return (
              <Link key={blog.id} to={`/blogs/${blog.id}`}><p>{blog.title} - {blog.author}</p></Link>
            )
          })
      }
    </div>
  )
}

export default BlogList;
