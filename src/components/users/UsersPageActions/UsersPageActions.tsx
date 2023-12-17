import React from 'react'
import { FCC } from 'src/types'
import { Button, Space } from 'antd'
import { useTranslation } from 'src/hooks'
import { ExperimentOutlined, UploadOutlined } from '@ant-design/icons'

interface UsersPageActionsProps {
  onUpload?: () => void
}
export const UsersPageActions: FCC<UsersPageActionsProps> = ({ onUpload }) => {
  const { t } = useTranslation()
  return (
    <Space>
      <Button icon={<UploadOutlined />} onClick={onUpload}>
        {t('Загрузка данных')}
      </Button>
      <Button type='primary' icon={<ExperimentOutlined />}>
        {t('Сформировать')}
      </Button>
    </Space>
  )
}

UsersPageActions.displayName = 'UsersPageActions'

export default UsersPageActions
