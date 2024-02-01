import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'

import './index.css'

const App = () => {
  const [notificationMessage, setNotification] = useState(null)
  const [success, setSuccess] = useState(true)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const [CreateNewBlogVisible, setCreateNewBlogVisible] = useState(false)



  //empty array as a parameter ensures that the effect is executed only when the 
  //component is rendered for the first time. 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {

      setSuccess(false);
      console.log(exception)
      setNotification(`Login error: ${exception.code}: `);
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  const createNewBlog = async (event) => {
    event.preventDefault()

    try {
      blogService.setToken(user.token)
      const blogObject = {
        title: title,
        author: author,
        url: url
      }

      // Create new blog
      const newBlog = await blogService.create(blogObject);

      // Update the state with the updated list of blogs
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);

      setSuccess(true);
      setNotification(`${blogObject.title} by ${blogObject.author}  has been added to blog list.`);
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setSuccess(false);
      setNotification('Error in creating new blog');
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  //when logout
  if (user === null) {
    return (
      <div>
        <h2> Login to application</h2>
        <Notification message={notificationMessage} success={success} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>

      </div>
    )
  }

  const createNewBlogForm = () => {
    const hideWhenVisible = { display: CreateNewBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: CreateNewBlogVisible ? '' : 'none' }

    return (
      <div>

        <Notification message={notificationMessage} success={success} />
        <p>{user.username} logged in <button onClick={logout}>Logout</button></p>


        <div style={hideWhenVisible}>
          <button onClick={() => setCreateNewBlogVisible(true)}>Create</button>
        </div>

        <div style={showWhenVisible}>
          <NewBlogForm
            author={author}
            title={title}
            url={url}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleSubmit={createNewBlog}
          />
        </div>
      </div>
    )
  }
  return (
    <div>
      <button onClick={() => setCreateNewBlogVisible(false)}>Cancel</button>



      <h2>Blog list</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}


    </div>
  )




}

export default App