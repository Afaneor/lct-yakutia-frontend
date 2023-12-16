import React from 'react'
import { SnippetsOutlined } from '@ant-design/icons'
import { lazy } from 'react'
import { useTranslation } from 'src/hooks'
import { Link } from 'src/routes/routesList'

const Products = lazy(
  () => import('src/pages/products/ProductsPage/ProductsPage')
)
const Product = lazy(() => import('src/pages/products/ProductPage/ProductPage'))

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
    {
      title: t('Продукт'),
      to: `/${ProductsRoutesNames.PRODUCTS}/:id`,
      component: <Product />,
      icon: undefined,
      isNavLink: false,
    },
  ] as Link[]
}
