import React from 'react'
import { useTranslation } from 'src/hooks'
import { useGetDisplayNameFromChoices } from 'src/hooks/useGetDisplayName'
import { BaseModel, UsersRequestsFields } from 'src/models'
import { ManOutlined, WomanOutlined } from '@ant-design/icons'
import { Space, Tooltip, Typography } from 'antd'
import { MessageFields } from 'src/models/Messages'
const { Text } = Typography

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
      title: t('Кластер клиента'),
      dataIndex: 'client_data.super_clust',
      width: '15%',
    },
    {
      title: t('Источник данных'),
      dataIndex: 'source_client_info',
      width: '10%',
    },
    {
      title: t('Тип успешности'),
      dataIndex: 'success_type',
      width: '10%',
      render: (success_type: string) => {
        return getDisplayName(model.modelName, 'success_type', success_type)
      },
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
    {
      title: t('Маркетинговое предложение'),
      dataIndex: 'actual_message',
      render: (message: MessageFields, record: UsersRequestsFields) => {
        if (!message) {
          if (record.status === 'initial') {
            return t('Hе формировалось')
          } else if (record.status === 'in_progress') {
            return t('Формируется')
          }
        }
        return (
          <Tooltip title={message.text} placement={'top'}>
            <Text>{message.text}</Text>
          </Tooltip>
        )
      },
    },
  ]
}
