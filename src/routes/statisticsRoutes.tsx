import { BarChartOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { useTranslation } from 'src/hooks'

const Statistics = lazy(
  () => import('src/pages/statistics/StatisticsPage/StatisticsPage')
)

export const StatisticsRoutes = () => {
  const { t } = useTranslation()
  return [
    {
      title: t('Статистика'),
      to: 'statistics',
      component: <Statistics />,
      icon: <BarChartOutlined />,
    },
  ]
}
