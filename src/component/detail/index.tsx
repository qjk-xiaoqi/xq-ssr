import * as React from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'
import styles from './index.less'

export const Detail = () => {
  useStyles(styles)
  return <div className={styles.detail}>这是详情页</div>
}
