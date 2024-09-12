import * as React from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'
import styles from './index.less'

export const Home: React.FC = () => {
  useStyles(styles)
  const handleClick = () => {
    console.log('hello 小柒')
  }
  return (
    <div className={styles.wrapper} onClick={handleClick}>
      hello 小柒
    </div>
  )
}
