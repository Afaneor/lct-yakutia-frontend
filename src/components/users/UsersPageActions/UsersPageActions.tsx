import React from 'react'
import { FCC } from 'src/types'
import { Button, Space } from 'antd'
import { useTranslation } from 'src/hooks'
import { ExperimentOutlined, UploadOutlined } from '@ant-design/icons'

interface UsersPageActionsProps {
  onUpload?: () => void
  onCreate?: () => void
  isDisabled?: boolean
}
export const UsersPageActions: FCC<UsersPageActionsProps> = ({
  onUpload,
  isDisabled,
  onCreate,
}) => {
  const { t } = useTranslation()
  return (
    <Space>
      <Button icon={<UploadOutlined />} onClick={onUpload}>
        {t('Загрузка данных')}
      </Button>
      <Button
        disabled={isDisabled}
        type='primary'
        icon={<ExperimentOutlined />}
        onClick={onCreate}
      >
        {t('Сформировать')}
      </Button>
    </Space>
  )
}

UsersPageActions.displayName = 'UsersPageActions'

export default UsersPageActions
