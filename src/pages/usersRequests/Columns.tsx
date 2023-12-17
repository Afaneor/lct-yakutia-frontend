import React from 'react'
import { useTranslation } from 'src/hooks'
import { useGetDisplayNameFromChoices } from 'src/hooks/useGetDisplayName'
import { BaseModel, UsersRequestsFields } from 'src/models'
import { ManOutlined, WomanOutlined } from '@ant-design/icons'
import { Space, Tooltip } from 'antd'

export const Columns = (model: typeof BaseModel) => {
  const { t } = useTranslation()
  const getDisplayName = useGetDisplayNameFromChoices()

  return [
    {
      title: t('Клиент ID'),
      dataIndex: 'client_id',
      width: '10%',
    },
    {
      title: t('Возраст'),
      dataIndex: 'client_data',
      width: '5%',
      render: (client: UsersRequestsFields['client_data']) => {
        return Math.round(client.age)
      },
    },
    {
      title: t('Пол'),
      dataIndex: 'client_data',
      width: '5%',
      render: (client: UsersRequestsFields['client_data']) => {
        return (
          <Tooltip title={client.gender === '1' ? t('Женский') : t('Мужской')}>
            <Space>
              {client.gender === '1' ? (
                <WomanOutlined style={{ color: '#ff85c0' }} />
              ) : (
                <ManOutlined />
              )}
            </Space>
          </Tooltip>
        )
      },
    },
    {
      title: t('Регион'),
      dataIndex: 'client_data.reg_region_nm',
      width: '15%',
    },
    {
      title: t('Кластер клиента'),
      dataIndex: 'client_data.super_clust',
      width: '15%',
    },
    {
      title: t('Источник данных'),
      dataIndex: 'source_client_info',
    },
    {
      title: t('Этап'),
      dataIndex: 'success_type',
    },
    {
      title: t('Статус'),
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status: string) => {
        return getDisplayName(model.modelName, 'status', status)
      },
    },
  ]
}
