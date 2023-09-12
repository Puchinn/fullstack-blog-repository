import { render, fireEvent } from '@testing-library/react'
import { Blog } from '../componentes/Blog'

test('renders content', () => {
  const data = {
    title: 'testing blog',
    url: 'nothing',
    author: 'esteban from test',
    likes: 10
  }
  const mockFun = jest.fn()

  const component = render(
    <Blog data={data} testFunc={mockFun} />
  )
  const button = component.getByText('Like')
  expect(button).toBeInTheDocument()
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockFun.mock.calls).toHaveLength(2)
  expect(component.container).toHaveTextContent('testing blog')
})
