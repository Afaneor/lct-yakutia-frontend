import React from 'react'
import styles from './CardDetailSection.module.scss'
import { FCC } from 'src/types'
import { Card } from 'antd'

interface CardDetailSectionProps {
  title?: string
  extra?: React.ReactNode
  imageUrl?: string
}
export const CardDetailSection: FCC<CardDetailSectionProps> = ({
  title,
  children,
  extra,
  imageUrl,
}) => {
  return (
    <Card
      className={styles.container}
      title={title}
      extra={extra}
      cover={
        imageUrl ? (
          <img
            alt='example'
            src={imageUrl}
            style={{
              maxHeight: '250px',
              objectFit: 'cover',
            }}
          />
        ) : null
      }
    >
      <div className={styles.content}>{children}</div>
    </Card>
  )
}

CardDetailSection.displayName = 'CardDetailSection'
