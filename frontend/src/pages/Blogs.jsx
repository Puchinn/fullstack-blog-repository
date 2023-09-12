import { useState, useEffect } from 'react'
import { apiGetBlogs } from '../services/services'
import { Link } from 'react-router-dom'

export function Blogs () {
  const [blogs, setBlogs] = useState(null)

  useEffect(() => {
    apiGetBlogs()
      .then(blogs => setBlogs(blogs))
  }, [])

  if (!blogs) return null

  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map(blog => <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
        </li>)}
      </ul>
    </div>
  )
}
