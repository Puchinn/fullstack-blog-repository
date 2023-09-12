import { useState, useEffect } from 'react'
import { apiGetUsers } from '../services/services'
import { Link } from 'react-router-dom'

export function UsersPage () {
  const [users, setUsers] = useState([])

  if (!users) return null

  useEffect(() => {
    apiGetUsers()
      .then(data => setUsers(data))
  }, [])

  return (
    <div>
      <h1>Users</h1>
      {users.map(u => (
        <li key={u.id}>
          <Link to={`/users/${u.id}`}> {u.username} </Link>
        </li>
      ))}
    </div>
  )
}
