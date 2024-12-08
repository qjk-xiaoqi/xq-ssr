import { configureStore } from '@reduxjs/toolkit'
import usersReducer, { UserState } from './user-slice'

export const getStore = () => {
  return configureStore({
    // reducer是必需的，它指定了应用程序的根reducer
    reducer: {
      users: usersReducer,
    },
    // 对象，它包含应用程序的初始状态
    preloadedState: {
      users:
        typeof window !== 'undefined'
          ? window.INITIAL_STATE?.users
          : ({
              status: 'idle',
              list: [],
            } as UserState),
    },
  })
}

// 全局State类型
export type RootState = ReturnType<ReturnType<typeof getStore>['getState']>

export type AppDispatch = ReturnType<typeof getStore>['dispatch']
