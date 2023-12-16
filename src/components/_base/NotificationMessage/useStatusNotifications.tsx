import React, { useContext, useMemo } from 'react'
import { NotificationMessageContext } from 'src/components'
import { ArgsProps, NotificationInstance } from 'antd/es/notification/interface'
import { useTranslation } from 'src/hooks'
import { statusConfig } from 'src/components/_base/NotificationMessage/statusConfig'
import { CheckOutlined } from '@ant-design/icons'

export const useStatusNotifications = () => {
  const { t } = useTranslation()
  const { api }: { api: NotificationInstance } = useContext(
    NotificationMessageContext
  )
  const statusesConfig = useMemo(
    () => ({
      default: {
        icon: <CheckOutlined />,
        style: {
          backgroundColor: '#162312',
          border: '1px solid #274916',
        },
        message: t('Перепроверено'),
      },
      ...statusConfig(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    stageName: string,
    description: string,
    notificationType: NotificationType,
    props?: ArgsProps
  ) => {
    api.open({
      style: statusesConfig[notificationType].style,
      icon: statusesConfig[notificationType].icon,
      message: stageName,
      description,
      ...props,
    })
  }
}
