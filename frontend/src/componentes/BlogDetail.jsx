import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getBlogById, commentBlog } from '../services/services'
import { Comment } from './Comment'
import { useSelector } from 'react-redux'

export function BlogDetails () {
  const { id } = useParams()
  const [blogInfo, setBlogInfo] = useState(null)
  const [comments, setComments] = useState([])
  const { token } = useSelector(state => state.user)

  const sendComment = (value) => {
    commentBlog(value, id, token)
      .then(() => setComments(comments.concat(value)))
  }

  useEffect(() => {
    getBlogById(id)
      .then(data => {
        setBlogInfo(data)
        setComments(data.comments)
      })
  }, [id])

  if (!blogInfo) return null

  return (
    <div>
      <h2> { blogInfo.title } </h2>
      <a href="#"> {blogInfo.url} </a>
      <p>likes: {blogInfo.likes} </p>
      <p>added by: {blogInfo.user.username} </p>
      <h2>comments</h2>
        <ul>
          {comments.map(c => <li key={c}> {c} </li>)}
          {!comments.length && 'no comments :('}
        </ul>
      <Comment commentFunction={sendComment} />
    </div>
  )
}
