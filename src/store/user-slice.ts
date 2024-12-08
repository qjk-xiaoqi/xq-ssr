// https://www.reduxjs.cn/tutorials/fundamentals/part-8-modern-redux/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface User {
  id: number
  name: string
  first_name: string
  last_name: string
}

// 定义初始状态
export interface UserState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  list: User[]
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://reqres.in/api/users')
  return response.data.data
})

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    status: 'idle',
    list: [],
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        console.log('loading->>>>>')
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log('succeeded->>>>>')

        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log('failed->>>>>')
        state.status = 'failed'
      })
  },
})

export default userSlice.reducer
