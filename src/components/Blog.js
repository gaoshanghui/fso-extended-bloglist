import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css'

const Blog = ({ blog, updateLikes, removeBlog, loginUsername }) => {
  // const [view, setView] = useState(false)

  if (!blog) { return null }

  const blogOwner = blog.user.username
  // const showWhenVisible = { display: view ? '' : 'none' }
  // const handleView = () => {
  //   setView(!view)
  // }

  const handleLike = () => {
    const newBlogInfo = { ...blog, likes: blog.likes + 1 }
    updateLikes(newBlogInfo)
  }

  const handleRemove = () => {
    removeBlog(blog)
  }

  return (
    <div className="blog">
      <div className="blog__title">
        <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
        {/* <button className="blog__view-controlling-button" onClick={handleView}>{view ? 'hide' : 'view'}</button> */}
      </div>
      <div className="blog__body">
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes} <button className="blog__like-button" onClick={handleLike}>like</button></div>
        <div>Owner: {blog.user.username}</div>
        <div>
          {loginUsername.username === blogOwner && <button className="blog__remove-button" onClick={handleRemove}>remove</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog