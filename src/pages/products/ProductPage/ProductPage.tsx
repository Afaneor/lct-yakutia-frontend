import React from 'react'
import styles from './ProductPage.module.scss'
import { FCC } from 'src/types'
import { useTranslation } from 'src/hooks'
import { PageWrapper } from 'src/components'
import { Card } from 'antd'

interface ProductPageProps {
  prop?: any
}
export const ProductPage: FCC<ProductPageProps> = ({ prop }) => {
  const { t } = useTranslation()

  return (
    <PageWrapper
      title={'data?.data?.name'}
      breadcrumbs={[
        {
          title: t('Проекты'),
          href: '/projects',
        },
        {
          title: 'data?.data?.name',
        },
      ]}
    >
      <Card
        title={'Описание'}
        className={styles.card}
        extra={<a href='#'>More</a>}
      >
        <p>data?.data?.description</p>
      </Card>
    </PageWrapper>
  )
}

ProductPage.displayName = 'ProductPage'

export default ProductPage
