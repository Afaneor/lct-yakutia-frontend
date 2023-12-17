import React from 'react'
import { SnippetsOutlined } from '@ant-design/icons'
import { lazy } from 'react'
import { useTranslation } from 'src/hooks'
import { Link } from 'src/routes/routesList'

const Products = lazy(
  () => import('src/pages/products/ProductsPage/ProductsPage')
)

export const ProductsRoutesNames = {
  PRODUCTS: 'products',
  PRODUCT: 'product',
}

export const ProductsRoutes = () => {
  const { t } = useTranslation()
  return [
    {
      title: t('Продукты'),
      to: ProductsRoutesNames.PRODUCTS,
      component: <Products />,
      icon: <SnippetsOutlined />,
      isNavLink: true,
    },
  ] as Link[]
}
