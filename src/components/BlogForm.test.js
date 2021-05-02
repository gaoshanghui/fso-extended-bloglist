import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm>', () => {
  test('updates state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const form = component.container.querySelector('form')
    const inputTitle = component.container.querySelector('.new-blog-form__title-input')
    const inputAuthor = component.container.querySelector('.new-blog-form__author-input')
    const inputUrl = component.container.querySelector('.new-blog-form__url-input')

    fireEvent.change(inputTitle, {
      target: { value: 'blog title' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'blog author' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'blog url' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('blog title')
    expect(createBlog.mock.calls[0][0].author).toBe('blog author')
    expect(createBlog.mock.calls[0][0].url).toBe('blog url')
  })
})