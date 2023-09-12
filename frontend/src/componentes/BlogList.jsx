import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import { Blog } from './Blog'

export function BlogList () {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  if (!user.username) return null
  const blogList = blogs.map((blog) => {
    return <Blog key={blog.id} data={blog} />
  })

  return (
    <>
      <h2>My blogs</h2>
      <ListGroup>{blogList}</ListGroup>
    </>
  )
}
