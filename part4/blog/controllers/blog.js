/* The route handlers have also been moved into a dedicated module.
The event handlers of routes are commonly referred to as controllers,
and for this reason we have created a new controllers directory.
All of the routes related to blogs are now in the blogs.js module under the controllers directory.
*/

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', (request, response, next) => {
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

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url
  })

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url
  }

})

module.exports = blogsRouter