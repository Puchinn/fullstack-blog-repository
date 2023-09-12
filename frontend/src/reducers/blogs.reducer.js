import { createSlice } from '@reduxjs/toolkit'
import { apiGetInfoUser, apiAddBlog, apiDeleteBlogById, apiUpdateBlogLikes } from '../services/services'
import { updateNotification } from './notification.reducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs (state, action) {
      state = action.payload
      return state
    },
    addBlog (state, action) {
      state = state.concat(action.payload)
      return state
    },
    removeBlog (state, action) {
      state = state.filter(b => b.id !== action.payload.id)
      return state
    },
    updateBlog (state, action) {
      state = state.map(b => b.id === action.payload.id ? action.payload : b)
      return state
    }
  }
})

const blogsReducer = blogsSlice.reducer
const { setBlogs, addBlog, removeBlog, updateBlog } = blogsSlice.actions

const deleteBlog = (id, token, hideModal) => {
  return dispatch => {
    apiDeleteBlogById(id, token)
      .then((blog) => {
        dispatch(updateNotification({ type: 'correct', message: 'blog deleted' }))
        dispatch(removeBlog(blog))
        hideModal()
      })
      .catch(err => {
        dispatch(updateNotification({ type: 'error', message: err.error }))
        hideModal()
      })
  }
}

const createBlog = (blog, token, hideForm) => {
  return dispatch => {
    apiAddBlog(blog, token)
      .then(blog => {
        dispatch(addBlog(blog))
        dispatch(updateNotification({ type: 'correct', message: 'blog created' }))
        hideForm()
      })
      .catch(err => {
        dispatch(updateNotification({ type: 'error', message: err.error }))
      })
  }
}

const fetchBlogs = (id) => {
  return dispatch => {
    apiGetInfoUser(id)
      .then(data => dispatch(setBlogs(data.blogs)))
  }
}

const likeBlog = (id, token) => {
  return dispatch => {
    apiUpdateBlogLikes(id, token)
      .then(blog => {
        dispatch(updateBlog(blog))
        dispatch(updateNotification({ type: 'correct', message: 'blog liked!' }))
      })
      .catch(err => {
        dispatch(updateNotification({ type: 'error', message: err.error }))
      })
  }
}

export { blogsReducer, fetchBlogs, createBlog, deleteBlog, likeBlog }
