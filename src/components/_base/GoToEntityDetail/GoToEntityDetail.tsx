import React from 'react'
import styles from './GoToEntityDetail.module.scss'
import { FCC } from 'src/types'
import { NavLink } from 'react-router-dom'
import { Button, Space } from 'antd'
import { RightCircleOutlined } from '@ant-design/icons'

interface GoToEntityDetailProps {
  url: string
  text?: string
}
export const GoToEntityDetail: FCC<GoToEntityDetailProps> = ({ url, text }) => {
  return (
    <Space size='middle'>
      {text || null}
      <NavLink to={url}>
        <Button
          type='text'
          icon={<RightCircleOutlined />}
          className={styles.button}
        />
      </NavLink>
    </Space>
  )
}

GoToEntityDetail.displayName = 'GoToEntityDetail'

export default GoToEntityDetail
