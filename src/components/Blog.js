import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import blogService from '../services/blogs';

import './Blog.css'

const Blog = ({ blog, updateLikes, removeBlog, loginUsername }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComnents] = useState(blog.comments);

  const handleNewCommentInput = (event) => {
    setComment(event.target.value);
  }

  const handleAddNewComment = (event) => {
    event.preventDefault()
    const newComments = [...allComments, comment]
    
    if (!comment) return null;

    blogService.comment(blog.id, {comments: newComments})
      .then((response) => {
        setAllComnents(response.data.comments)
        setComment('')
      })
  }

  const blogOwner = blog.user.username

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
      </div>
      <div className="blog__body">
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes} <button className="blog__like-button" onClick={handleLike}>like</button></div>
        <div>Owner: {blog.user.username}</div>
        <div>
          <div>Commments</div>
          <ul>
            {
              allComments && allComments.map(comment => {
                return (
                  <li key={comment}>{comment}</li>
                )
              })
            }
          </ul>
          <form onSubmit={handleAddNewComment}>
            <input onChange={handleNewCommentInput} value={comment} />
            <button type="submit">Add comment</button>
          </form>
        </div>
        <div>
          {loginUsername.username === blogOwner && <button className="blog__remove-button" onClick={handleRemove}>remove the blog</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog