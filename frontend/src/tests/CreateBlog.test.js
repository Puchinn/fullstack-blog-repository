import { CreateBlog } from '../componentes/CreateBlog'
import { render, fireEvent } from '@testing-library/react'

describe('testing createblog component', () => {
  let element
  beforeEach(() => {
    element = render(<CreateBlog />)
  })

  test('render button create a blog', () => {
    const button = element.getByText('create a blog')
    expect(button).toBeInTheDocument()
  })

  test('click on button show a form', () => {
    const button = element.getByText('create a blog')
    fireEvent.click(button)
    const form = element.container.querySelector('form')
    expect(form).toBeInTheDocument()
  })

  test('cancel button hidde the form', () => {
    const button = element.getByText('create a blog')
    fireEvent.click(button)
    const cancelButton = element.getByText('cancel')
    const form = element.container.querySelector('form')
    expect(cancelButton).toBeInTheDocument()
    fireEvent.click(cancelButton)
    expect(form).not.toBeInTheDocument()
  })

  test('writing on the input form', () => {
    const button = element.getByText('create a blog')
    fireEvent.click(button)
    const form = element.container.querySelector('form')
    const titleInput = form.querySelector('#title')
    fireEvent.change(titleInput, {
      target: { value: 'algo nuevo' }
    })
    expect(titleInput).toHaveValue('algo nuevo')
  })
})
