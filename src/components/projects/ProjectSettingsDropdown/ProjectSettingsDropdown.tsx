import React from 'react'
import { FC } from 'react'
import { Button, Menu, Dropdown } from 'antd'
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'src/hooks'
import { ProjectsUsersRoutesNames } from 'src/routes/projectsUserRoutes'
import { NavLink } from 'react-router-dom'

const SettingsButton: FC = () => {
  const { t } = useTranslation()

  const menu = (
    <Menu>
      <Menu.Item key='users' icon={<UserOutlined />}>
        <NavLink to={ProjectsUsersRoutesNames.PROJECTS_USERS}>
          {t('Пользователи проекта')}
        </NavLink>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button type='text' icon={<SettingOutlined />} />
    </Dropdown>
  )
}

export default SettingsButton
