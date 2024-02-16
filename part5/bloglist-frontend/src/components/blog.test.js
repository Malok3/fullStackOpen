import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'

test('renders content', () => {
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


describe('<Togglable />', () => {
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
    console.log(user)
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})