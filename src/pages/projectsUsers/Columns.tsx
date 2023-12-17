import React from 'react'
import { useTranslation } from 'src/hooks'
import { useGetDisplayNameFromChoices } from 'src/hooks/useGetDisplayName'
import { ProjectUsersModel } from 'src/models/ProjectsUsers'

export const Columns = () => {
  const { t } = useTranslation()
  const getDisplayName = useGetDisplayNameFromChoices()

  return [
    {
      title: t('ФИО'),
      dataIndex: 'user',
      render: (user: { first_name: string; last_name: string }) =>
        `${user?.first_name} ${user?.last_name}`,
      width: '20%',
    },
    {
      title: t('Email'),
      dataIndex: 'user.email',
      width: '20%',
    },
    {
      title: t('Роль'),
      dataIndex: 'role',
      key: 'role',
      filters: [
        {
          value: 'manager',
          text: t('Руководитель'),
        },
        {
          value: 'performer',
          text: t('Исполнитель'),
        },
      ],
      width: '10%',
      render: (role: string) => {
        return getDisplayName(ProjectUsersModel.modelName, 'role', role)
      },
    },
  ]
}
