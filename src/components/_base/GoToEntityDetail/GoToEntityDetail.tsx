import React from 'react'
import styles from './GoToEntityDetail.module.scss'
import { FCC } from 'src/types'
import { NavLink } from 'react-router-dom'
import { Button, Space, Tooltip } from 'antd'
import { RightCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'src/hooks'

interface GoToEntityDetailProps {
  url: string
  text?: string
}
export const GoToEntityDetail: FCC<GoToEntityDetailProps> = ({ url, text }) => {
  const { t } = useTranslation()
  return (
    <Space size='middle'>
      {text || null}
      <NavLink to={url}>
        <Tooltip title={t('Перейти к детальной странице')} placement={'top'}>
          <Button
            type='text'
            icon={<RightCircleOutlined />}
            className={styles.button}
          />
        </Tooltip>
      </NavLink>
    </Space>
  )
}

GoToEntityDetail.displayName = 'GoToEntityDetail'

export default GoToEntityDetail
