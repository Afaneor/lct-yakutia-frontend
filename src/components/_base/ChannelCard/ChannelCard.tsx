import React from 'react'
import styles from './ChannelCard.module.scss'
import { FCC } from 'src/types'
import { Card, Checkbox } from 'antd'
import { NavLink } from 'react-router-dom'

interface ChannelCardProps {
  title?: string

  extra?: React.ReactNode
  to: string
}
export const ChannelCard: FCC<ChannelCardProps> = ({ title, extra, to }) => {
  return (
    <NavLink
      to={to}
      children={({ isActive, ...rest }) => (
        <Card
          title={title}
          extra={extra}
          style={{
            boxShadow: isActive ? '0 0 1px 1px #1890ff' : 'none',
          }}
          hoverable
          {...rest}
        >
          Какой-то текст
        </Card>
      )}
    />
  )
}

ChannelCard.displayName = 'ChannelCard'

export default ChannelCard
