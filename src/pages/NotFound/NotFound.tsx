import React from 'react'
import styles from './style.module.scss'

export const NotFound: React.FC = () => {
  return (
    <div className={styles.container} data-testid='test-NotFound'>
      <main style={{ padding: '1rem' }}>
        <h1>404</h1>
      </main>
    </div>
  )
}

NotFound.displayName = 'NotFound'

export default NotFound
