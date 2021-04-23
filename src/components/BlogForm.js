import React from 'react'

const BlogForm = ({newBlog, handleCreate, handleBlogTitleChange, handleBlogAuthorChange, handleBlogUrlChange}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            title:
            <input 
              type="text" 
              value={newBlog.title}
              name="title"
              onChange={handleBlogTitleChange}
            />  
          </label>    
        </div>
        <div>
          <label>
            author:
            <input 
              type="text" 
              value={newBlog.author}
              name="author"
              onChange={handleBlogAuthorChange}
            />  
          </label>  
        </div>
        <div>
          <label>
            url:
            <input 
              type="text" 
              value={newBlog.url}
              name="url"
              onChange={handleBlogUrlChange}
            />  
          </label>  
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm