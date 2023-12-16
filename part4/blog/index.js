const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')


app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.get('/api/blogs/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})



app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.delete('/api/blogs/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {response.status(204).end()})
    .catch(error => next(error))
})

const PORT = process.env.PORT
console.log('port',PORT)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
