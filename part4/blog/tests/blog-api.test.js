const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Unique identifier property of the blog posts is named id', async () => {

  await api
    .get('/api/blogs')
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()

})

test('a blognote can be added', async () => {
  const initialBlogs = await api.get('/api/blogs')
  const newBlog = {
    title: 'new blog test',
    author: 'Johnny Knoxville',
    url: 'http://www.test.html',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const authors = response.body.map(r => r.author)

  expect(response.body).toHaveLength(initialBlogs.body.length + 1)
  expect(authors).toContain(
    'Johnny Knoxville'
  )
})

test('is the likes property is missing from the request', async () => {
  const blogWithoutLikes = {
    title: 'new blog without likes dd',
    author: 'Goran Bregovic',
    url: 'http://www.test.html'
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutLikes)
    .expect(201)

  const response = await api.get('/api/blogs')
  const blogs = response.body

 console.log('ui',blogs)
})

afterAll(async () => {
  await mongoose.connection.close()
})