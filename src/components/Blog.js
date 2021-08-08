import React, { useState } from "react";
import blogService from "../services/blogs";

import "./Blog.scss";

const Blog = ({ blog, updateLikes, removeBlog, loginUsername }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComnents] = useState(blog.comments);

  const handleNewCommentInput = (event) => {
    setComment(event.target.value);
  };

  const handleAddNewComment = (event) => {
    event.preventDefault();
    const newComments = [...allComments, comment];

    if (!comment) return null;

    blogService.comment(blog.id, { comments: newComments }).then((response) => {
      setAllComnents(response.data.comments);
      setComment("");
    });
  };

  const blogOwner = blog.user.username;

  const handleLike = () => {
    const newBlogInfo = { ...blog, likes: blog.likes + 1 };
    updateLikes(newBlogInfo);
  };

  const handleRemove = () => {
    removeBlog(blog);
  };

  return (
    <div className="Blog">
      <h3 className="Blog__title">
        {blog.title} - {blog.author}
      </h3>
      <div className="Blog__body">
        <div>URL: {blog.url}</div>
        <div>
          Likes: {blog.likes}{" "}
          <button className="Blog__like-button" onClick={handleLike}>like</button>
        </div>
        <div>Owner: {blog.user.username}</div>
        <div>
          <div>Commments</div>
          <ul>
            {allComments &&
              allComments.map((comment) => {
                return <li key={comment}>{comment}</li>;
              })}
          </ul>
          <form className="Blog__add-new-comment" onSubmit={handleAddNewComment}>
            <input className="Blog__add-new-comment-input" onChange={handleNewCommentInput} value={comment} />
            <button className="Blog__add-new-comment-submit" type="submit">Add comment</button>
          </form>
        </div>
        <div>
          {(loginUsername && loginUsername.username) === blogOwner && (
            <button className="Blog__remove-blog-button" onClick={handleRemove}>
              remove the blog
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
