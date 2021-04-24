import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successfulMessage, setSuccessfulMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.message)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handelLogout = (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }

  const handleLoginUserNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleLoginPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      const updatedBlogs = blogs.concat(response)
      setBlogs(updatedBlogs)

      setSuccessfulMessage(`A new blog ${response.title} by ${response.author} added`)
      setTimeout(() => {
        setSuccessfulMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleUpdateBlogLikes = async (blogObject) => {
    try {
      const response = await blogService.update(blogObject)
      const newBlogs = blogs.map((blog) => {
        if (blog.id === blogObject.id) return blogObject
        return blog
      })
      setBlogs(newBlogs)
    } catch (error) {
      console.log(error.message)
    }
  }

  const loginForm = () => {
    if (user === null) {
      return (
        <LoginForm 
          errorMessage={errorMessage}
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

    return (
      <div>
        <h2>blogs</h2>
        <div>{successfulMessage}</div>
        <div>
          {`${loggedUserName} logged in`}
          <button onClick={handelLogout}>logout</button>
        </div>

        <Togglable buttonLabel="new blog">
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={handleUpdateBlogLikes}/>
        )}
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