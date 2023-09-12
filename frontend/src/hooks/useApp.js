import { useState, useEffect } from 'react'
import { useSetMessages } from './useSetMessages'
import {
  apiDeleteBlogById,
  apiAddBlog, doLogin, apiGetInfoUser, apiUpdateBlogLikes
} from '../services/services'
import { useDispatch } from 'react-redux'
import { updateNotification } from '../reducers/notification.reducer'

export function useApp () {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const { message, showMessage } = useSetMessages()
  const [user, setUser] = useState(null)

  const addBlog = (blog) => {
    const newBlog = {
      ...blog
    }
    apiAddBlog(newBlog, user.token)
      .then((blog) => {
        setBlogs(blogs.concat(blog))
        showMessage({
          type: 'correcto',
          text: 'blog created'
        })
      })
      .catch((err) => showMessage({ type: 'error', text: err.error }))
  }

  const deleteBlog = (id) => {
    apiDeleteBlogById(id, user.token)
      .then(() => {
        const nuevasNotas = blogs.filter((n) => n.id !== id)
        setBlogs(nuevasNotas)
        showMessage({ type: 'correcto', text: 'blog deleted' })
      })
      .catch((err) => showMessage({ type: 'error', text: err.error }))
  }

  const appDoLogin = (data) => {
    doLogin(data)
      .then((res) => {
        window.localStorage.setItem('appUser', JSON.stringify(res))
        setUser(res)
        dispatch(updateNotification({ type: 'correct', message: 'login' }))
      })
      .catch(err => dispatch(updateNotification({ type: 'error', message: err.error })))
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('appUser')
  }

  const updateLikes = (id) => {
    apiUpdateBlogLikes(id, user.token)
      .then((res) => {
        const newBlogs = blogs.map(blog => blog.id === res.id ? res : blog)
        setBlogs(newBlogs)
        showMessage({ type: 'correcto', text: 'liked' })
      })
      .catch(err => showMessage({ type: 'error', text: err.error }))
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('appUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      apiGetInfoUser(user.id)
        .then(data => setBlogs(data.blogs))
    }
  }, [])

  useEffect(() => {
    if (user) {
      apiGetInfoUser(user.id)
        .then(data => setBlogs(data.blogs))
    }
    return setBlogs([])
  }, [user])

  return { blogs, addBlog, deleteBlog, message, appDoLogin, user, logOut, updateLikes }
}
