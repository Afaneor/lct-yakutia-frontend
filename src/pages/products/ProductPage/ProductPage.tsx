import React from 'react'
import styles from './ProductPage.module.scss'
import { FCC } from 'src/types'
import { useTranslation } from 'src/hooks'
import { CardDetailSection, PageWrapper } from 'src/components'
import { Col, Row } from 'antd'
import { ProductsModel } from 'src/models'
import { useEntityPage } from 'src/pages/hooks/useEntityPage'
import EditableMarkdown from 'src/components/_base/EditableMarkdown/EditableMarkdown'
import { ProjectsRoutesNames } from 'src/routes/projectsRoutes'

interface ProductPageProps {
  prop?: any
}

const model = ProductsModel
export const ProductPage: FCC<ProductPageProps> = ({ prop }) => {
  const { t, tF } = useTranslation()
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
          title: t('Проекты'),
          href: `/${ProjectsRoutesNames.PROJECTS}`,
        },
        {
          title: data?.data?.name,
        },
      ]}
    >
      <>
        <Row gutter={[16, 16]}>
          <Col xs={24} xl={12}>
            <CardDetailSection title={'Описание'}>
              {data?.data ? (
                <EditableMarkdown
                  text={data?.data?.description}
                  onSave={(text) => handleUpdate('description', text)}
                />
              ) : null}
            </CardDetailSection>
          </Col>
        </Row>
      </>
    </PageWrapper>
  )
}

ProductPage.displayName = 'ProductPage'

export default ProductPage
