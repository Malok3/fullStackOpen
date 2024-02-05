import React, { useState } from 'react';  

const NewBlogForm = (props) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');  

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={props.addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={(event) => setTitle(event.target.value)}
            
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>

    </div>

  )
}

export default NewBlogForm