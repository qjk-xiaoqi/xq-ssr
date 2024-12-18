import * as React from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchUsers } from '../../store/user-slice'

import styles from './index.less'

export const Home = () => {
  useStyles(styles)
  const dispatch = useAppDispatch()
  const userList = useAppSelector((state) => state.users?.list)

  const handleClick = () => {
    console.log('hello 小柒')
  }

  React.useEffect(() => {
    if (userList?.length > 0) {
      return
    }
    dispatch(fetchUsers())
  }, [userList])

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      hello 小柒
      {userList?.map((user) => (
        <div key={user.id}>{user.first_name + user.last_name}</div>
      ))}
    </div>
  )
}
Home.loadData = (store: any) => {
  return store.dispatch(fetchUsers())
}
