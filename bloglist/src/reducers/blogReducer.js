import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog (state, action) {
      state.push(action.payload)
    },
    like (state, action) {
      const id = action.payload
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = {...blogToChange, likes: blogToChange.likes + 1}

      return state.map(b => b.id !== id ? b : changedBlog)
    },
    removeBlog (state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    },
    setBlogs (state, action) {
      return action.payload
    }
  }
})

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = (blogObj, id) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blogObj, id)
    dispatch(like(updatedBlog.id))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const { like, appendBlog, removeBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer