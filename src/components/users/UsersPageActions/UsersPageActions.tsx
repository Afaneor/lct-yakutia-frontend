import React from 'react'
import { FCC } from 'src/types'
import { Button, Space, Tooltip } from 'antd'
import { useTranslation } from 'src/hooks'
import { ExperimentOutlined, UploadOutlined } from '@ant-design/icons'

interface UsersPageActionsProps {
  onUpload?: () => void
  onCreate?: () => void
  isDisabled?: boolean
  isLoading?: boolean
}
export const UsersPageActions: FCC<UsersPageActionsProps> = ({
  onUpload,
  isDisabled,
  onCreate,
  isLoading,
}) => {
  const { t } = useTranslation()
  return (
    <Space>
      <Button icon={<UploadOutlined />} onClick={onUpload}>
        {t('Загрузка данных')}
      </Button>
      <Tooltip title={isDisabled ? t('Выберите хотя бы одну запись') : ''}>
        <Button
          loading={isLoading}
          type={'primary'}
          icon={<ExperimentOutlined />}
          onClick={onCreate}
          disabled={isDisabled}
        >
          {t('Сформировать')}
        </Button>
      </Tooltip>
    </Space>
  )
}

UsersPageActions.displayName = 'UsersPageActions'

export default UsersPageActions
