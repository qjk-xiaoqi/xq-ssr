import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useStyles from 'isomorphic-style-loader/useStyles'
import { fetchUsers } from '../../store/user-slice'
import styles from './index.less'

export const Home: React.FC = () => {
  useStyles(styles)
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.users?.list)
  const handleClick = () => {
    console.log('hello 小柒')
  }

  React.useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  console.log(userList, 'userList->>>>>>>>>>')
  return (
    <div className={styles.wrapper} onClick={handleClick}>
      hello 小柒
      {userList?.map((user) => (
        <div key={user.id}>{user.first_name + user.last_name}</div>
      ))}
    </div>
  )
}
