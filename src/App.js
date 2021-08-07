import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import LoginStatusBar from './components/LoginStatusBar';

import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

import UsersView from './components/UsersView';
import User from './components/User';

import Navigation from './components/Navigation';

import { setNotification, clearNotification } from './reducers/notificationReducer';
import { initialBlogs, createBlog, likedBlog, removeBlog } from './reducers/blogReducer';
import { userLogin, userLogout } from './reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  const notificationMessage = useSelector(state => state.notification);
  const defaultBlogs = useSelector(state => state.blogs);
  const loggedInUser = useSelector(state => state.user);

  useEffect(() => {
    const getBlogs = async () => {
      const responsedBlogs = await blogService.getAll()
      dispatch(initialBlogs(responsedBlogs));
    }
    getBlogs()
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(userLogin(user));
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

    const loggedUserInfo = loggedInUser;
    const loggedUserUsername = loggedUserInfo.username

    return (
      <div>
        <Togglable buttonLabel="new blog">
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>

        <BlogList
          blogs={defaultBlogs}
          handleUpdateBlogLikes={handleUpdateBlogLikes}
          handleRemoveBlog={handleRemoveBlog}
          loggedUserUsername={loggedUserUsername}
        />
      </div>
    )
  }


  const match = useRouteMatch('/blogs/:id');
  const matchedBlog = match ? defaultBlogs.find(blog => blog.id === match.params.id) : null
  // console.log('Default blogs are: ', defaultBlogs);

  return (
    // React Router
    <div className="App">
      <h1 className="App__headline">Bloglist</h1>
      <div className="App__menu">
        {loggedInUser && <Navigation />}
        {loggedInUser && <LoginStatusBar loggedInUser={loggedInUser} handelLogout={handelLogout} />}
      </div>
      {notificationMessage && <Notification notificationMessage={notificationMessage} />}

      {/* <Router> */}
        <Switch>
          <Route path="/users/:id">
            <User blogs={defaultBlogs} />
          </Route>
          <Route path="/users">
            {/* If user is not logged in, ask for login first. */}
            {loggedInUser === null ?
              <LoginForm
                handleLogin={handleLogin}
                username={username}
                password={password}
                handleLoginUserNameChange={handleLoginUserNameChange}
                handleLoginPasswordChange={handleLoginPasswordChange}
              />
              :
              // Users component
              <UsersView blogs={defaultBlogs} />
            }
          </Route>
          <Route path="/blogs/:id">
            {
              matchedBlog 
              && 
              <Blog
                blog={matchedBlog}
                updateLikes={handleUpdateBlogLikes}
                removeBlog={handleRemoveBlog}
                loginUsername={loggedInUser}
              />
            }
          </Route>
          <Route path="/blogs">
            {loginForm()}
          </Route>
          <Route path="/">
            <div>{loginForm()}</div>
          </Route>
        </Switch>
      {/* </Router> */}
    </div>

  )
}

export default App