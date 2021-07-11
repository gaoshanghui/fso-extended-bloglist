const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIAL_BLOGS':
      return action.data;
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'LIKE_BLOG':
      const id = action.data.id;
      const blogToChange = state.find(b => b.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: action.data.likes,
      };
      return state.map(blog => {
        return blog.id !== id ? blog : changedBlog;
      });
    case 'REMOVE_BLOG':
      const targetID = action.data.id;
      const updatedState = state.filter(b => b.id !== targetID);
      return updatedState
    default:
      return state;
  }
}

export const initialBlogs = (blogs) => {
  return {
    type: 'INITIAL_BLOGS',
    data: blogs,
  }
}

export const createBlog = (blog) => {
  return {
    type: 'NEW_BLOG',
    data: blog,
  }
}

export const likedBlog = (blog) => {
  return {
    type: 'LIKE_BLOG',
    data: blog,
  }
}

export const removeBlog = (blog) => {
  return {
    type: 'REMOVE_BLOG',
    data: blog,
  }
}

export default blogReducer;
