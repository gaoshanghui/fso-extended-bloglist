import React, { useState } from "react";
import "./BlogForm.scss";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleBlogTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value });
  };

  const handleBlogAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value });
  };

  const handleBlogUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value });
  };

  const handleCreate = (event) => {
    event.preventDefault();

    createBlog(newBlog);
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <div className="BlogForm">
      <h2 className="BlogForm__headline">Create new</h2>
      <form className="BlogForm__form" onSubmit={handleCreate}>
        <div>
          <label className="BlogForm__form-label">
            <span>Title</span>
            <input
              className="BlogForm__form-input"
              type="text"
              value={newBlog.title}
              name="title"
              onChange={handleBlogTitleChange}
            />
          </label>
        </div>
        <div>
          <label className="BlogForm__form-label">
            <span>Author</span>
            <input
              className="BlogForm__form-input"
              type="text"
              value={newBlog.author}
              name="author"
              onChange={handleBlogAuthorChange}
            />
          </label>
        </div>
        <div>
          <label className="BlogForm__form-label">
            <span>URL</span>
            <input
              className="BlogForm__form-input"
              type="text"
              value={newBlog.url}
              name="url"
              onChange={handleBlogUrlChange}
            />
          </label>
        </div>
        <button type="submit" className="BlogForm__submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
