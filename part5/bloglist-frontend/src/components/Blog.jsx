import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div className="blogStyle">
    {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'See less' : 'See more'}</button>
    <div style={showWhenVisible}>
      {blog.url} <br />
        Likes: {blog.likes} <button>Like</button> <br />
        {blog.user && `Added by ${blog.user.name}`}
    </div>
   </div>  
  )
}

export default Blog