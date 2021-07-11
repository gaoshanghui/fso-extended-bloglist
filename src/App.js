import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

import { setNotification, clearNotification } from './reducers/notificationReducer';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [successfulMessage, setSuccessfulMessage] = useState(null)

  const dispatch = useDispatch();
  const notificationMessage = useSelector(state => state);


  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
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
    setUser(null)
  };

  const handleLoginUserNameChange = (event) => {
    setUsername(event.target.value)
  };

  const handleLoginPasswordChange = (event) => {
    setPassword(event.target.value)
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      const getNewBlogs = await blogService.getAll()
      setBlogs(getNewBlogs)

      dispatch(setNotification(`A new blog ${response.title} by ${response.author} added`, true))
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000)
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleUpdateBlogLikes = async (blogObject) => {
    try {
      await blogService.update(blogObject)
      const newBlogs = blogs.map((blog) => {
        if (blog.id === blogObject.id) return blogObject
        return blog
      })
      setBlogs(newBlogs)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleRemoveBlog = async (blogObject) => {
    const windowConfirmMessage = `Remove blog ${blogObject.title} by ${blogObject.author}`
    if (window.confirm(windowConfirmMessage)) {
      try {
        await blogService.remove(blogObject.id)
        const newBlogs = blogs.filter((blog) => {
          return blog.id !== blogObject.id
        })
        setBlogs(newBlogs)
      } catch (error) {
        console.log(error.message)
      }
    }
    return null
  }

  const loginForm = () => {
    if (user === null) {
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

    const loggedUserInfo = JSON.parse(window.localStorage.getItem('loggedBloglistappUser'))
    const loggedUserName = loggedUserInfo.name
    const loggedUserUsername = loggedUserInfo.username

    return (
      <div>
        <h2>blogs</h2>
        {/* <div>{successfulMessage}</div> */}
        {notificationMessage && <Notification notificationMessage={notificationMessage}/>}
        <div>
          {`${loggedUserName} logged in`}
          <button onClick={handelLogout}>logout</button>
        </div>

        <Togglable buttonLabel="new blog">
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>

        {
          blogs.sort((a, b) => {
            // larger likes comes to the first(Sort the array in descending order)
            return b.likes - a.likes
          }).map(blog =>
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