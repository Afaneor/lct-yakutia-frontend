import { UserOutlined } from '@ant-design/icons'
import React, { lazy } from 'react'
import { useTranslation } from 'src/hooks'
import { Link } from 'src/routes/routesList'

const Users = lazy(() => import('src/pages/usersRequests/UsersPage/UsersPage'))

const UsersRoutesNames = {
  USERS: 'users',
}
export const UsersRoutes = () => {
  const { t } = useTranslation()
  return [
    {
      title: t('Пользователи'),
      to: UsersRoutesNames.USERS,
      component: <Users />,
      icon: <UserOutlined />,
      isNavLink: false,
    },
  ] as Link[]
}
