import React from 'react'
import { FCC } from 'src/types'
import { useTranslation } from 'src/hooks'
import { CardDetailSection, PageWrapper } from 'src/components'
import { Col, Row, Typography } from 'antd'
import { ProductsModel } from 'src/models'
import { useEntityPage } from 'src/pages/hooks/useEntityPage'
import { ProductsRoutesNames } from 'src/routes/productsRoutes'
import SourceLink from '../../../components/_base/SourceLink/SourceLink'
const { Text } = Typography
interface ProductPageProps {
  prop?: any
}

const model = ProductsModel
export const ProductPage: FCC<ProductPageProps> = ({ prop }) => {
  const { t } = useTranslation()
  const {
    data,
    refetch,
    handleUpdate,
  }: {
    data: any
    isLoading: boolean
    refetch: CallableFunction
    handleUpdate: CallableFunction
  } = useEntityPage(model)

  return (
    <PageWrapper
      title={data?.data?.name}
      breadcrumbs={[
        {
          title: t('Продукты'),
          href: `/${ProductsRoutesNames.PRODUCTS}`,
        },
        {
          title: data?.data?.name,
        },
      ]}
    >
      <>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <CardDetailSection
              title={'Описание'}
              imageUrl={data?.data?.image}
              extra={<SourceLink link={data?.data?.link} />}
            >
              <Text>{data?.data?.description}</Text>
            </CardDetailSection>
          </Col>
          <Col xs={24}>
            <CardDetailSection
              title={'Проекты, в которых используется продукт'}
              extra={<SourceLink link={data?.data?.link} />}
            >
              <Text>{data?.data?.description}</Text>
            </CardDetailSection>
          </Col>
        </Row>
      </>
    </PageWrapper>
  )
}

ProductPage.displayName = 'ProductPage'

export default ProductPage
