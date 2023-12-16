import React from 'react'
import { FCC } from 'src/types'
import { useTranslation } from 'src/hooks'
import { Col } from 'antd'
import { ProductsFields, ProductsModel } from 'src/models/Products'
import { EntityItemsPageWrapperPage, SourceLink } from 'src/components'
import { ProductsRoutesNames } from 'src/routes/productsRoutes'
import { ProductCard } from 'src/components/products/ProductCard'

const MODEL = ProductsModel

export const ProductsPage: FCC = () => {
  const { tF } = useTranslation()
  const [PageTitle] = React.useState(tF('Продукты'))

  return (
    <EntityItemsPageWrapperPage
      pageTitle={PageTitle}
      model={MODEL}
      breadcrumbs={[
        {
          href: `/${ProductsRoutesNames.PRODUCTS}`,
          title: PageTitle,
        },
      ]}
      itemsRender={(item: ProductsFields) => (
        <Col key={item.id} xs={24} md={12} xl={8}>
          <ProductCard
            id={item.id}
            title={item.name}
            description={item.description}
            extra={<SourceLink link={item.link} />}
          />
        </Col>
      )}
    />
  )
}

ProductsPage.displayName = 'ProductsPage'

export default ProductsPage
