import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    type: ''
  },
  reducers: {
    setNotification (state, action) {
      state = action.payload
      return state
    },
    resetNotification (state, action) {
      state.message = ''
      return state
    }
  }
})

const notificationReducer = notificationSlice.reducer
const { resetNotification, setNotification } = notificationSlice.actions

const updateNotification = (options) => {
  return dispatch => {
    dispatch(setNotification(options))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }
}

export { notificationReducer, updateNotification }
