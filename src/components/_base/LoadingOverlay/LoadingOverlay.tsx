import React from 'react'
import styles from './LoadingOverlay.module.scss'
import { FCC } from 'src/types'
import { Spin } from 'antd'

interface LoadingOverlayProps {
  isLoading?: boolean
}
export const LoadingOverlay: FCC<LoadingOverlayProps> = ({
  children,
  isLoading,
}) => {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spin />
        </div>
      ) : null}
      {children}
    </div>
  )
}

LoadingOverlay.displayName = 'LoadingOverlay'

export default LoadingOverlay
