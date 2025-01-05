import * as React from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'
import styles from './index.less'

const Comment = () => {
  useStyles(styles)
  return <div className={styles.comment}>这是相关评论</div>
}

export default Comment
