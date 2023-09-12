import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function Nav () {
  const user = useSelector(state => state.user)
  if (!user.username) return null

  return (
    <nav>
      <Link to={'/'}> Home </Link>
      <Link className='mx-2' to={'/users'}> Users </Link>
      <Link to={'/blogs'}>All Blogs </Link>
    </nav>
  )
}
