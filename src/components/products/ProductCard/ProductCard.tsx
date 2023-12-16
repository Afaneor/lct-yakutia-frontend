import React, { lazy, Suspense } from 'react'
import { FCC } from 'src/types'
import { Button, Card, Space, Spin, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import { ProductsRoutesNames } from 'src/routes/productsRoutes'
const ReactMarkdown = lazy(() => import('react-markdown'))

const { Title, Paragraph } = Typography

interface ProductCardProps {
  extra?: React.ReactNode
  id: number
  title?: string
  description?: string
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
}) => {
  return (
    <NavLink to={`/${ProductsRoutesNames.PRODUCTS}/${id}`}>
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
        hoverable
        onClick={onClick}
      >
        <div>
          <Paragraph strong>Описание: </Paragraph>
          <Suspense fallback={<Spin spinning />}>
            <Paragraph
              style={{
                overflow: 'scroll',
                height: '200px',
              }}
            >
              <ReactMarkdown>{description}</ReactMarkdown>
            </Paragraph>
          </Suspense>
        </div>
      </Card>
    </NavLink>
  )
}

ProductCard.displayName = 'ProductCard'

export default ProductCard
