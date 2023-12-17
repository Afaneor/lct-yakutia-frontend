import React from 'react'
import { List, Button, Tooltip } from 'antd'
import {
  InfoCircleOutlined,
  UsergroupAddOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'src/hooks'
import { NavLink } from 'react-router-dom'
import { ProjectSalesChannelFields } from 'src/models'
import SalesChannelInfo from '../../sales-channels/SalesChannelInfo/SalesChannelInfo'
import isEmpty from 'lodash/isEmpty'

interface ChannelListProps {
  data?: ProjectSalesChannelFields[] // Замените any на тип вашего объекта данных
  onInfo?: (id: string) => void
  onStatistic?: (id: string) => void
  onMailing?: (id: string) => void
  marketingOfferRoute?: string
}

export const SalesChannelListItem: React.FC<ChannelListProps> = ({ data }) => {
  const [currentChannel, setCurrentChannel] = React.useState<{
    title: string
    text: string
  }>({} as { title: string; text: string })
  const { tF } = useTranslation()
  const renderItem = (item: any) => (
    <List.Item
      actions={[
        <Tooltip key={'info'} title={tF('Описание')}>
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => {
              setCurrentChannel({
                title: item?.sale_channel?.name,
                text: item?.sale_channel?.description,
              })
            }}
          />
        </Tooltip>,
        <Tooltip key={'prompt'} title={tF('Дополнительные данные ')}>
          <Button
            icon={<FileTextOutlined />}
            onClick={() => {
              setCurrentChannel({
                title: tF(
                  'Дополнительные данные для формирования запроса в LLM'
                ),
                text: item?.prompt,
              })
            }}
          />
        </Tooltip>,
        // <Tooltip key={'statistic'} title={tF('Статистика')}>
        //   <Button icon={<BarChartOutlined />} />
        // </Tooltip>,
        // <Tooltip key={'mailing'} title={tF('Рассылка')}>
        //   <Button icon={<MailOutlined />} />
        // </Tooltip>,
        <Tooltip
          key={'clients'}
          title={tF('Запросы для формирования маркетингово предложения')}
        >
          <NavLink to={`channels/${item.id}/requests`}>
            <Button icon={<UsergroupAddOutlined />} />
          </NavLink>
        </Tooltip>,
      ]}
    >
      <List.Item.Meta title={item?.sale_channel?.name} />
    </List.Item>
  )

  const handleOk = () => {
    setCurrentChannel({} as { title: string; text: string })
  }
  return (
    <>
      <SalesChannelInfo
        title={currentChannel?.title}
        isOpen={!isEmpty(currentChannel)}
        onOk={handleOk}
        onCancel={handleOk}
      >
        {currentChannel?.text}
      </SalesChannelInfo>
      <List dataSource={data} renderItem={renderItem} />
    </>
  )
}
