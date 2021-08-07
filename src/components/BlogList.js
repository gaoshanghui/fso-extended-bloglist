import React from 'react';
import { Link } from 'react-router-dom';

import './BlogList.scss';

const BlogList = ({ blogs }) => {
  return (
    <div className="BlogList">
      {
        blogs && blogs.sort((a, b) => {
          // larger likes comes to the first
          // (Sort the array in descending order)
          return b.likes - a.likes
        })
          .map(blog => {
            return (
              <div key={blog.id} className="BlogList__blog">
                <Link to={`/blogs/${blog.id}`} className="BlogList__blog-link">{blog.title} - {blog.author}</Link>
              </div>
            )
          })
      }
    </div>
  );
}

export default BlogList;
