import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

import { setNotification, clearNotification } from './reducers/notificationReducer';
import { initialBlogs, createBlog, likedBlog, removeBlog } from './reducers/blogReducer';
import { userLogin, userLogout } from './reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)

  const dispatch = useDispatch();

  const notificationMessage = useSelector(state => state.notification);
  const defaultBlogs = useSelector(state => state.blogs);
  const loggedInUser = useSelector(state => state.user);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      dispatch(initialBlogs(blogs));
    }
    getBlogs()
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      dispatch(userLogin(user));

      // setUser(user)
      blogService.setToken(user.token)
    }
  }, [dispatch]);

  // Handlers that relative to the login feature.
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      // setUser(user)
      dispatch(userLogin(user));

      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.message)
      dispatch(setNotification('wrong username or password', false))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  };

  const handelLogout = (event) => {
    event.preventDefault()

    window.localStorage.clear()
    // setUser(null)
    dispatch(userLogout());
  };

  const handleLoginUserNameChange = (event) => {
    setUsername(event.target.value)
  };

  const handleLoginPasswordChange = (event) => {
    setPassword(event.target.value)
  };

  // Handlers that relative to the blog
  // Handle create a new blog
  const handleCreateBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject);
      dispatch(createBlog(response)); 

      // Rerender blog lists after a new item added.
      const newBlogs = await blogService.getAll();
      dispatch(initialBlogs(newBlogs));

      // show successful notification
      dispatch(setNotification(`A new blog ${response.title} by ${response.author} added`, true))
      // clear notification after 5 seconds
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000)
    } catch (error) {
      console.log(error.message)
    }
  };

  // Handle blog is liked
  const handleUpdateBlogLikes = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      dispatch(likedBlog(updatedBlog));
    } catch (error) {
      console.log(error.message)
    }
  }

  // Handle blog is removed
  const handleRemoveBlog = async (blogObject) => {
    const windowConfirmMessage = `Remove blog ${blogObject.title} by ${blogObject.author}`
    if (window.confirm(windowConfirmMessage)) {
      try {
        await blogService.remove(blogObject.id)
        dispatch(removeBlog(blogObject));
      } catch (error) {
        console.log(error.message)
      }
    }
    return null
  }

  const loginForm = () => {
    if (loggedInUser === null) {
      return (
        <LoginForm
          errorMessage={notificationMessage}
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleLoginUserNameChange={handleLoginUserNameChange}
          handleLoginPasswordChange={handleLoginPasswordChange}
        />
      )
    }

    // const loggedUserInfo = JSON.parse(window.localStorage.getItem('loggedBloglistappUser'))
    // const loggedUserName = loggedUserInfo.name
    // const loggedUserUsername = loggedUserInfo.username

    const loggedUserInfo = loggedInUser;
    const loggedUserName = loggedUserInfo.name
    const loggedUserUsername = loggedUserInfo.username

    return (
      <div>
        <h2>blogs</h2>
        {notificationMessage && <Notification notificationMessage={notificationMessage}/>}
        <div>
          {`${loggedUserName} logged in`}
          <button onClick={handelLogout}>logout</button>
        </div>

        <Togglable buttonLabel="new blog">
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>

        {
          defaultBlogs && defaultBlogs.sort((a, b) => {
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

  return (
    <div>
      { loginForm() }
    </div>
  )
}

export default App