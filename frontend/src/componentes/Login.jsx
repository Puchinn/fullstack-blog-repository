import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { loginUser } from '../reducers/user.reducer'
import { useNavigate } from 'react-router-dom'

export function Login () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  if (user.username) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    const loginData = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    dispatch(loginUser(loginData, navigate))
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='username'>
          <Form.Label>User Name:</Form.Label>
          <Form.Control type='text' placeholder='username'></Form.Control>
        </Form.Group>
       <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='your password here'></Form.Control>
       </Form.Group>
       <Button className='mt-2' type='submit'>Login</Button>
      </Form>
    </div>
  )
}
