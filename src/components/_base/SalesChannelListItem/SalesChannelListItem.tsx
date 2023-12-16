import React from 'react'
import { List, Button, Tooltip } from 'antd'
import {
  BarChartOutlined,
  MailOutlined,
  InfoCircleOutlined,
  AimOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'src/hooks'
import { NavLink } from 'react-router-dom'
import { SalesChannelFields } from 'src/models'
import SalesChannelInfo from '../../sales-channels/SalesChannelInfo/SalesChannelInfo'
import isEmpty from 'lodash/isEmpty'

interface ChannelListProps {
  data?: SalesChannelFields[] // Замените any на тип вашего объекта данных
  onInfo?: (id: string) => void
  onStatistic?: (id: string) => void
  onMailing?: (id: string) => void
  marketingOfferRoute?: string
}

export const SalesChannelListItem: React.FC<ChannelListProps> = ({ data }) => {
  const [currentChannel, setCurrentChannel] =
    React.useState<SalesChannelFields>({} as SalesChannelFields)
  const { tF } = useTranslation()
  const renderItem = (item: any) => (
    <List.Item
      actions={[
        <Tooltip key={'info'} title={tF('Информация')}>
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => {
              setCurrentChannel(item)
            }}
          />
        </Tooltip>,
        <Tooltip key={'statistic'} title={tF('Статистика')}>
          <Button icon={<BarChartOutlined />} />
        </Tooltip>,
        <Tooltip key={'mailing'} title={tF('Рассылка')}>
          <Button icon={<MailOutlined />} />
        </Tooltip>,
        <Tooltip
          key={'users'}
          title={tF('Сформировать маркетинговое предложение')}
        >
          <NavLink to={`channel/${item.id}/projects-users`}>
            <Button icon={<AimOutlined />}>{tF('Сформировать')}</Button>
          </NavLink>
        </Tooltip>,
      ]}
    >
      <List.Item.Meta title={item.name} />
    </List.Item>
  )

  const handleOk = () => {
    setCurrentChannel({} as SalesChannelFields)
  }
  return (
    <>
      <SalesChannelInfo
        title={currentChannel.name}
        isOpen={!isEmpty(currentChannel)}
        onOk={handleOk}
        onCancel={handleOk}
      >
        {currentChannel.description}
      </SalesChannelInfo>
      <List dataSource={data} renderItem={renderItem} />
    </>
  )
}
