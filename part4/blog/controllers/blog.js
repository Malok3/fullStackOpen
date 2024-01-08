/* The route handlers have also been moved into a dedicated module.
The event handlers of routes are commonly referred to as controllers,
and for this reason we have created a new controllers directory.
All of the routes related to blogs are now in the blogs.js module under the controllers directory.
*/

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  //The helper function getTokenFrom isolates the token from the authorization header.
  //The validity of the token is checked with jwt.verify.
  //The method also decodes the token, or returns the Object which the token was based on.
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  //The object decoded from the token contains the username and id fields, which tell the server who made the request.
  //If the object decoded from the token does not contain the user's identity
  //(decodedToken.id is undefined), error status code 401 unauthorized is
  //returned and the reason for the failure is explained in the response body.
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

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




blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
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



blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter