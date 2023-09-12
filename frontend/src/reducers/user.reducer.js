import { createSlice } from '@reduxjs/toolkit'
import { doLogin } from '../services/services'
import { updateNotification } from './notification.reducer'
import { fetchBlogs } from './blogs.reducer'

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser (state, action) {
      state = action.payload
      return state
    },
    resetUser (state, action) {
      window.localStorage.removeItem('appUser')
      state = {}
      return state
    }
  }
})

const userReducer = userSlice.reducer
const { resetUser, setUser } = userSlice.actions

const loginUser = (user, navigate) => {
  return dispatch => {
    doLogin(user)
      .then(res => {
        window.localStorage.setItem('appUser', JSON.stringify(res))
        dispatch(setUser(res))
        dispatch(updateNotification({ type: 'correct', message: 'login' }))
        dispatch(fetchBlogs(res.id))
        navigate('/')
      })
      .catch(err => {
        dispatch(updateNotification({ type: 'error', message: err.error }))
      })
  }
}

export { userReducer, resetUser, setUser, loginUser }
