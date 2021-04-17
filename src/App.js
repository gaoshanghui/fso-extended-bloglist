import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
  const [successfulMessage, setSuccessfulMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      setErrorMessage('There is a error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.create(newBlog)

      const updatedBlogs = blogs.concat(response)
      setBlogs(updatedBlogs)
      setNewBlog({title: '', author: '', url: ''})
      setSuccessfulMessage(`A new blog ${response.title} by ${response.author} added`)
      setTimeout(() => {
        setSuccessfulMessage(null)
      }, 5000)

    } catch (error) {
      console.log(error.message)
    }
  }

  const loginForm = () => {
    if (user === null) {
      return (
        <div>
          <h2>log in to application</h2>
          <div>{errorMessage}</div>
          <form onSubmit={handleLogin}>
            <div>
              <label>
                Username:
                <input 
                  type="text" 
                  value={username}
                  name="username"
                  onChange={({target}) => { setUsername(target.value) }}
                />  
              </label>
            </div>
            <div>
              <label>
                Password:
                <input 
                  type="text" 
                  value={password}
                  name="password"
                  onChange={({target}) => { setPassword(target.value) }}
                />  
              </label>      
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
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
                  onChange={({target}) => { setNewBlog({...newBlog, title: target.value}) }}
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
                  onChange={({target}) => { setNewBlog({...newBlog, author: target.value}) }}
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
                  onChange={({target}) => { setNewBlog({...newBlog, url: target.value}) }}
                />  
              </label>  
            </div>
            <button type="submit">create</button>
          </form>
        </div>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }


  const handelLogout = (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }


  

  return (
    <div>
      { loginForm() }
    </div>
  )
}

export default App