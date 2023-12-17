import React from 'react'
import styles from './GoToEntityDetail.module.scss'
import { FCC } from 'src/types'
import { NavLink } from 'react-router-dom'
import { Button, Space, Tooltip } from 'antd'
import { RightCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'src/hooks'

interface GoToEntityDetailProps {
  tooltip?: string
  url: string
  text?: string
  target?: string
}
export const GoToEntityDetail: FCC<GoToEntityDetailProps> = ({
  tooltip,
  url,
  text,
  target,
}) => {
  const { t } = useTranslation()
  return (
    <Space size='middle'>
      {text || null}
      <NavLink to={url} target={target}>
        <Tooltip title={tooltip || t('Перейти')} placement={'top'}>
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
