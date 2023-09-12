import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogs.reducer'

const isTesting = process.env.NODE_ENV === 'test'

export function CreateBlog () {
  const user = useSelector(state => state.user)
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()

  const showForm = () => {
    setIsVisible(true)
  }
  const hiddeForm = () => {
    setIsVisible(false)
  }
  if (!user.username && !isTesting) return null
  if (!isVisible) {
    return <Button className='mt-2' onClick={showForm}>create a blog</Button>
  }
  const handdleSubmit = (event) => {
    event.preventDefault()
    const eventTarget = event.target
    const blog = {
      url: eventTarget.url.value,
      title: eventTarget.title.value,
      author: eventTarget.author.value
    }
    dispatch(createBlog(blog, user.token, hiddeForm))
  }

  return (
    <>
      <h2>create blog</h2>
      <Form className='border p-3' onSubmit={handdleSubmit}>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' placeholder='Random blog'></Form.Control>
        </Form.Group>
        <Form.Group controlId='author'>
          <Form.Label>Author</Form.Label>
          <Form.Control type='text' placeholder='some author'></Form.Control>
        </Form.Group>
        <Form.Group controlId='url'>
          <Form.Label>Url</Form.Label>
          <Form.Control type='text' placeholder='url of blog'></Form.Control>
        </Form.Group>
        <Button className='m-2' type='submit'>create</Button>
        <Button variant='secondary' onClick={hiddeForm} type='button'>cancel</Button>
      </Form>
    </>
  )
}
