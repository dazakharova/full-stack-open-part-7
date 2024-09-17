import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer.js'
import notificationReducer from './reducers/notificationReducer.js'
import loggedUserReducer from './reducers/loggedUserReducer.js'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    loggedUser: loggedUserReducer
  }
})

export default store