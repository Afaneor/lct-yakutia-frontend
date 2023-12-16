import React, { useContext } from 'react'
import { Avatar, Button, Space, Tooltip, Typography } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useTranslation } from 'src/hooks'
import {
  BASIC_AUTH_STORAGE_KEY,
  USER_STORAGE_KEY,
} from 'src/services/auth/AuthServices'
import { CurrentUserContext } from 'src/components'

const { Text } = Typography

export const CurrentUser: React.FC = () => {
  const { t } = useTranslation()
  const { currentUserInfo } = useContext(CurrentUserContext)

  const onLogout = () => {
    localStorage.removeItem(USER_STORAGE_KEY)
    localStorage.removeItem(BASIC_AUTH_STORAGE_KEY)
    window.location.href = '/'
  }
  return (
    <Space>
      <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
      <Text
        ellipsis={{ tooltip: currentUserInfo?.email }}
        style={{
          color: 'rgba(255, 255, 255, 0.65)',
          maxWidth: '100px',
        }}
      >
        {currentUserInfo?.email}
      </Text>
      <Tooltip title={t('Выйти')}>
        <Button type='link' icon={<LogoutOutlined />} onClick={onLogout} />
      </Tooltip>
    </Space>
  )
}
