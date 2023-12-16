import { Spin } from 'antd'
import React from 'react'
import styles from './style.module.scss'

export const LayoutLoading: React.FC<{ transparent?: boolean }> = ({
  transparent,
}) => {
  return (
    <div
      className={styles.container}
      style={{ background: transparent ? 'transparent' : 'whitesmoke' }}
    >
      <Spin size='large' />
    </div>
  )
}

LayoutLoading.displayName = 'LayoutLoading'

export default LayoutLoading
