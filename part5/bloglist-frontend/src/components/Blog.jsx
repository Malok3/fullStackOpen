import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes +1
    })
    updateBlog(blog.id, updatedBlog)
  }

  const removeBlog = () => {
    deleteBlog(blog.id, blog)
  }

  return (
    <div className="blog">
      <span className='blogTitle'>{blog.title}</span> by <span className='blogAuthor'>{blog.author}</span> <button onClick={toggleVisibility} id="seemore-button">{visible ? 'See less' : 'See more'}</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        Likes: <span id="likes-number">{blog.likes}</span> <button onClick={addLike} id="like-button">Like</button> <br />
        {blog.user && `Added by ${blog.user.name}`}<br />
        <button onClick={removeBlog} id="delete-button">Delete blog</button>
      </div>
    </div>
  )
}

export default Blog