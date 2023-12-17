import { DotChartOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { useTranslation } from 'src/hooks'

const Statistics = lazy(
  () => import('src/pages/statistics/StatisticsPage/StatisticsPage')
)

const StatisticsRoutesNames = {
  STATISTICS: 'statistics',
}

export const StatisticsRoutes = () => {
  const { t } = useTranslation()
  return [
    {
      title: t('Статистика'),
      to: StatisticsRoutesNames.STATISTICS,
      component: <Statistics />,
      icon: <DotChartOutlined />,
      isNavLink: true,
    },
  ]
}
