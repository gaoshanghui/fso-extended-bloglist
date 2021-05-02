import React, { useState } from 'react'
import './Blog.css'

const Blog = ({ blog, updateLikes, removeBlog, loginUsername }) => {
  const [view, setView] = useState(false)

  const blogOwner = blog.user.username

  const showWhenVisible = { display: view ? '' : 'none' }
  const handleView = () => {
    setView(!view)
  }

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
        {blog.title} - {blog.author}
        <button className="blog__view-controlling-button" onClick={handleView}>{view ? 'hide' : 'view'}</button>
      </div>
      <div className="blog__body" style={showWhenVisible}>
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes} <button className="blog__like-button" onClick={handleLike}>like</button></div>
        <div>Owner: {blog.user.username}</div>
        <div>
          { loginUsername === blogOwner && <button onClick={handleRemove}>remove</button> }
        </div>
      </div>
    </div>
  )
}

export default Blog