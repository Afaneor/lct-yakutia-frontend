import React from 'react'
import { FC } from 'react'
import { Button, Menu, Dropdown } from 'antd'
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'src/hooks'

const SettingsButton: FC = () => {
  const { t } = useTranslation()
  const handleMenuClick = (e: any) => {
    // Обработка клика на пункт меню
    if (e.key === 'users') {
      // Действия при выборе "Пользователи"
      console.log('Пользователи')
    }
    // Добавьте дополнительные пункты меню, если необходимо
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='users' icon={<UserOutlined />}>
        {t('Пользователи')}
      </Menu.Item>
      {/* Добавьте дополнительные пункты меню, если необходимо */}
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button type='text' icon={<SettingOutlined />} />
    </Dropdown>
  )
}

export default SettingsButton
