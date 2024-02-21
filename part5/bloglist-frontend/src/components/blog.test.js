import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'


describe('Blog component', () => {

  test('Title and author are rendered', () => {
    const blog = {
      title: 'TestBlog name',
      author: 'John Doe',
      url:'http://www.url.com',
      likes:'999'
    }
    const { container } = render(<Blog blog={blog} />)

    const spanAuthor = container.querySelector('.blogTitle')
    expect(spanAuthor).toHaveTextContent(
      'TestBlog name'
    )
    const spanTitle = container.querySelector('.blogAuthor')
    expect(spanTitle).toHaveTextContent(
      'John Doe'
    )
  })
})


describe('Togglable components', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
            togglable content
        </div>
      </Togglable>
    ).container
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the component received as props is called twice.', async () => {
    const blog = {
      title: 'TestBlog name',
      author: 'John Doe',
      url:'http://www.url.com',
      likes:'0'
    }
    // The event handler is a mock function defined with Jest
    const mockHandler = jest.fn()

    render(
      <Blog blog={blog} updateBlog={mockHandler}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('Like')

    await user.dblClick(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('New blog form', () => {
  test('The form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<NewBlogForm addBlog={createBlog}/>)

    const blogTitle = container.querySelector('#blog-title')
    const blogAuthor = container.querySelector('#blog-author')
    const blogUrl = container.querySelector('#blog-url')
    const submitBtn = container.querySelector('#blog-submit')

    await user.type(blogTitle, 'Saturday Night')
    await user.type(blogAuthor, 'Oliver Chattam')
    await user.type(blogUrl, 'http://www.test.com')
    await user.click(submitBtn)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Saturday Night')
    expect(createBlog.mock.calls[0][0].author).toBe('Oliver Chattam')
    expect(createBlog.mock.calls[0][0].url).toBe('http://www.test.com')

  })

})