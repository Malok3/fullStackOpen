import { useState, useEffect } from 'react'

import Blog from './components/Blog'

import blogService from './services/blogs'

import Notification from './components/Notification'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/togglable'

import './index.css'

const App = () => {
  const [notificationMessage, setNotification] = useState(null)
  const [success, setSuccess] = useState(true)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // const [author, setAuthor] = useState('')
  // const [title, setTitle] = useState('')
  // const [url, setUrl] = useState('')


  // Empty array as a parameter ensures that the effect is executed 
  // only when the component is rendered for the first time. 
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


  // Login
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
      setNotification(`Login error: wrong credentials `);
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }


  //Logout
  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }


  // If user is logged out display login form
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
  

  // Sort blogs according to their number of likes
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);


  //Create a blog
  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
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

  
  // Update blog
  const updateBlog = async (id, updatedBlog) => {
    try {
      const asda = await blogService.update(id, updatedBlog)
      //refresh blog list
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);

      setSuccess(true);
      setNotification(`${updatedBlog.title} by ${updatedBlog.author}  has been updated.`);
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setSuccess(false);
      setNotification('Error in updating blog');
      console.log(exception)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }


  // Delete a blog 

  const deleteBlog = async (id, blog) => {
    try {
      if (window.confirm(`Do you really want to delete ${blog.title} by ${blog.author} ?`)) {

        const del = await blogService.deleteBlog(id)
        //refresh blog list
        const updatedBlogs = await blogService.getAll();
        setBlogs(updatedBlogs);

        setSuccess(true);
        setNotification(`${blog.title} by ${blog.author}  has been deleted.`);
        setTimeout(() => {
          setNotification(null)
        }, 5000)  
      }
      
    }
    catch (exception) {
      setSuccess(false);
      setNotification('Error in deleting blog');
      console.log(exception)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }


  return (
    <div>
      <Notification message={notificationMessage} success={success} />
      <p>
        {user.username} logged in <button onClick={logout}>Logout</button>
      </p>
    
      <Togglable buttonLabel="New blog">
        <NewBlogForm addBlog={addBlog} />
      </Togglable>
    
      <h2>Blog list</h2>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
      ))}
    </div>
  )

}

export default App