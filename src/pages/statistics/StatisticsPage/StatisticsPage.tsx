import React from 'react'
import styles from './StatisticsPage.module.scss'
import { FCC } from 'src/types'
import PageWrapper from '../../../components/_base/PageWrapper/PageWrapper'
import { useTranslation } from 'src/hooks'

interface StatisticsPageProps {
  prop?: any
}
export const StatisticsPage: FCC<StatisticsPageProps> = ({ prop }) => {
  const { t } = useTranslation()
  return (
    <PageWrapper
      title={t('Статистика')}
      breadcrumbs={[{ title: t('Статистика'), href: '/statistics' }]}
    >
      StatisticsPage
    </PageWrapper>
  )
}

StatisticsPage.displayName = 'StatisticsPage'

export default StatisticsPage
