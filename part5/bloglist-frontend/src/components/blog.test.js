import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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