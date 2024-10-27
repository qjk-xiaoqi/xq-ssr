import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './user-slice'

export const getStore = () =>
  configureStore({
    reducer: {
      users: usersReducer,
    },
  })
