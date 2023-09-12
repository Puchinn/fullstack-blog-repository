import { Form, Button } from 'react-bootstrap'

export function Comment ({ commentFunction }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.comment.value
    commentFunction(value)
    e.target.comment.value = ''
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="comment">
        <Form.Label>Add comment</Form.Label>
        <Form.Control type="text"></Form.Control>
      </Form.Group>
      <Button type='submit' className='mt-2'>send</Button>
    </Form>
  )
}
