const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


// Initialise the database: The database is cleared out at the beginning,
// and after that, we save the two notes stored in the initialNotes array to the database
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('When there is initially some blogs saves', () => {


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

  test('Updating a blog', async () => {
    const newBlog = {
      title: 'blog test',
      author: 'Author Name',
      url: 'http://www.test.html',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplYW5taWNoIiwiaWQiOiI2NWE2ODUyYWRkZTljZDg1NDM3Y2M1NDAiLCJpYXQiOjE3MDU0MTE5NTR9.DAowLX7wuWG0EKikrqex51ng9zgLxE7btpWDW49b8lw')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const lastBlogAdded = response.body[response.body.length-1]

    const blog = {
      title: 'updated title',
      author: 'updated author',
      url: 'http://www.updatedurl.html',
      likes: 999,
    }
    await api
      .put(`/api/blogs/${lastBlogAdded.id}`)
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response2 = await api.get(`/api/blogs/${lastBlogAdded.id}`)
    const updatedBlog = response2.body
    expect(updatedBlog.title).toBe('updated title')
  })
})


describe('addition of a new blog', () => {
  test('a blognote can be added', async () => {
    const initialBlogs = helper.initialBlogs

    console.log(initialBlogs)
    const newBlog = {
      title: 'new blog test',
      author: 'Johnny Knoxville',
      url: 'http://www.test.html',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplYW5taWNoIiwiaWQiOiI2NWE2ODUyYWRkZTljZDg1NDM3Y2M1NDAiLCJpYXQiOjE3MDU0MTE5NTR9.DAowLX7wuWG0EKikrqex51ng9zgLxE7btpWDW49b8lw')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const authors = response.body.map(r => r.author)

    expect(response.body).toHaveLength(initialBlogs.length+1)
    expect(authors).toContain(
      'Johnny Knoxville'
    )
  })


  test('When adding a blog wihtout likes property, adds it with a value = 0  ', async () => {
    const blogWithoutLikes = {
      title: 'new blog without likes dd',
      author: 'Goran Bregovic',
      url: 'http://www.test.html'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplYW5taWNoIiwiaWQiOiI2NWE2ODUyYWRkZTljZDg1NDM3Y2M1NDAiLCJpYXQiOjE3MDU0MTE5NTR9.DAowLX7wuWG0EKikrqex51ng9zgLxE7btpWDW49b8lw')
      .send(blogWithoutLikes)
      .expect(201)

    const response = await api.get('/api/blogs')
    const lastBlog = response.body[response.body.length-1]
    expect(lastBlog).toBeDefined()
    expect(lastBlog.likes).toBe(0)
  })

  test('When adding a blog without author or url, backend responds with status 400', async () => {
    const blogNoUrl = {
      title: 'new blog without url',
      author: 'Jean Carmet'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplYW5taWNoIiwiaWQiOiI2NWE2ODUyYWRkZTljZDg1NDM3Y2M1NDAiLCJpYXQiOjE3MDU0MTE5NTR9.DAowLX7wuWG0EKikrqex51ng9zgLxE7btpWDW49b8lw')
      .send(blogNoUrl)
      .expect(400)
  })

  test ('deleting a blog', async () => {
    const newBlog = {
      title: 'Test blog to be deleted',
      author: 'Jean Claude Trouville',
      url: 'http://www.test.html',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplYW5taWNoIiwiaWQiOiI2NWE2ODUyYWRkZTljZDg1NDM3Y2M1NDAiLCJpYXQiOjE3MDU0MTE5NTR9.DAowLX7wuWG0EKikrqex51ng9zgLxE7btpWDW49b8lw')
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    const lastBlogAdded = response.body[response.body.length-1]

    await api
      .delete(`/api/blogs/${lastBlogAdded.id}`)
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplYW5taWNoIiwiaWQiOiI2NWE2ODUyYWRkZTljZDg1NDM3Y2M1NDAiLCJpYXQiOjE3MDU0MTE5NTR9.DAowLX7wuWG0EKikrqex51ng9zgLxE7btpWDW49b8lw')
      .expect(204)

    const response2 = await api.get('/api/blogs')

    const ids = response2.body.map(r => r.id)
    expect(ids).not.toContain(`${lastBlogAdded.id}`)

  })
})





afterAll(async () => {
  await mongoose.connection.close()
})