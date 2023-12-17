import React, { lazy, Suspense } from 'react'
import { FCC } from 'src/types'
import styles from './ProductCard.module.scss'
import { Button, Card, Space, Spin, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { ProjectFields } from 'src/models'
const ReactMarkdown = lazy(() => import('react-markdown'))

const { Title, Paragraph } = Typography

interface ProductCardProps {
  extra?: React.ReactNode
  id: number
  title?: string
  description?: string
  projects?: ProjectFields[]
  onClick?: () => void
  onDelete?: (id: number) => void
}
export const ProductCard: FCC<ProductCardProps> = ({
  id,
  extra,
  title,
  description = '',
  onClick,
  onDelete,
  projects,
}) => {
  return (
    <Card
      title={
        <Title ellipsis level={4}>
          {title}
        </Title>
      }
      style={{ width: '100%', marginBottom: 16, height: '350px' }} // Задаем фиксированную высоту
      extra={
        <Space direction={'horizontal'}>
          {extra}
          {onDelete ? (
            <Button
              type={'text'}
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.preventDefault()
                onDelete?.(id)
              }}
            />
          ) : null}
        </Space>
      }
      onClick={onClick}
    >
      <div>
        <Paragraph strong>Описание: </Paragraph>
        <Suspense fallback={<Spin spinning />}>
          <Paragraph className={styles.description}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </Paragraph>
        </Suspense>
      </div>
    </Card>
  )
}

ProductCard.displayName = 'ProductCard'

export default ProductCard
