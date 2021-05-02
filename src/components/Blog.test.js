import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog with title and author', () => {
  const blog = {
    author: 'Test Author',
    id: '1234567',
    likes: 6,
    title: 'A test blog',
    url: 'https://github.com/testing-library/react-testing-library',
    user: {
      username: 'reacttestinglibrary'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('A test blog')
})