import { ListGroup, Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogs.reducer'

export function Blog ({ data }) {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)
  const { title, url, author, likes, id } = data
  const [showModal, setShowModal] = useState(false)

  const showModalClick = () => {
    setShowModal(true)
  }

  const hideModalClick = () => {
    setShowModal(false)
  }

  const handleDeleteBlog = () => {
    dispatch(deleteBlog(id, token, hideModalClick))
  }

  const handdleLike = () => {
    dispatch(likeBlog(id, token))
  }

  return (
    <ListGroup.Item>
      <h2>{title}</h2>
      <p>author:{author} </p>
      <a>{url}</a>
      <p>Likes : {likes}</p>
      <div>
        <Button className='mx-2' variant='warning' onClick={showModalClick} >delete blog </Button>
        <Button onClick={handdleLike}>Like</Button>
      </div>
      <Modal show={showModal} onHide={hideModalClick}>
          <Modal.Header>
            <Modal.Title>Delete blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            are you sure?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={hideModalClick}>cancel</Button>
            <Button variant='danger' onClick={handleDeleteBlog}>delete</Button>
          </Modal.Footer>
        </Modal>
    </ListGroup.Item>
  )
}
