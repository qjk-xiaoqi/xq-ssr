import * as React from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'
import { fetchUsers } from '../../store/user-slice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import styles from './index.less'

export const Home = () => {
  useStyles(styles)
  const dispatch = useAppDispatch()
  const userList = useAppSelector((state) => state.users?.list)

  const handleClick = () => {
    console.log('hello 小柒')
  }

  React.useEffect(() => {
    // console.log(userList, 'userList->>>>>>>>>>')
    dispatch(fetchUsers())
  }, [])

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
