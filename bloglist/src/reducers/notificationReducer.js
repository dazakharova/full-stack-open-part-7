import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: '' },
  reducers: {
    createNotification(state, action) {
      return action.payload
    },

    clearNotification(state, action) {
      return { message: '', type: '' }
    }
  }

})

export const setNotification = ({ message, type }, displayTime) => {
  return async dispatch => {
    dispatch(createNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime)
  }
}

export const { clearNotification, createNotification } = notificationSlice.actions
export default notificationSlice.reducer