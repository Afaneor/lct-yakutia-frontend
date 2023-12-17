import React from 'react'
import { ClusterOutlined } from '@ant-design/icons'
import { lazy } from 'react'
import { useTranslation } from 'src/hooks'
import { Link } from 'src/routes/routesList'

const SalesChannelsPage = lazy(
  () => import('src/pages/salesChannels/SalesChannelsPage/SalesChannelsPage')
)

export const SalesChannelsRoutesNames = {
  SALES_CHANNELS: 'sales-channels',
}

export const SalesChannelsRoutes = () => {
  const { t } = useTranslation()
  return [
    {
      title: t('Каналы связи'),
      to: SalesChannelsRoutesNames.SALES_CHANNELS,
      component: <SalesChannelsPage />,
      icon: <ClusterOutlined />,
      isNavLink: true,
    },
  ] as Link[]
}
