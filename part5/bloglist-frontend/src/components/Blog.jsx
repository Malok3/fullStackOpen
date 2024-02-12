import { useState } from "react"

const Blog = ({ blog, updateBlog, deleteBlog}) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const addLike = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes +1 
    })
    console.log(updatedBlog)
    updateBlog(blog.id, updatedBlog)
  }
  return (
    <div className="blogStyle">
    {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'See less' : 'See more'}</button>
    <div style={showWhenVisible}>
      {blog.url} <br />
        Likes: {blog.likes} <button onClick={addLike}>Like</button> <br />
        
        {blog.user && `Added by ${blog.user.name}`}<br />
        <button onClick={deleteBlog}>Delete blog</button>
    </div>
   </div>  
  )
}

export default Blog