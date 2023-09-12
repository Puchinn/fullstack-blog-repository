import { configureStore } from '@reduxjs/toolkit'
import { notificationReducer } from '../reducers/notification.reducer'
import { userReducer } from '../reducers/user.reducer'
import { blogsReducer } from '../reducers/blogs.reducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    blogs: blogsReducer
  }
})

export { store }
