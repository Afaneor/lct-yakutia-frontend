import React from 'react'
import styles from './CardDetailSection.module.scss'
import { FCC } from 'src/types'
import { Card } from 'antd'

interface CardDetailSectionProps {
  title?: string
  extra?: React.ReactNode
}
export const CardDetailSection: FCC<CardDetailSectionProps> = ({
  title,
  children,
  extra,
}) => {
  return (
    <Card className={styles.container} title={title} extra={extra}>
      {children}
    </Card>
  )
}

CardDetailSection.displayName = 'CardDetailSection'

export default CardDetailSection
