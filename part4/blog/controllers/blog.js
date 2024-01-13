/* The route handlers have also been moved into a dedicated module.
The event handlers of routes are commonly referred to as controllers,
and for this reason we have created a new controllers directory.
All of the routes related to blogs are now in the blogs.js module under the controllers directory.
*/

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


// we use middleware specifically on post routes and delete routes
blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor,async (request, response) => {
  const body = request.body
  const user = request.user

  if (!body.likes) {
    body.likes = 0
  }
  if (!body.author || !body.url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})


blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(403).json({ error: 'Unauthorized user' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json({ message: `Blog successfully deleted: ${request.params.id}` }).end()
  } catch (error) {
    next(error)
  }
})


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
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


module.exports = blogsRouter