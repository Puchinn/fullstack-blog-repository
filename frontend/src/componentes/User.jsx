import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { resetUser } from '../reducers/user.reducer'
import { useNavigate } from 'react-router-dom'

export function User () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { username } = useSelector(state => state.user)
  if (!username) return null

  const logOut = () => {
    dispatch(resetUser())
    navigate('/login')
  }

  return (
    <div>
      <h1>logged in {username}
        <Button variant='outline-primary' onClick={logOut}>logout</Button>
      </h1>
    </div>
  )
}
