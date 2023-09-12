import { useParams, Link } from 'react-router-dom'
import { apiGetInfoUser } from '../services/services'
import { useState, useEffect } from 'react'

export function UserDetails () {
  const { id } = useParams()
  const [infoUser, setInfoUser] = useState(null)

  useEffect(() => {
    apiGetInfoUser(id)
      .then(data => {
        setInfoUser(data)
      })
  }, [id])

  if (!infoUser) return null

  return (
    <div>
      <h1> {infoUser.username} </h1>
      <h2>blogs</h2>
      <ul>
        {infoUser.blogs.map(blog => (
          <li key={blog.title}> <Link to={`/blogs/${blog.id}`}>{blog.title} </Link> </li>
        ))}
      </ul>
      {!infoUser.blogs.length && (<p>no blogs :/</p>)}
    </div>
  )
}
