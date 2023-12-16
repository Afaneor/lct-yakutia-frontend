import React from 'react'
import styles from './UsersPageActions.module.scss'
import { FCC } from 'src/types'
import { Button, Col, Row, Space } from 'antd'
import { useTranslation } from 'src/hooks'
import { ExperimentOutlined, UploadOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { loadDataRoutesNames } from 'src/routes/loadDataRoutes'

interface UsersPageActionsProps {
  onUpload?: () => void
}
export const UsersPageActions: FCC<UsersPageActionsProps> = ({ onUpload }) => {
  const { t } = useTranslation()
  return (
    <Space>
      <Button type='primary' icon={<ExperimentOutlined />}>
        {t('Сформировать')}
      </Button>
      <Button icon={<UploadOutlined />} onClick={onUpload}>
        {t('Загрузка данных')}
      </Button>
    </Space>
  )
}

UsersPageActions.displayName = 'UsersPageActions'

export default UsersPageActions
