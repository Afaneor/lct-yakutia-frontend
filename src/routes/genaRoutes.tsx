import { MessageOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { useTranslation } from 'src/hooks'

const Gena = lazy(() => import('src/pages/gena/GenaPage/GenaPage'))

export const GenaRoutes = () => {
  const { t } = useTranslation()
  return [
    {
      title: t('Действуй, Гена!'),
      to: '/gena',
      component: <Gena />,
      icon: <MessageOutlined />,
      isNavLink: false,
    },
  ]
}
