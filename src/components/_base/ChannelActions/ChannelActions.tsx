import React, { Suspense, useMemo } from 'react'
import styles from './ChannelActions.module.scss'
import { FCC } from 'src/types'
import { LayoutLoading, NavLinkCard } from 'src/components'
import { useTranslation } from 'src/hooks'
import { Col, Row, Statistic } from 'antd'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { channelsDescription } from 'src/components/_base/ChannelActions/channelsDescription'
import { BarChartOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'

interface ChannelActionsProps {
  prop?: any
}

export const ChannelActions: FCC<ChannelActionsProps> = ({ prop }) => {
  const { tF } = useTranslation()
  const { channelType }: { channelType?: string } = useParams()

  const actions = useMemo(() => {
    return [
      {
        icon: <BarChartOutlined />,
        title: tF('Статистика'),
        to: 'statistics',
      },
      {
        title: tF('Пользователи'),
        to: 'users',
        icon: <UserOutlined />,
      },
      {
        title: tF('Рассылка'),
        to: 'mailing',
        icon: <MailOutlined />,
      },
    ]
  }, [tF])

  return (
    <Row gutter={[16, 16]}>
      <Suspense fallback={<LayoutLoading />}>
        {channelType ? (
          <Col span={24}>
            {/*// @ts-ignore*/}
            <ReactMarkdown>{channelsDescription?.[channelType]}</ReactMarkdown>
          </Col>
        ) : null}
      </Suspense>
      {actions.map((action, index) => (
        <Col key={index}>
          <NavLinkCard title={action.title} to={action.to} icon={action.icon} />
        </Col>
      ))}
    </Row>
  )
}

ChannelActions.displayName = 'ChannelActions'

export default ChannelActions
