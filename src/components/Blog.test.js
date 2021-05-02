import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
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

    component = render(
      <Blog blog={blog} />
    )
  })

  test('at start only renders blog with title and author', () => {
    expect(component.container).toHaveTextContent('A test blog')
    
    const div = component.container.querySelector('.blog__body')
    expect(div).toHaveStyle('display: none')
  })

  test('blog\'s url and likes are shown when the controlling button has been clicked', () => {
    const button = component.container.querySelector('.blog__view-controlling-button')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog__body')
    expect(div).not.toHaveStyle('display: none')
  })

  test('like button is clicked twice', () => {
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

    const mockHandler = jest.fn()
    
    component = render(
      <Blog blog={blog} updateLikes={mockHandler} />
    )

    const button = component.container.querySelector('.blog__like-button')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})